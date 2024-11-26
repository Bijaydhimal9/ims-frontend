import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthContextType, AuthState, LoginCredentials, User } from '@/types/auth';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(initialState);
    const navigate = useNavigate();

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;

            setState({
                user,
                isAuthenticated,
                isLoading: false,
            });
        } catch (error) {
            console.error('Auth check failed:', error);
            setState({
                ...initialState,
                isLoading: false,
            });
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            // In a real app, this would be an API call
            if (credentials.email === 'test@test.com' && credentials.password === '1234@123') {
                const user: User = {
                    email: credentials.email,
                    name: 'Test User',
                };

                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(user));

                setState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });

                navigate('/dashboard');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');

        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });

        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

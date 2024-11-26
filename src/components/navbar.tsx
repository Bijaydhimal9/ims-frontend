import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <div className="flex space-x-4">
                        <Link to="/bookings" className="text-gray-600 hover:text-gray-900">
                            Bookings
                        </Link>
                        <Link to="/inmates" className="text-gray-600 hover:text-gray-900">
                            Inmates
                        </Link>
                    </div>
                </div>
                <Button variant="destructive" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
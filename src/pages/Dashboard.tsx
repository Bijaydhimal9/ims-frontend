import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <Button variant="destructive" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to your Dashboard</CardTitle>
                        <CardDescription>
                            You're now logged into the application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Your dashboard content goes here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;
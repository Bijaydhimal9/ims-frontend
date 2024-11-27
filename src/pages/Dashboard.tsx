import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FiUsers, FiUserPlus, FiLayout } from 'react-icons/fi';
import Inmates from './inmates';
import Booking from './booking';
import React from 'react';

type ViewType = 'inmates' | 'booking';

interface TabStats {
  id: ViewType;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TabButtonProps {
  tab: TabStats;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick }) => (
  <Link
    to={`/${tab.id}`}
    className={`
      flex items-center w-full p-4 border-l-4 transition-all duration-200
      ${isActive 
        ? 'bg-blue-50 border-blue-500 text-blue-700' 
        : 'border-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-900'
      }
    `}
  >
    <div className="flex-shrink-0">
      {React.cloneElement(tab.icon as React.ReactElement, { 
        className: `h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`
      })}
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-baseline justify-between">
        <p className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
          {tab.title}
        </p>
      </div>
      <p className={`mt-1 text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {tab.description}
      </p>
    </div>
  </Link>
);

const Dashboard = ({ children }: { children?: React.ReactNode }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const tabs: TabStats[] = [
        {
            id: 'inmates',
            icon: <FiUsers />,
            title: 'Inmate Management',
            description: 'Total inmates currently in the system'
        },
        {
            id: 'booking',
            icon: <FiUserPlus />,
            title: 'Booking Management',
            description: 'Active booking records'
        },
    ];

    const currentPath = location.pathname.split('/')[1] || 'inmates';

    const renderContent = () => {
        switch (currentPath) {
            case 'inmates':
                return <Inmates />;
            case 'booking':
                return <Booking />;
            default:
                return <Inmates />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-4">
                            <FiLayout className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">
                                Inmate Management System
                            </h1>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 
                                     text-sm font-medium rounded-md text-gray-700 bg-white 
                                     hover:bg-gray-50 focus:outline-none focus:ring-2 
                                     focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3">
                        <nav className="space-y-1 bg-white shadow rounded-lg overflow-hidden">
                            {tabs.map((tab) => (
                                <TabButton
                                    key={tab.id}
                                    tab={tab}
                                    isActive={currentPath === tab.id}
                                    onClick={() => {}}
                                />
                            ))}
                        </nav>
                    </aside>

                    <main className="mt-8 lg:mt-0 lg:col-span-9">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="transition-all duration-300 ease-in-out">
                                    {renderContent()}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/protected-routes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/auth/Login';
import Booking from './pages/booking';
import Inmates from './pages/inmates';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Navigate to="/inmates" replace />} />
              <Route path="/inmates" element={<Inmates />} />
              <Route path="/booking" element={<Booking />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
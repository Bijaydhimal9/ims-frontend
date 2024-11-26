import { useLocation, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import type { LoginCredentials } from '@/types/auth';
import { LoadingScreen } from '@/components/AuthStateLoader';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const initialValues: LoginCredentials = {
    email: '',
    password: '',
};

const Login = () => {
    const { login, isAuthenticated, isLoading } = useAuth();
    const { toast } = useToast();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isAuthenticated) {
        return <Navigate to="/inmates" state={{ from: location }} replace />;
    }

    const handleSubmit = async (values: LoginCredentials) => {
        try {
            await login(values);;
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Authentication Error",
                description: "Invalid email or password.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Card className="w-[400px] shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Field name="email">
                                        {({ field }: { field: any }) => (
                                            <Input
                                                {...field}
                                                id="email"
                                                placeholder="Enter your email"
                                                className={`${errors.email && touched.email
                                                    ? 'border-red-500 focus-visible:ring-red-500'
                                                    : ''
                                                    }`}
                                            />
                                        )}
                                    </Field>
                                    {errors.email && touched.email && (
                                        <div className="text-sm text-red-500">{errors.email}</div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Field name="password">
                                        {({ field }: { field: any }) => (
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                className={`${errors.password && touched.password
                                                    ? 'border-red-500 focus-visible:ring-red-500'
                                                    : ''
                                                    }`}
                                            />
                                        )}
                                    </Field>
                                    {errors.password && touched.password && (
                                        <div className="text-sm text-red-500">{errors.password}</div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>

                                {/* Demo credentials */}
                                {/* <div className="mt-4 text-center text-sm text-gray-500">
                                    <p>Demo credentials:</p>
                                    <p>Email: test@test.com</p>
                                    <p>Password: 1234@123</p>
                                </div> */}
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
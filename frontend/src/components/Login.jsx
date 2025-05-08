import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validate = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', formData);
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } catch (error) {
                console.error('Login error:', error);
                setErrors({
                    general: 'Invalid email or password'
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-white">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-purple-800">Welcome Back</h2>
                    <p className="text-purple-400 mt-2">Sign in to your account</p>
                </div>

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                        {errors.general}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-purple-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-purple-200 focus:ring-purple-200'
                                    }`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-purple-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-purple-200 focus:ring-purple-200'
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} className="text-purple-400" />
                                ) : (
                                    <Eye size={18} className="text-purple-400" />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-purple-600 hover:text-purple-800">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all hover:from-purple-700 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                            Sign In
                            <LogIn size={18} className="ml-2" />
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>
                            Don't have an account?{' '}
                            <a href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

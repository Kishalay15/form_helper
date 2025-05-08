import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-800">Welcome to the Dashboard</h1>

                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg font-medium transition-all hover:from-purple-700 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        Logout
                        <LogOut size={18} className="ml-2" />
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-200 rounded-lg">
                        <p className="text-purple-400 text-lg">Dashboard content will go here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

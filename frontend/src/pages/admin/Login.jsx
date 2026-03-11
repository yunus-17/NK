import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { API } from '../../lib/utils';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Access denied. Invalid credentials.');
            }
        } catch (err) {
            setError('Communication failure with the central hub.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-nk-olive flex items-center justify-center p-6 font-ui">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-none p-12 shadow-2xl relative z-10 border-t-8 border-nk-sand"
            >
                <div className="flex flex-col items-center mb-12">
                    <div className="w-20 h-20 bg-nk-olive rounded-none flex items-center justify-center text-nk-sand mb-6">
                        <Shield size={36} />
                    </div>
                    <h1 className="text-3xl font-heading text-nk-olive-dark tracking-tight">Access Portal</h1>
                    <p className="text-nk-olive/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">NK Engineering Hub</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-[10px] font-black uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Identity Mail</label>
                        <div className="relative">
                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@nkengineering.com"
                                className="w-full bg-transparent border-b border-nk-olive/10 pl-10 pr-4 py-4 focus:border-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Secret Cipher</label>
                        <div className="relative">
                            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent border-b border-nk-olive/10 pl-10 pr-4 py-4 focus:border-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <Button size="lg" className="w-full py-5 shadow-xl" disabled={isLoading}>
                        {isLoading ? 'Verifying Clearance...' : 'Request Access'}
                        {!isLoading && <ArrowRight size={18} className="ml-4" />}
                    </Button>

                    <div className="text-center pt-4 border-t border-nk-olive/5">
                        <Link to="/admin/signup" className="text-[10px] font-black uppercase tracking-widest text-nk-olive-light hover:underline">
                            New Identity? Register for Clearance
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

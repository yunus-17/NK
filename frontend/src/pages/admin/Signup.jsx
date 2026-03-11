import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, Key } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { API } from '../../lib/utils';

const AdminSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminSecret, setAdminSecret] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, adminSecret })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and redirect
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Clearance denied. Access restricted.');
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
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-nk-olive rounded-none flex items-center justify-center text-nk-sand mb-6">
                        <Key size={36} />
                    </div>
                    <h1 className="text-3xl font-heading text-nk-olive-dark tracking-tight">Recruitment Portal</h1>
                    <p className="text-nk-olive/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Join the Elite Corps</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-[10px] font-black uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Full Nomenclature</label>
                        <div className="relative">
                            <Shield className="absolute left-0 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="E.g. Alexander Knight"
                                className="w-full bg-transparent border-b border-nk-olive/10 pl-10 pr-4 py-4 focus:border-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

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

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Admin Clearance Key</label>
                        <div className="relative border-2 border-nk-olive/5 p-2 bg-nk-sand/5">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-olive/40" size={18} />
                            <input
                                type="password"
                                required
                                value={adminSecret}
                                onChange={(e) => setAdminSecret(e.target.value)}
                                placeholder="Enter Royal Secret Key"
                                className="w-full bg-transparent pl-12 pr-4 py-4 focus:border-nk-olive outline-none transition-all font-black text-xs uppercase tracking-widest text-nk-olive-dark"
                            />
                        </div>
                    </div>

                    <Button size="lg" className="w-full py-5 shadow-xl" disabled={isLoading}>
                        {isLoading ? 'Processing Clearance...' : 'Enlist as Admin'}
                        {!isLoading && <ArrowRight size={18} className="ml-4" />}
                    </Button>

                    <div className="text-center">
                        <Link to="/admin/login" className="text-[10px] font-black uppercase tracking-widest text-nk-olive-light hover:underline">
                            Existing Identity? Access Portal
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminSignup;

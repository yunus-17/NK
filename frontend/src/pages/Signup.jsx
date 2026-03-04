import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Signup = () => {
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
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, adminSecret })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userName', data.name);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('Connection failed. Please check your internet.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-nk-base flex items-center justify-center p-6 font-ui">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl border border-nk-olive/5"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-nk-olive-dark">Create Account</h1>
                    <p className="text-nk-olive/40 text-sm mt-2">Join the NK Engineering community</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-widest pl-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Alexander Knight"
                                className="w-full bg-nk-base/50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-widest pl-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@example.com"
                                className="w-full bg-nk-base/50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-widest pl-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-nk-base/50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-widest pl-1">Admin Secret Key (Optional)</label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="password"
                                value={adminSecret}
                                onChange={(e) => setAdminSecret(e.target.value)}
                                placeholder="Enter clearance code"
                                className="w-full bg-nk-base/50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-nk-olive outline-none transition-all font-bold text-sm"
                            />
                        </div>
                    </div>

                    <Button className="w-full py-4 bg-nk-olive text-nk-sand rounded-2xl" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                        {!isLoading && <ArrowRight size={18} className="ml-2" />}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-nk-olive/40">Already have an account? </span>
                        <Link to="/login" className="text-nk-olive font-black hover:underline">Log In</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;

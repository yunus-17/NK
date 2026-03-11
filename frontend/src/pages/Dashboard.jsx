import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, ExternalLink, User, LayoutDashboard, Search, Bell } from 'lucide-react';
import Section from '../components/ui/Section';
import { API } from '../lib/utils';

const UserDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setUserName(localStorage.getItem('userName') || 'Client');
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API}/projects`);
                const data = await response.json();
                if (response.ok) {
                    setProjects(data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-nk-base font-ui overflow-hidden">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-nk-khaki-dark rounded-full blur-[100px] transition-all duration-[10s]" />
                {/* Bubble Particles Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>

            <main className="relative z-10 pt-20 pb-20">
                <Section>
                    {/* Personalized Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                            <div className="max-w-4xl">
                                <div className="flex items-center space-x-8 mb-10 group">
                                    <div className="w-20 h-20 bg-nk-olive text-nk-sand flex items-center justify-center rounded-3xl font-heading text-3xl shadow-2xl transition-transform group-hover:rotate-12 group-hover:scale-110">
                                        {userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-nk-olive-dark mb-2">Authenticated Personnel</h2>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                                            <span className="text-xs font-black uppercase tracking-widest text-nk-olive">Live Synchronization</span>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-heading text-nk-olive-dark leading-[1] mb-10">
                                    Executive Portal: <span className="italic opacity-40">{userName}</span>
                                </h1>

                                <p className="text-nk-olive/70 text-2xl font-body leading-relaxed max-w-3xl">
                                    Welcome to your specialized dashboard. You are granted exclusive oversight of our
                                    active engineering acquisitions and structural developments.
                                </p>
                            </div>

                            {/* Quick Stats Sidebar-style in header */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
                                <div className="bubble-glass p-10 flex flex-col items-center">
                                    <span className="block text-xs font-black uppercase tracking-widest text-nk-olive/40 mb-4">Total Assets</span>
                                    <span className="text-6xl font-heading text-nk-olive-dark">{projects.length}</span>
                                </div>
                                <div className="bubble-glass p-10 flex flex-col items-center bg-nk-olive text-nk-sand">
                                    <span className="block text-xs font-black uppercase tracking-widest text-nk-sand/40 mb-4">Clearance</span>
                                    <span className="text-6xl font-heading text-nk-sand">L3</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Filter / Search Bar (Clean & Subtle) */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/30 backdrop-blur-md rounded-[2rem] p-6 gap-6">
                        <div className="flex items-center space-x-12 px-8">
                            <button className="text-xs font-black uppercase tracking-[0.4em] text-nk-olive border-b-4 border-nk-olive pb-2">Active Assets</button>
                            <button className="text-xs font-black uppercase tracking-[0.4em] text-nk-olive/30 hover:text-nk-olive transition-colors pb-2">Archive</button>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-nk-olive/30" />
                            <input
                                type="text"
                                placeholder="Filter projects..."
                                className="w-full bg-white/50 border-none rounded-full pl-16 pr-8 py-4 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-nk-olive/10 placeholder:text-nk-olive/20 shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence>
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="h-[550px] bubble-glass animate-pulse" />
                                ))
                            ) : projects.length > 0 ? (
                                projects.map((p, idx) => (
                                    <motion.div
                                        key={p._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group bubble-glass hover-pop relative overflow-hidden flex flex-col h-[580px]"
                                    >
                                        {/* Image Section */}
                                        <div className="h-3/5 relative overflow-hidden">
                                            {p.image ? (
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-nk-olive/10 font-heading text-9xl">NK</div>
                                            )}

                                            {/* Overlays */}
                                            <div className="absolute inset-0 bg-nk-olive-dark/10 group-hover:bg-transparent transition-colors duration-700" />

                                            <div className="absolute top-8 left-8">
                                                <span className="bg-white/95 backdrop-blur-md px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-nk-olive-dark shadow-xl rounded-full">
                                                    {p.status}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-8 right-8 translate-y-24 group-hover:translate-y-0 transition-transform duration-700">
                                                <button className="w-16 h-16 bg-nk-olive text-nk-sand rounded-full flex items-center justify-center shadow-2xl hover:bg-nk-olive-dark hover:scale-110 transition-all">
                                                    <ExternalLink size={24} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-12 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-nk-olive/40">{p.category}</span>
                                                <span className="text-xs font-black text-nk-olive-light uppercase tracking-widest">{p.budget}</span>
                                            </div>

                                            <h3 className="text-4xl font-heading text-nk-olive-dark mb-10 leading-tight group-hover:italic transition-all">{p.title}</h3>

                                            <div className="mt-auto flex items-center text-xs font-black uppercase tracking-[0.2em] text-nk-olive border-t border-nk-olive/10 pt-8">
                                                <MapPin size={16} className="mr-3 text-nk-olive/50" />
                                                {p.location}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-40 flex flex-col items-center justify-center bubble-glass border-4 border-dashed border-nk-olive/10">
                                    <LayoutDashboard size={80} className="text-nk-olive/10 mb-10" />
                                    <p className="text-nk-olive/40 font-heading text-4xl italic">Archive currently empty</p>
                                    <p className="text-xs font-black uppercase tracking-widest text-nk-olive/20 mt-6">Structural data synchronization pending</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </Section>
            </main>
        </div>
    );
};

export default UserDashboard;

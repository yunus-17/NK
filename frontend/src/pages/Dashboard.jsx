import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, ExternalLink, User, LayoutDashboard, Search, Bell } from 'lucide-react';
import Section from '../components/ui/Section';

const UserDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setUserName(localStorage.getItem('userName') || 'Client');
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/projects');
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
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-nk-olive rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-nk-sand rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <main className="relative z-10 pt-32 pb-20">
                <Section>
                    {/* Personalized Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                            <div className="max-w-3xl">
                                <div className="flex items-center space-x-6 mb-8 group">
                                    <div className="w-16 h-16 bg-nk-olive text-nk-sand flex items-center justify-center rounded-none font-heading text-2xl shadow-2xl transition-transform group-hover:rotate-12">
                                        {userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-nk-olive/40 mb-1">Authenticated Personnel</h2>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-nk-olive-light">System Online</span>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-heading text-nk-olive-dark leading-[1.1] mb-8">
                                    Executive Portal: <span className="italic opacity-60">{userName}</span>
                                </h1>

                                <p className="text-nk-olive/60 text-lg font-body leading-relaxed max-w-2xl">
                                    Welcome to your specialized dashboard. You are granted exclusive oversight of our
                                    active engineering acquisitions and active structural developments.
                                </p>
                            </div>

                            {/* Quick Stats Sidebar-style in header */}
                            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                                <div className="bg-white p-8 border border-nk-olive/5 shadow-sm">
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-nk-olive/30 mb-2">Total Assets</span>
                                    <span className="text-3xl font-heading text-nk-olive-dark">{projects.length}</span>
                                </div>
                                <div className="bg-nk-olive p-8 shadow-2xl">
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-nk-sand/40 mb-2">Clearance Level</span>
                                    <span className="text-3xl font-heading text-nk-sand">L3</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Filter / Search Bar (Clean & Subtle) */}
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-center border-b border-nk-olive/5 pb-8 gap-6">
                        <div className="flex items-center space-x-10">
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-nk-olive border-b-2 border-nk-olive pb-2">Active Assets</button>
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-nk-olive/30 hover:text-nk-olive transition-colors pb-2">Archive</button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-nk-olive/30" />
                            <input
                                type="text"
                                placeholder="Filter projects..."
                                className="w-full bg-transparent border-none pl-8 text-[11px] font-black uppercase tracking-widest outline-none focus:ring-0 placeholder:text-nk-olive/20"
                            />
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence>
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="h-[500px] bg-nk-olive/5 animate-pulse" />
                                ))
                            ) : projects.length > 0 ? (
                                projects.map((p, idx) => (
                                    <motion.div
                                        key={p._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group bg-white border border-nk-olive/5 relative overflow-hidden flex flex-col h-[520px] hover:shadow-[0_30px_60px_-15px_rgba(45,54,41,0.15)] transition-all duration-700 hover:-translate-y-2"
                                    >
                                        {/* Image Section */}
                                        <div className="h-2/3 relative overflow-hidden bg-nk-olive/5">
                                            {p.image ? (
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-nk-olive/10 font-heading text-8xl">NK</div>
                                            )}

                                            {/* Overlays */}
                                            <div className="absolute inset-0 bg-nk-olive-dark/10 group-hover:bg-transparent transition-colors duration-700" />

                                            <div className="absolute top-6 left-6">
                                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-widest text-nk-olive-dark shadow-sm">
                                                    {p.status}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
                                                <button className="w-12 h-12 bg-nk-olive text-nk-sand flex items-center justify-center shadow-2xl hover:bg-nk-olive-dark transition-colors">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-10 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-nk-olive/40">{p.category}</span>
                                                <span className="text-[9px] font-black text-nk-olive-light uppercase tracking-widest">{p.budget}</span>
                                            </div>

                                            <h3 className="text-2xl font-heading text-nk-olive-dark mb-8 leading-tight group-hover:text-nk-olive transition-colors">{p.title}</h3>

                                            <div className="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-nk-olive/50 border-t border-nk-olive/5 pt-6">
                                                <MapPin size={12} className="mr-2" />
                                                {p.location}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-40 flex flex-col items-center justify-center bg-nk-sand/5 border-2 border-dashed border-nk-olive/10">
                                    <LayoutDashboard size={48} className="text-nk-olive/10 mb-6" />
                                    <p className="text-nk-olive/40 font-heading text-3xl italic">Archive currently empty</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-nk-olive/20 mt-4">Structural data synchronization pending</p>
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

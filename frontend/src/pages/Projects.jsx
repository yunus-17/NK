import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const CATEGORIES = ['All', 'Infrastructure', 'Architecture', 'Consultancy', 'Industrial'];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="bg-nk-base">
            <section className="olive-gradient-bg py-20 text-center text-nk-sand relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="section-container relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-heading mb-12"
                    >
                        The Portfolio
                    </motion.h1>

                    <div className="flex flex-wrap justify-center gap-8">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all pb-2 border-b-2 ${activeCategory === cat
                                    ? 'border-nk-sand text-nk-sand-light'
                                    : 'border-transparent text-nk-sand/30 hover:text-nk-sand'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-[500px] bg-nk-olive/5 animate-pulse" />
                            ))
                        ) : filteredProjects.length > 0 ? filteredProjects.map((p) => (
                            <motion.div
                                key={p._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Card className="p-0 border-none group overflow-hidden bg-transparent shadow-none">
                                    <Link to={`/projects/${p._id}`} className="block h-[450px] overflow-hidden relative">
                                        {p.image ? (
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-nk-olive/10 flex items-center justify-center text-nk-olive/20 font-heading text-6xl">NK</div>
                                        )}
                                        <div className="absolute inset-0 bg-nk-olive/10 group-hover:bg-transparent transition-all duration-700" />
                                        <div className="absolute top-0 left-0 p-8">
                                            <span className="bg-nk-olive text-nk-sand text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2">
                                                {p.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-0 right-0 p-8">
                                            <span className="bg-white/90 backdrop-blur-md text-nk-olive text-[8px] font-black uppercase tracking-widest px-3 py-1">
                                                {p.status}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="py-10 flex flex-col items-center text-center">
                                        <h3 className="text-3xl font-heading text-nk-olive-dark mb-4 group-hover:text-nk-olive transition-colors">{p.title}</h3>
                                        <p className="text-nk-olive/40 text-[10px] font-black uppercase tracking-[0.2em] flex items-center mb-8">
                                            <MapPin size={12} className="mr-3" /> {p.location}
                                        </p>
                                        <Link
                                            to={`/projects/${p._id}`}
                                            className="text-xs font-black uppercase tracking-[0.3em] text-nk-olive-light relative group/link inline-block"
                                        >
                                            Examine Project
                                            <span className="block w-0 h-0.5 bg-nk-olive-light mt-2 transition-all group-hover/link:w-full" />
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-nk-olive/10">
                                <p className="text-nk-olive/40 font-heading text-2xl italic">No architectural records found in this sequence.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </Section>
        </div>
    );
};

export default Projects;

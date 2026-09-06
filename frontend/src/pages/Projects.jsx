import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { API } from '../lib/utils';
import projectImage1 from '../images/attachments/p1.jpg';
import projectImage2 from '../images/attachments/p2.jpg';

const Projects = () => {
    const fallbackProjectImages = [
        projectImage1,
        projectImage2,
        'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=1200'
    ];
    const sampleProjects = [
        {
            _id: 'salem-steel-logistics-park',
            title: 'Salem Steel Logistics Park',
            category: 'Industrial Infrastructure',
            location: 'Salem, Tamil Nadu',
            status: 'Completed'
        },
        {
            _id: 'coimbatore-textile-campus',
            title: 'Coimbatore Textile Campus',
            category: 'Advanced Manufacturing',
            location: 'Coimbatore, Tamil Nadu',
            status: 'Ongoing'
        },
        {
            _id: 'kochi-marine-terminal',
            title: 'Kochi Marine Terminal',
            category: 'Port & Marine Works',
            location: 'Kochi, Kerala',
            status: 'Completed'
        }
    ];
    const [projects, setProjects] = useState(sampleProjects);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API}/projects`);
                const data = await response.json();
                if (response.ok) {
                    setProjects(data.length > 0 ? data : sampleProjects);
                } else {
                    setProjects(sampleProjects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects(sampleProjects);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-[500px] bg-nk-olive/5 animate-pulse" />
                            ))
                        ) : projects.length > 0 ? projects.map((p, index) => {
                            const cardImage = p.image?.trim() || fallbackProjectImages[index];

                            return (
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
                                        {cardImage ? (
                                            <img
                                                src={cardImage}
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
                                        <h3 className="text-3xl font-heading text-nk-olive-dark mb-4 group-hover:text-nk-olive transition-colors">
                                            {p.title?.trim().toLowerCase() === 'nk engineering' ? 'Govt School' : p.title}
                                        </h3>
                                        <p className="text-nk-olive/40 text-[10px] font-black uppercase tracking-[0.2em] flex items-center mb-8">
                                            <MapPin size={12} className="mr-3" /> {p.location}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        )}) : (
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

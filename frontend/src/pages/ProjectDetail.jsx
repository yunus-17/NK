import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Wallet, CheckCircle2, Info, LayoutDashboard } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/projects/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProject(data);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-nk-base flex flex-col items-center justify-center space-y-8">
                <div className="w-16 h-16 border-4 border-nk-olive border-t-transparent rounded-full animate-spin" />
                <p className="text-nk-olive/40 font-black uppercase tracking-[0.4em] text-[10px]">Retrieving Asset Data</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-nk-base flex flex-col items-center justify-center p-10 text-center">
                <LayoutDashboard size={64} className="text-nk-olive/10 mb-8" />
                <h1 className="text-4xl font-heading text-nk-olive-dark mb-4 italic">Asset Not Found</h1>
                <p className="text-nk-olive/60 mb-10 max-w-md">The project you are looking for does not exist in our historical or active structural records.</p>
                <Link to="/projects">
                    <Button>Return to Portfolio</Button>
                </Link>
            </div>
        );
    }

    // Fallback data for fields not yet in DB schema
    const defaultStats = {
        duration: '2023 - Present',
        client: 'Private Institution',
        beforeImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000',
        afterImage: project.image || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1000',
        gallery: [
            project.image,
            'https://images.unsplash.com/photo-1518005020470-588a0c30ac80?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1533519116129-37f2a114d56d?auto=format&fit=crop&q=80&w=600'
        ].filter(Boolean)
    };

    return (
        <div className="bg-nk-base font-ui">
            {/* Project Hero */}
            <section className="relative h-[80vh] flex items-end pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-40 scale-105" />
                    ) : (
                        <div className="w-full h-full bg-nk-olive/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-nk-olive via-nk-olive/60 to-transparent" />
                </div>
                <div className="section-container relative z-10 w-full text-nk-sand-light px-6">
                    <Link to="/projects" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowLeft size={16} className="mr-3" /> All Masterworks
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-nk-sand/40 block mb-6">{project.category}</span>
                        <h1 className="text-6xl md:text-9xl font-heading leading-[0.9] max-w-5xl">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Info Grid */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-24">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-nk-olive/40 mb-10 flex items-center border-b border-nk-olive/10 pb-6 w-fit">
                                Technical Narrative
                            </h2>
                            <p className="text-nk-olive-dark/80 font-body text-2xl leading-relaxed italic max-w-4xl">
                                {project.description || "Detailed structural documentation for this project is currently being processed by our lead engineering specialists. The technical narrative will encompass end-to-end master planning."}
                            </p>
                        </div>

                        {/* Before After Slider */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-nk-olive/40 mb-10">
                                Structural Evolution
                            </h3>
                            <div className="border-[12px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700">
                                <BeforeAfterSlider
                                    beforeImage={defaultStats.beforeImage}
                                    afterImage={defaultStats.afterImage}
                                />
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="bg-nk-sand/5 p-12 lg:p-20 border border-nk-olive/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none rotate-12">
                                <LayoutDashboard size={200} />
                            </div>
                            <h3 className="text-2xl font-heading text-nk-olive-dark mb-10 relative z-10">Strategic Asset Positioning</h3>
                            <p className="text-nk-olive/60 font-body text-lg leading-relaxed max-w-2xl relative z-10 mb-10">
                                Strategically positioned in {project.location}, this project represents a cornerstone of regional structural optimization.
                                Our approach ensures maximum urban utility while maintaining visual authority.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-nk-olive-dark">
                                        <CheckCircle2 size={16} className="text-nk-olive" />
                                        <span>Optimal Urban Integration</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-nk-olive-dark">
                                        <CheckCircle2 size={16} className="text-nk-olive" />
                                        <span>Tier-1 Structural Integrity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div className="bg-nk-olive p-12 text-nk-sand shadow-2xl sticky top-28 border-nk-sand/20 flex flex-col">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 border-b border-nk-sand/10 pb-6 opacity-40">Project Registry</h3>
                            <div className="space-y-10">
                                {[
                                    { icon: MapPin, label: "Precise Location", val: project.location },
                                    { icon: Calendar, label: "Commission Duration", val: defaultStats.duration },
                                    { icon: Wallet, label: "Execution Budget", val: project.budget || 'Confidential' },
                                    { icon: CheckCircle2, label: "Asset Status", val: project.status },
                                    { icon: Info, label: "Lead Client", val: defaultStats.client }
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-start space-x-5">
                                        <div className="w-10 h-10 bg-nk-sand/5 text-nk-sand flex items-center justify-center shrink-0 border border-nk-sand/10">
                                            <stat.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-nk-sand/30 uppercase font-black tracking-[0.2em] mb-1">{stat.label}</p>
                                            <p className="text-sm font-bold text-nk-sand-light tracking-tight">{stat.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="secondary" className="w-full mt-16 py-5 bg-nk-sand text-nk-olive border-none hover:bg-nk-sand-light">
                                Inquire Details
                            </Button>
                        </div>
                    </aside>
                </div>
            </Section>

            {/* Gallery Section */}
            <Section className="bg-nk-sand/5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-nk-olive/40 mb-4">Visual Documentation</h2>
                        <h3 className="text-4xl md:text-5xl font-heading text-nk-olive-dark italic">Structural Archive</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {defaultStats.gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -12 }}
                            transition={{ duration: 0.6 }}
                            className="aspect-[4/5] bg-white p-4 border border-nk-olive/5 shadow-xl group overflow-hidden"
                        >
                            <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={`View ${i}`} />
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default ProjectDetail;

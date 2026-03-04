import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Ruler, HardHat, ShieldCheck, Factory, Zap, ArrowRight } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const SERVICES = [
    {
        id: 'infrastructure',
        title: 'Infrastructure Mastery',
        desc: 'Bespoke master planning and structural execution for Tier-1 urban and industrial developments.',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'architecture',
        title: 'Architectural Excellence',
        desc: 'Timeless architectural narratives that merge aesthetic brilliance with unyielding structural integrity.',
        icon: Ruler,
        image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'pmc',
        title: 'Project Custodianship',
        desc: 'Absolute oversight and rigorous project management ensuring delivery to royal standards.',
        icon: HardHat,
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
    }
];

const Services = () => {
    return (
        <div className="bg-nk-base">
            <section className="olive-gradient-bg py-32 text-center text-nk-sand">
                <div className="section-container">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-heading mb-8"
                    >
                        Engineering Spheres
                    </motion.h1>
                    <p className="text-nk-sand/50 max-w-2xl mx-auto text-lg font-body italic">
                        A comprehensive ecosystem of elite consultancy services designed for the modern built environment.
                    </p>
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {SERVICES.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                            <Card className="h-full flex flex-col p-0 overflow-hidden group shadow-none">
                                <div className="h-72 overflow-hidden relative">
                                    <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" />
                                    <div className="absolute inset-0 bg-nk-olive/20 group-hover:bg-nk-olive/0 transition-all duration-700" />
                                    <div className="absolute top-8 right-8 bg-nk-olive text-nk-sand p-4 shadow-2xl">
                                        <s.icon size={28} />
                                    </div>
                                </div>
                                <div className="p-12 flex flex-col flex-grow bg-white group-hover:bg-nk-sand/10 transition-colors duration-700 border border-nk-olive/5">
                                    <h3 className="text-3xl font-heading mb-6 text-nk-olive-dark tracking-tight">{s.title}</h3>
                                    <p className="text-nk-olive/60 font-body text-sm leading-relaxed mb-10 flex-grow">
                                        {s.desc}
                                    </p>
                                    <Link
                                        to={`/services/${s.id}`}
                                        className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-nk-olive hover:translate-x-4 transition-all"
                                    >
                                        View Domain <ArrowRight size={16} className="ml-3" />
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Difference Maker - High Contrast */}
            <Section className="bg-nk-sand/20" title="The Structural Standard" subtitle="Elite Difference">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {[
                        { title: "Precision", desc: "Surgical accuracy in every structural calculation." },
                        { title: "Honor", desc: "Commitment to project integrity and client vision." },
                        { title: "Innovation", desc: "Elite technological integration for modern complexity." },
                        { title: "Legacy", desc: "Building assets that define generations." }
                    ].map((item, i) => (
                        <div key={i} className="space-y-6">
                            <div className="text-nk-olive/10 font-heading text-8xl mb(-4 leading-none select-none">0{i + 1}</div>
                            <h4 className="text-xl font-heading font-black text-nk-olive tracking-tight">{item.title}</h4>
                            <p className="text-nk-olive/60 font-body text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default Services;

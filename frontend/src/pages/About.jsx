import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Eye, Users, Award, CheckCircle2 } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const About = () => {
    return (
        <div className="bg-nk-base">
            {/* Page Hero */}
            <section className="olive-gradient-bg py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070"
                        alt="Background"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="section-container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-7xl font-heading text-nk-sand mb-8"
                    >
                        The NK Legacy
                    </motion.h1>
                    <div className="flex items-center justify-center space-x-4 text-nk-sand/40 text-[10px] uppercase font-black tracking-[0.4em]">
                        <span>Legacy</span>
                        <div className="w-8 h-px bg-nk-sand/20" />
                        <span className="text-nk-sand">Our Story</span>
                    </div>
                </div>
            </section>

            {/* Company Overview - Split Layout */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <span className="font-ui font-black text-nk-olive-light tracking-[0.4em] uppercase text-xs">Structural DNA</span>
                        <h2 className="text-6xl font-heading text-nk-olive-dark leading-tight">Decades of Unyielding Engineering Integrity</h2>
                        <div className="space-y-8">
                            <p className="text-nk-olive/70 font-body text-2xl leading-relaxed">
                                Founded in 1998, NK Engineering was established with a singular vision: to bring monumental engineering precision to the subcontinent's most ambitious developments.
                            </p>
                            <p className="text-nk-olive/70 font-body text-xl leading-relaxed">
                                Our journey began as a boutique structural design bureau. Today, we stand as a multidisciplinary powerhouse, governing projects that range from sleek vertical towers to sprawling industrial complexes.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-10">
                            <div className="bubble-glass p-8">
                                <p className="text-4xl font-heading text-nk-olive-dark mb-2">250+</p>
                                <p className="text-xs font-black uppercase tracking-widest text-nk-olive/40">Landmarks Built</p>
                            </div>
                            <div className="bubble-glass p-8">
                                <p className="text-4xl font-heading text-nk-olive-dark mb-2">15M+</p>
                                <p className="text-xs font-black uppercase tracking-widest text-nk-olive/40">Sq. Ft. Managed</p>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative group"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img
                                src="\src\images\attachments\nk5.jpg"
                                alt="Founding Principles"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bubble-glass p-12 shadow-2xl bg-nk-olive text-nk-sand border-t-8 border-nk-sand/20">
                            <p className="text-7xl font-heading leading-none mb-2">98'</p>
                            <p className="text-xs font-black uppercase tracking-[0.4em] opacity-60">Established Legacy</p>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Philosophy - Sand Inversion */}
            <Section className="bg-nk-sand/15">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="bubble-glass p-16 hover-pop relative overflow-hidden group bg-white/40">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target size={150} />
                        </div>
                        <Target className="text-nk-olive mb-10" size={48} />
                        <h3 className="text-4xl font-heading text-nk-olive-dark mb-6 italic">Execution Mission</h3>
                        <p className="text-nk-olive-dark font-body text-xl leading-relaxed italic">
                            "To deliver infrastructure that outlasts the century, merging rigorous engineering with visionary design and corporate honor."
                        </p>
                    </div>
                    <div className="bubble-glass p-16 hover-pop relative overflow-hidden group bg-nk-olive text-nk-sand">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Eye size={150} />
                        </div>
                        <Eye className="text-nk-sand mb-10" size={48} />
                        <h3 className="text-4xl font-heading text-nk-sand-light mb-6 italic">Industry Vision</h3>
                        <p className="text-nk-sand/80 font-body text-xl leading-relaxed italic">
                            "To remain the world's most trusted partner for high-complexity projects, recognized for elite engineering and structural integrity."
                        </p>
                    </div>
                </div>
            </Section>

            {/* Team - Premium Grayscale Portraits */}
            <Section title="The Custodians of Legacy" subtitle="Guidance System" className="bg-nk-base">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        {
                            name: "Nirmal Kapoor",
                            role: "Founder & Chairman",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                        },
                        {
                            name: "Vikram Singhania",
                            role: "Chief Executive Officer",
                            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
                        },
                        {
                            name: "Meera Deshmukh",
                            role: "Director of Operations",
                            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                        }
                    ].map((m, i) => (
                        <div key={i} className="group relative">
                            <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border border-nk-olive/10">
                                <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-white/95 backdrop-blur-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl border-t-2 border-nk-olive">
                                <h4 className="text-2xl font-heading text-nk-olive-dark">{m.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nk-olive/40 mt-1">{m.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default About;

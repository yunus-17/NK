import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileText, Play } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Accordion from '../components/ui/Accordion';

const SERVICE_DATA = {
    'infrastructure': {
        title: 'Infrastructure Mastery',
        banner: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=2070',
        overview: 'Our infrastructure mastery services focus on the elite planning, design, and custodianship of high-complexity urban projects. We specialize in solutions that stand as testaments to engineering honor.',
        quotation: { min: '₹ 5.0 Lac', max: '₹ 50.0 Cr+', note: 'Subject to royal-scale requirements' },
        process: [
            { title: 'Core Feasibility', desc: 'Surgical analysis of structural viability and environmental legacy.' },
            { title: 'Elite Synthesis', desc: 'Creation of blueprints using Tier-1 BIM and structural mastery.' },
            { title: 'Honor Audits', desc: 'Rigorous quality benchmarks that exceed industry requirements.' },
            { title: 'Legacy Handover', desc: 'Complete documentation for the century-long asset lifecycle.' }
        ],
        faqs: [
            { question: 'What scale of projects do you facilitate?', answer: 'We primarily facilitate Tier-1 infrastructure developments including national highways, iconic bridges, and smart-city utilities.' },
            { question: 'How is structural honor maintained?', answer: 'Via our proprietary "Honor Audit" system which maintains 100% compliance with both local and global engineering safety codes.' }
        ]
    },
};

const ServiceDetail = () => {
    const { id } = useParams();
    const service = SERVICE_DATA[id] || SERVICE_DATA['infrastructure'];

    return (
        <div className="bg-nk-base">
            <section className="relative h-[70vh] flex items-end pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={service.banner} alt={service.title} className="w-full h-full object-cover grayscale opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-nk-olive via-nk-olive/40 to-transparent" />
                </div>
                <div className="section-container relative z-10 w-full text-nk-sand-light">
                    <Link to="/services" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowLeft size={16} className="mr-3" /> Back to Domains
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-8xl font-heading"
                    >
                        {service.title}
                    </motion.h1>
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-16">
                        <div>
                            <h2 className="text-4xl font-heading text-nk-olive-dark mb-10 border-b border-nk-olive/10 pb-6">Core Domain Overview</h2>
                            <p className="text-nk-olive/70 font-body text-xl leading-relaxed italic">
                                {service.overview}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {[
                                "Elite Infrastructure Protocols",
                                "Advanced BIM Mastery",
                                "Century-Asset Lifecycle",
                                "Environmental Honor Code"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 border-l-2 border-nk-sand pl-6 py-2">
                                    <CheckCircle2 className="text-nk-olive" size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest text-nk-olive-dark">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside>
                        <div className="bg-nk-sand/15 p-12 border border-nk-olive/5 shadow-sm sticky top-28">
                            <div className="flex items-center space-x-3 text-nk-olive mb-10">
                                <FileText size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quotation Range</span>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <span className="text-nk-olive/40 text-[10px] font-black uppercase tracking-widest block mb-1">Standard Start</span>
                                    <p className="text-4xl font-heading text-nk-olive-dark">{service.quotation.min}</p>
                                </div>
                                <div>
                                    <span className="text-nk-olive/40 text-[10px] font-black uppercase tracking-widest block mb-1">Maximum Scale</span>
                                    <p className="text-4xl font-heading text-nk-olive-dark">{service.quotation.max}</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-nk-olive/40 mt-10 italic font-body">
                                * {service.quotation.note}
                            </p>
                            <Button className="w-full mt-10" size="lg">Request Domain Consultation</Button>
                        </div>
                    </aside>
                </div>
            </Section>

            {/* Process - Sharp Vertical Steps */}
            <Section className="bg-nk-base" title="The Mastery Process" subtitle="Implementation System">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-nk-olive/10">
                    {service.process.map((step, i) => (
                        <div key={i} className="p-12 border-r border-nk-olive/10 last:border-0 hover:bg-nk-sand/5 transition-colors">
                            <div className="font-heading text-4xl text-nk-olive-light/20 mb-8">0{i + 1}</div>
                            <h4 className="font-heading text-2xl text-nk-olive-dark mb-6">{step.title}</h4>
                            <p className="text-nk-olive/60 font-body text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-nk-sand/10" title="Domain Inquiries" subtitle="FAQ Support">
                <div className="max-w-4xl mx-auto">
                    <Accordion items={service.faqs} />
                </div>
            </Section>
        </div>
    );
};

export default ServiceDetail;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Infrastructure Mastery',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5000/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: 'Infrastructure Mastery', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-nk-base font-body">
            <section className="olive-gradient-bg py-32 text-center text-nk-sand relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="section-container relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-heading mb-8"
                    >
                        Connect with Us
                    </motion.h1>
                    <p className="text-nk-sand/50 max-w-2xl mx-auto text-lg italic">
                        Facilitating global engineering partnerships through unyielding integrity and direct communication.
                    </p>
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                    {/* Contact Information */}
                    <div className="space-y-12">
                        <h2 className="text-4xl font-heading text-nk-olive-dark border-b border-nk-olive/10 pb-6">Our Bureaus</h2>

                        {[
                            {
                                title: "Corporate Headquarters",
                                address: "123 Engineering Way, BKC, Mumbai, MH 400051",
                                phone: "+91 22 1234 5678",
                                email: "mumbai@nkengineering.com"
                            },
                            {
                                title: "Regional Operations - Pune",
                                address: "45 Tech Park, Viman Nagar, Pune, MH 411014",
                                phone: "+91 20 8765 4321",
                                email: "pune@nkengineering.com"
                            }
                        ].map((office, i) => (
                            <div key={i} className="p-10 border border-nk-olive/10 bg-nk-sand/5 hover:bg-white hover:shadow-2xl transition-all duration-700">
                                <h3 className="text-2xl font-heading text-nk-olive-dark mb-8">{office.title}</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 text-nk-olive/60">
                                        <MapPin size={20} className="text-nk-olive shrink-0" />
                                        <span className="text-sm leading-relaxed">{office.address}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-nk-olive/60">
                                        <Phone size={20} className="text-nk-olive shrink-0" />
                                        <span className="text-[13px] font-black uppercase tracking-widest">{office.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-nk-olive/60">
                                        <Mail size={20} className="text-nk-olive shrink-0" />
                                        <span className="text-[13px] font-bold underline decoration-nk-olive/20">{office.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-10 bg-nk-olive text-nk-sand shadow-2xl">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-60">Consultation Window</h3>
                            <div className="space-y-5">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest border-b border-nk-sand/10 pb-4">
                                    <span>Mon - Fri</span>
                                    <span className="text-nk-sand-light">09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest border-b border-nk-sand/10 pb-4">
                                    <span>Saturday</span>
                                    <span className="text-nk-sand-light">10:00 - 14:00</span>
                                </div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest pt-2">
                                    <span className="opacity-40">Sunday</span>
                                    <span className="text-nk-sand-light">Closed Bureau</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form - High End */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-16 shadow-2xl border-t-8 border-nk-olive relative">
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-12"
                                    >
                                        <CheckCircle2 size={100} className="text-nk-olive mb-8" />
                                        <h3 className="text-4xl font-heading text-nk-olive-dark mb-4 italic">Brief Dispatched</h3>
                                        <p className="text-nk-olive/60 font-body text-lg">Your structural request has been synchronized with our central bureau. A lead engineer will review the narrative shortly.</p>
                                        <Button variant="outline" className="mt-12" onClick={() => setStatus('idle')}>Update Registry</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <h2 className="text-4xl font-heading text-nk-olive-dark mb-12 flex items-center">
                                <MessageSquare className="mr-6 text-nk-olive/20" size={32} /> Send a Brief
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {status === 'error' && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-6 flex items-center space-x-6">
                                        <AlertCircle className="text-red-500" size={24} />
                                        <p className="text-red-700 text-xs font-black uppercase tracking-widest">Communication Failure. Please retry the transmission.</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Full Nomenclature</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Admiral Johnathan Smith"
                                            className="w-full bg-nk-sand/5 border-b border-nk-olive/20 py-5 px-4 focus:border-nk-olive focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Email Corridor</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="official@domain.com"
                                            className="w-full bg-nk-sand/5 border-b border-nk-olive/20 py-5 px-4 focus:border-nk-olive focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Direct Communication</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-nk-sand/5 border-b border-nk-olive/20 py-5 px-4 focus:border-nk-olive focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Service Domain</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-nk-sand/5 border-b border-nk-olive/20 py-5 px-4 focus:border-nk-olive focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Infrastructure Mastery</option>
                                            <option>Architectural Grandeur</option>
                                            <option>Project Custodianship</option>
                                            <option>Elite Career Interest</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] pl-1">Detailed Brief</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe the project scope and royal requirements..."
                                        className="w-full bg-nk-sand/5 border-b border-nk-olive/20 py-5 px-4 focus:border-nk-olive focus:bg-white outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-6 text-lg hover:shadow-[0_20px_40px_-5px_rgba(83,84,52,0.3)] disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Encrypting & Dispatching...' : 'Dispatch Brief'}
                                    {status !== 'loading' && <Send size={20} className="ml-4" />}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Contact;

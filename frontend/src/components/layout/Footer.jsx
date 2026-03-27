import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="olive-gradient-bg text-nk-sand pt-24 pb-12 border-t-4 border-nk-sand/10">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-nk-sand rounded-none flex items-center justify-center">
                                <span className="text-nk-olive font-heading text-2xl">NK</span>
                            </div>
                            <span className="text-nk-sand font-heading text-2xl leading-none tracking-tight">NK ENGINEERING</span>
                        </Link>
                        <p className="text-nk-sand/60 text-sm leading-relaxed font-body">
                            Leading the architectural and engineering landscape through precision, royal commitment, and sustainable infrastructure since 2001.
                        </p>
                        <div className="flex space-x-6">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-none bg-white/5 border border-nk-sand/20 flex items-center justify-center hover:bg-nk-sand hover:text-nk-olive transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-nk-sand-light">Corporate</h3>
                        <ul className="space-y-5">
                            {['About Us', 'Our Projects', 'Services', 'Contact Us', 'Careers'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={`/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-nk-sand/50 hover:text-nk-sand flex items-center group text-[11px] font-bold uppercase tracking-widest"
                                    >
                                        <ArrowRight size={14} className="mr-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-nk-sand-light">Core Expertise</h3>
                        <ul className="space-y-5">
                            {[
                                'Infrastructure Planning',
                                'Architectural Design',
                                'Project Management',
                                'Structural Engineering',
                                'Sustainable Building'
                            ].map((service) => (
                                <li key={service}>
                                    <Link
                                        to="/services"
                                        className="text-nk-sand/50 hover:text-nk-sand text-[11px] font-bold uppercase tracking-widest"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-nk-sand-light">Headquarters</h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4 text-sm text-nk-sand/60">
                                <MapPin size={20} className="text-nk-sand mt-0.5 shrink-0" />
                                <span className="font-body leading-relaxed">256C Tiruchengodu Road,<br/>Namakkal</span>

                            </div>
                            <div className="flex items-center space-x-4 text-sm text-nk-sand/60">
                                <Phone size={20} className="text-nk-sand shrink-0" />
                                <span className="font-body">+91 8807783199</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-nk-sand/60">
                                <Mail size={20} className="text-nk-sand shrink-0" />
                                <span className="font-body underline decoration-nk-sand/30">nkenggconstruction@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-nk-sand/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <p className="text-nk-sand/30 text-[10px] font-bold uppercase tracking-widest">
                        © {currentYear} NK Engineering Consultancy. The hallmark of excellence.
                    </p>
                    <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-nk-sand/30">
                        <a href="#" className="hover:text-nk-sand transition-colors">Privacy</a>
                        <a href="#" className="hover:text-nk-sand transition-colors">Terms</a>
                        <a href="#" className="hover:text-nk-sand transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, Clock, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
        name: 'Services',
        path: '/services',
        dropdown: [
            { name: 'Infrastructure', path: '/services/infrastructure' },
            { name: 'Architecture', path: '/services/architecture' },
            { name: 'Consultancy', path: '/services/consultancy' },
            { name: 'Project Management', path: '/services/pmc' },
        ]
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            {/* Top Bar */}
            <div className="hidden lg:block bg-nk-olive text-nk-sand-light py-2.5 border-b border-white/5">
                <div className="section-container !py-0 flex justify-between items-center text-[10px] font-bold tracking-[0.1em] uppercase">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <Mail size={12} className="text-nk-sand" />
                            <span>nkenggconstruction@gmail.com</span>
                        </div>
                        
                    </div>
                     <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <Phone size={12} className="text-nk-sand" />
                            <span>+91 7373754099</span>
                            <span>+91 8807783199</span>
                        </div>
                        
                    </div>
                </div>
            </div>

            <header
                className={cn(
                    "sticky top-0 z-50 transition-all duration-500 w-full",
                    isScrolled
                        ? "bg-nk-base/95 backdrop-blur-lg shadow-xl py-4"
                        : "bg-nk-base py-7"
                )}
            >
                <nav className="section-container !py-0 flex items-center justify-between w-full">
                    <Link to="/" className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 bg-nk-olive rounded-none flex items-center justify-center transition-transform group-hover:rotate-45">
                            <span className="text-nk-sand font-heading text-2xl -rotate-45">NK</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-nk-olive font-heading text-2xl leading-none tracking-tight">NK ENGINEERING</span>
                            <span className="text-nk-olive-light text-[10px] tracking-[0.3em] font-black uppercase mt-1"></span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={cn(
                                        "flex items-center space-x-1 text-xs font-bold uppercase tracking-[0.15em] transition-all py-2",
                                        location.pathname === link.path
                                            ? "text-nk-olive border-b-2 border-nk-olive"
                                            : "text-nk-olive/60 hover:text-nk-olive"
                                    )}
                                >
                                    <span>{link.name}</span>
                                    {link.dropdown && <ChevronDown size={14} className="opacity-40" />}
                                </Link>

                                {link.dropdown && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 15 }}
                                                className="absolute top-full left-0 w-64 bg-nk-base shadow-2xl rounded-none border-t-2 border-nk-olive overflow-hidden py-4 mt-2"
                                            >
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        className="block px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-nk-olive/60 hover:bg-nk-sand/10 hover:text-nk-olive transition-all"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center space-x-4">
                            {localStorage.getItem('userName') ? (
                                <div className="flex items-center space-x-4">
                                    <Link to="/dashboard" className="text-[11px] font-black uppercase tracking-[0.2em] text-nk-olive hover:underline underline-offset-4">
                                        Dashboard
                                    </Link>
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-nk-olive/40">
                                        Welcome, {localStorage.getItem('userName')}
                                    </span>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('userToken');
                                            localStorage.removeItem('userName');
                                            localStorage.removeItem('adminToken');
                                            window.location.href = '/';
                                        }}
                                        className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-[11px] font-black uppercase tracking-[0.2em] text-nk-olive/60 hover:text-nk-olive transition-all"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-nk-sand border border-nk-olive/10 text-nk-olive px-6 py-3 rounded-none text-[11px] font-black uppercase tracking-[0.2em] hover:bg-nk-olive hover:text-nk-sand transition-all"
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                            <Link
                                to="/book-appointment"
                                className="bg-nk-olive text-nk-sand px-8 py-3 rounded-none text-[11px] font-black uppercase tracking-[0.2em] hover:bg-nk-olive-dark transition-all transform hover:shadow-lg active:scale-95"
                            >
                                Consult Now
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-nk-olive p-1"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </nav>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            className="fixed inset-0 top-[header-height] bg-nk-base z-40 lg:hidden flex flex-col p-10 space-y-8"
                        >
                            {/* Simplified mobile nav implementation for space */}
                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="text-2xl font-heading text-nk-olive"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-8 space-y-4">
                                {localStorage.getItem('userName') ? (
                                    <Link
                                        to="/dashboard"
                                        className="w-full text-center block bg-nk-olive text-nk-sand py-4 text-sm font-black uppercase tracking-widest"
                                    >
                                        Go to dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="w-full text-center block text-nk-olive py-4 text-sm font-black uppercase tracking-widest border border-nk-olive/20"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="w-full text-center block bg-nk-sand text-nk-olive py-4 text-sm font-black uppercase tracking-widest border border-nk-olive/20"
                                        >
                                            Create Account
                                        </Link>
                                    </>
                                )}
                                <Link
                                    to="/book-appointment"
                                    className="w-full text-center block bg-nk-olive text-nk-sand py-5 text-sm font-black uppercase tracking-widest"
                                >
                                    Schedule Consultation
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Building2, HardHat, Ruler, Users, Award, MapPin, Phone, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import CountUp from '../components/ui/CountUp';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
    {
        image: "src/images/nk1.jpg",
        title: "Engineering Excellence for a Better Tomorrow",
        subtitle: "Premium  services for world-class infrastructure and urban development.",
    },
   
    {
        image: "src/images/nk4.jpg",
        title: "Global Expertise, Local Knowledge",
        subtitle: "Delivering world-class engineering landmarks across the continent.",
    }
];

const STATS = [
    { label: "Completed Projects", value: 15, suffix: "+", icon: Building2 },
    { label: "Sq. Ft. Managed", value: 5, suffix: "+", icon: Ruler },
    { label: "Years of Legacy", value: 3, suffix: "+", icon: Award },
    { label: "Professional Experts", value: 25, suffix: "+", icon: Users },
];

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <div className="overflow-hidden bg-nk-base">
            {/* Hero Section */}
            <section className="relative h-[95vh] olive-gradient-bg overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-nk-olive-dark/40 z-10" />
                        <img
                            src={HERO_SLIDES[currentSlide].image}
                            alt="Hero"
                            className="w-full h-full object-cover mix-blend-overlay opacity-60"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-20 h-full section-container flex items-center">
                    <div className="max-w-4xl">
                        <motion.div
                            key={`text-${currentSlide}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <span className="font-ui font-black text-nk-sand tracking-[0.4em] uppercase text-xs mb-8 block">
                                Professional Engineering
                            </span>
                            <h1 className="text-6xl md:text-8xl font-heading text-nk-sand-light leading-[1.05] mb-8">
                                {HERO_SLIDES[currentSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-nk-sand/80 mb-12 leading-relaxed max-w-2xl font-body italic">
                                {HERO_SLIDES[currentSlide].subtitle}
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Button size="lg" variant="secondary" className="shadow-2xl">
                                    Consult Experts
                                </Button>
                                <Button size="lg" variant="outline" className="border-nk-sand text-nk-sand hover:bg-nk-sand hover:text-nk-olive">
                                    Iconic Projects
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="absolute bottom-16 right-16 z-30 flex items-center space-x-8">
                    <div className="flex items-center space-x-3 text-nk-sand/30 font-ui text-[10px] font-bold uppercase tracking-widest">
                        <span>0{currentSlide + 1}</span>
                        <div className="w-12 h-px bg-nk-sand/20" />
                        <span>0{HERO_SLIDES.length}</span>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={prevSlide}
                            className="w-14 h-14 rounded-none border border-nk-sand/20 flex items-center justify-center text-nk-sand hover:bg-nk-sand hover:text-nk-olive transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-14 h-14 rounded-none border border-nk-sand/20 flex items-center justify-center text-nk-sand hover:bg-nk-sand hover:text-nk-olive transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section with Sand Surface */}
            <section className="bubble-glass py-12 border border-nk-olive/5 relative z-30 -mt-12 mx-auto max-w-[1600px] shadow-2xl flex items-center bg-white/40 backdrop-blur-2xl">
                <div className="px-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {STATS.map((stat, index) => (
                        <div key={index} className="flex flex-col items-start border-l border-nk-olive/10 pl-10 first:border-0">
                            <div className="text-nk-olive-light font-ui font-black text-xs uppercase tracking-[0.3em] mb-4">
                                {stat.label}
                            </div>
                            <div className="text-6xl font-heading text-nk-olive-dark flex items-baseline leading-none">
                                <CountUp end={stat.value} />
                                <span className="text-3xl text-nk-olive/40 ml-1">{stat.suffix}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Preview */}
            <Section
                subtitle="Our Domain Expertise"
                title="Royal Standard Engineering Solutions"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Infrastructure Planning",
                            desc: "Providing the master blueprints for urban evolution with meticulous technical care.",
                            icon: Building2
                        },
                        {
                            title: "Architectural Grandeur",
                            desc: "Where engineering meets art to create timeless structures that define horizons.",
                            icon: Ruler
                        },
                        {
                            title: "Project Management",
                            desc: "Ensuring flawless execution and absolute quality control with enterprise rigor.",
                            icon: HardHat
                        }
                    ].map((service, i) => (
                        <div key={i} className="bubble-glass p-12 hover-pop group">
                            <div className="w-20 h-20 bg-nk-olive text-nk-sand rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 shadow-xl group-hover:rotate-12 group-hover:scale-110">
                                <service.icon size={36} />
                            </div>
                            <h3 className="text-3xl font-heading mb-6 text-nk-olive-dark group-hover:italic transition-all">{service.title}</h3>
                            <p className="text-nk-olive/70 font-body text-lg leading-relaxed mb-10 group-hover:text-nk-olive-dark transition-colors">
                                {service.desc}
                            </p>
                            <Link to="/services" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] text-nk-olive border-b-2 border-nk-olive/20 pb-1 group-hover:border-nk-olive transition-all">
                                Case Details <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </Section>

            {/* About Preview - Royal Contrast Layout */}
            <Section className="bg-nk-sand/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-none overflow-hidden shadow-[40px_40px_0px_0px_rgba(83,84,52,0.05)] border-8 border-white p-4 bg-white">
                            <img
                                src="src/images/nk4.jpg"
                                alt="About NK Engineering"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 bg-nk-olive p-12 text-nk-sand shadow-2xl hidden md:block border-t-8 border-l-8 border-white">
                            <p className="text-6xl font-heading mb-2 leading-none">25</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Years of Integrity</p>
                        </div>
                    </motion.div>

                    <div className="space-y-10">
                        <span className="font-ui font-black text-nk-olive-light tracking-[0.4em] uppercase text-xs">The NK Philosophy</span>
                        <h2 className="text-6xl md:text-7xl font-heading text-nk-olive-dark leading-tight">Elite Infrastructure For Global Leaders</h2>
                        <div className="space-y-8">
                            <p className="text-nk-olive/80 font-body text-2xl leading-relaxed">
                                Founded on the principles of structural integrity and royal commitment, NK Engineering stands as a cornerstone in the Indian consultancy landscape.
                            </p>
                            <p className="text-nk-olive/70 font-body text-xl leading-relaxed">
                                Our multidisciplinary team bridges the gap between visionary architectural concepts and rigorous structural reality, ensuring absolute global standards.
                            </p>
                        </div>
                        <div className="pt-8">
                            <Button size="huge" variant="outline" className="border-nk-olive text-nk-olive hover:bg-nk-olive hover:text-nk-sand px-16">
                                Learn our Legacy
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Projects Preview - Dark Royal Mode *
            <Section
                title="Works of Architectural Honor"
                subtitle="Recent Engagements"
                dark
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        {
                            title: "The Helix Bridge",
                            location: "Mumbai, India",
                            image: "src/images/nk1.jpg",
                            category: "Infrastructure"
                        },
                        {
                            title: "Zenith Business Tower",
                            location: "Pune, India",
                            image: "src/images/nk3.jpg",
                            category: "Modern Architecture"
                        }
                    ].map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.3, duration: 1 }}
                            className="group relative h-[500px] overflow-hidden cursor-pointer"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-nk-charcoal via-nk-charcoal/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute bottom-0 left-0 p-12 text-nk-sand w-full">
                                <span className="font-ui font-black text-xs uppercase tracking-[0.4em] mb-4 block text-nk-sand-light opacity-60">
                                    {project.category}
                                </span>
                                <h3 className="text-5xl font-heading mb-8">{project.title}</h3>
                                <div className="flex items-center justify-between border-t border-nk-sand/20 pt-8">
                                    <p className="text-nk-sand/50 text-sm flex items-center font-ui uppercase tracking-[0.2em] font-bold">
                                        <MapPin size={18} className="mr-4" /> {project.location}
                                    </p>
                                    <div className="w-16 h-16 bg-nk-sand text-nk-olive flex items-center justify-center -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl">
                                        <ArrowRight size={32} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-20 text-center">
                    <Button variant="outline" size="lg" className="border-nk-sand text-nk-sand hover:bg-nk-sand hover:text-nk-olive">
                        Examine Full Portfolio
                    </Button>
                </div>
            </Section>

            {/* Testimonials - Elite Voice 
            <Section subtitle="Client Testimonials" title="Recognition of Excellence">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            name: "Rajesh Malhotra",
                            role: "Director, BuildCorp India",
                            content: "NK Engineering brought unparalleled technical expertise to our airport expansion project. Their attention to detail and commitment to safety is extraordinary.",
                            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                        },
                        {
                            name: "Ananya Sharma",
                            role: "Urban Planner, BMC",
                            content: "The sustainable drainage solutions provided for the city masterplan were both innovative and cost-effective. A truly professional team.",
                            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
                        },
                        {
                            name: "David Chen",
                            role: "CEO, TechPark Global",
                            content: "From architectural vision to structural completion, NK Engineering delivered excellence. Their project management is world-class.",
                            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bubble-glass p-12 flex flex-col h-full bg-white/40 text-center hover-pop">
                            <div className="flex-grow mb-12 pt-4">
                                <p className="text-nk-olive-dark font-body italic text-xl leading-relaxed opacity-90">"{item.content}"</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full object-cover border-4 border-nk-olive/20 mb-6 shadow-2xl" />
                                <h4 className="font-heading text-2xl text-nk-olive-dark">{item.name}</h4>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-nk-olive/50 mt-2">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>*/}   

            {/* Final Call - High Impact Premium */}
            <section className="bg-nk-base pt-16 pb-32">
                <div className="section-container">
                    <div className="bubble-glass p-16 md:p-24 relative overflow-hidden group bg-nk-olive text-nk-sand transition-all duration-700 hover:shadow-nk-olive/30 shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-nk-sand/5 skew-x-12 translate-x-1/2" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10">
                                <h2 className="text-6xl md:text-8xl font-heading text-nk-sand-light leading-none">Start Your Royal Legacy Project</h2>
                                <p className="text-nk-sand/60 text-2xl font-body italic">
                                    Join the league of elite organizations transforming India's infrastructure landscape.
                                </p>
                                <div className="flex flex-wrap gap-12 pt-6">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-white/10 text-nk-sand flex items-center justify-center rounded-2xl">
                                            <Phone size={32} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-nk-sand/40 tracking-[0.2em] mb-1">Speak to Advisor</p>
                                            <p className="text-nk-sand text-2xl font-bold">+91 8807783199  </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-white/10 text-nk-sand flex items-center justify-center rounded-2xl">
                                            <Mail size={32} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-nk-sand/40 tracking-[0.2em] mb-1">Send Portfolio</p>
                                            <p className="text-nk-sand text-2xl font-bold underline decoration-nk-sand/30">nkenggconstruction@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                <Button size="huge" variant="secondary" className="px-20 py-10 text-2xl shadow-2xl hover:scale-105 transition-transform">
                                    Secure Consultation
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

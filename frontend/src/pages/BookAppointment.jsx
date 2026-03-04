import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, CheckCircle2 } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const BookAppointment = () => {
    const [selectedMethod, setSelectedMethod] = useState('Digital Portal');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];
    const dates = [
        { day: "Mon", date: "26 Jan" },
        { day: "Tue", date: "27 Jan" },
        { day: "Wed", date: "28 Jan" },
        { day: "Thu", date: "29 Jan" },
        { day: "Fri", date: "30 Jan" },
    ];

    return (
        <div className="bg-nk-base min-h-screen">
            <section className="olive-gradient-bg py-24 text-center text-nk-sand">
                <div className="section-container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading mb-6"
                    >
                        Schedule Consultation
                    </motion.h1>
                    <p className="text-nk-sand/50 max-w-2xl mx-auto italic font-body">
                        Reserve a 30-minute private window with our principal advisors.
                    </p>
                </div>
            </section>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Booking UI */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-3xl font-heading text-nk-olive-dark mb-10 flex items-center">
                                <Calendar className="mr-6 text-nk-olive/20" size={32} /> Select Window
                            </h2>

                            <div className="space-y-12">
                                <div>
                                    <p className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] mb-6">Available Dates</p>
                                    <div className="flex flex-wrap gap-5">
                                        {dates.map((d, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(d.date)}
                                                className={`flex flex-col items-center p-6 border-2 transition-all w-28 ${selectedDate === d.date
                                                        ? 'border-nk-olive bg-nk-olive text-nk-sand'
                                                        : 'border-nk-olive/10 hover:border-nk-olive/30 text-nk-olive/40'
                                                    }`}
                                            >
                                                <span className="text-[10px] uppercase font-bold tracking-widest">{d.day}</span>
                                                <span className="text-2xl font-heading">{d.date.split(' ')[0]}</span>
                                                <span className="text-[10px] uppercase font-bold">{d.date.split(' ')[1]}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] mb-6">Time Allocation</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`px-6 py-4 border-2 text-[11px] font-black uppercase tracking-widest transition-all ${selectedTime === time
                                                        ? 'border-nk-olive bg-nk-olive text-nk-sand'
                                                        : 'border-nk-olive/10 hover:border-nk-olive/30 text-nk-olive-dark'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-heading text-nk-olive-dark mb-10 flex items-center">
                                <Video className="mr-6 text-nk-olive/20" size={32} /> Consultation Mode
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {['Digital Portal', 'Bureau Presence'].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setSelectedMethod(method)}
                                        className={`flex items-center justify-between p-8 border-2 transition-all ${selectedMethod === method
                                                ? 'border-nk-olive bg-nk-sand/10'
                                                : 'border-nk-olive/10 hover:border-nk-olive/30'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-5">
                                            {method === 'Digital Portal' ? <Video className="text-nk-olive" /> : <Users className="text-nk-olive" />}
                                            <span className="font-heading text-xl text-nk-olive-dark">{method}</span>
                                        </div>
                                        {selectedMethod === method && <CheckCircle2 className="text-nk-olive" size={24} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Registry Details Form */}
                    <aside>
                        <div className="bg-nk-sand/15 p-12 border-t-8 border-nk-olive shadow-2xl sticky top-28">
                            <h3 className="text-2xl font-heading text-nk-olive-dark mb-10">Identity Details</h3>
                            <form className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] block mb-3">Principal Name</label>
                                    <input type="text" className="w-full bg-white border-none px-6 py-4 outline-none focus:ring-2 focus:ring-nk-olive" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] block mb-3">Official Email</label>
                                    <input type="email" className="w-full bg-white border-none px-6 py-4 outline-none focus:ring-2 focus:ring-nk-olive" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] block mb-3">Secure Contact</label>
                                    <input type="tel" className="w-full bg-white border-none px-6 py-4 outline-none focus:ring-2 focus:ring-nk-olive" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-nk-olive/40 uppercase tracking-[0.3em] block mb-3">Structural Context (Brief)</label>
                                    <textarea rows="3" className="w-full bg-white border-none px-6 py-4 outline-none focus:ring-2 focus:ring-nk-olive resize-none"></textarea>
                                </div>

                                <div className="pt-8 border-t border-nk-olive/10 space-y-5">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-nk-olive/40">Engagement Mode</span>
                                        <span className="text-nk-olive-dark">{selectedMethod}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-nk-olive/40">Reserved Window</span>
                                        <span className="text-nk-olive-dark">{selectedDate || 'Pending'}, {selectedTime || 'Pending'}</span>
                                    </div>
                                </div>

                                <Button className="w-full py-6 text-lg hover:shadow-2xl">
                                    Confirm Reservation
                                </Button>
                                <p className="text-[10px] text-nk-olive/40 text-center italic font-body mt-6">
                                    * A secure confirmation link will be dispatched to your corridor.
                                </p>
                            </form>
                        </div>
                    </aside>
                </div>
            </Section>
        </div>
    );
};

export default BookAppointment;

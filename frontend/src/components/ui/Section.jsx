import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Section = ({ title, subtitle, children, className, dark = false }) => {
    return (
        <section className={cn(
            "py-24 md:py-32 relative overflow-hidden",
            dark ? "olive-gradient-bg text-nk-sand" : "bg-nk-base text-nk-olive",
            className
        )}>
            {dark && (
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            )}
            <div className="section-container relative z-10">
                {(title || subtitle) && (
                    <div className="max-w-4xl mb-16 md:mb-20">
                        {subtitle && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "font-ui font-bold tracking-[0.2em] text-xs uppercase block mb-4",
                                    dark ? "text-nk-sand" : "text-nk-olive-light"
                                )}
                            >
                                {subtitle}
                            </motion.span>
                        )}
                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.8 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.1] mb-6"
                            >
                                {title}
                            </motion.h2>
                        )}
                        <div className={cn("w-20 h-1 mt-8", dark ? "bg-nk-sand" : "bg-nk-olive")} />
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;

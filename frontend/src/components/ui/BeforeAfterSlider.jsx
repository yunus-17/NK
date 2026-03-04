import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
        >
            {/* After Image (Background) */}
            <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-nk-navy/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                {afterLabel}
            </div>

            {/* Before Image (Foreground with Clip) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/80 text-nk-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Barrier */}
            <div
                className="absolute inset-y-0 z-20 w-1 bg-white shadow-xl flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center -translate-x-1/2">
                    <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-nk-navy/20 rounded-full" />
                        <div className="w-1 h-3 bg-nk-navy/20 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;

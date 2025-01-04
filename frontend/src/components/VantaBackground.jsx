import { useEffect, useRef } from "react";

const VantaBackground = ({ color = 0x4a90e2, backgroundColor = 0xffffff, gradient = false }) => {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        const loadVanta = () => {
            if (!vantaEffect.current) {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 50.0,
                    minWidth: 50.0,
                    scale: 0.5,
                    scaleMobile: 1.0,
                    color: color,
                    backgroundColor: backgroundColor,
                    points: 10.0,
                    maxDistance: 20.0,
                    spacing: 15.0,
                });
            }
        };

        loadVanta();

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, [color, backgroundColor]);

    return (
        <div className="fixed inset-0 h-full w-full -z-10">
            <div ref={vantaRef} className="h-full w-full" />
            {gradient && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-white to-cyan-950 opacity-60"
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default VantaBackground;

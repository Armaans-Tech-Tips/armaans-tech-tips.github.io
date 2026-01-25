import { useEffect, useState } from 'react';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Main cursor */}
            <div
                className="fixed w-5 h-5 rounded-full border-2 border-purple-500 pointer-events-none z-[9999] transition-transform duration-100"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) ${isPointer ? 'scale(1.5)' : 'scale(1)'}`,
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                    mixBlendMode: 'difference',
                }}
            />

            {/* Cursor trail */}
            <div
                className="fixed w-2 h-2 rounded-full bg-purple-500 pointer-events-none z-[9998] transition-all duration-200"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.6,
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)',
                }}
            />
        </>
    );
};

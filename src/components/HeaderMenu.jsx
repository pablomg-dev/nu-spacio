import React, { useState } from "react";

export default function HeaderMenu({ navLinks }) {
    const [open, setOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <a href="/" className="flex items-center gap-2">
                    <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
                    <span className="font-serif text-xl font-bold text-violet-800">Saint Germain</span>
                </a>
                <nav className="hidden md:flex gap-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-violet-800 font-medium hover:text-violet-600 transition">{link.name}</a>
                    ))}
                </nav>
            </div>
            {/* Overlay */}
            <div className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
            {/* Mobile nav */}
            <nav className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="absolute top-4 right-4" aria-label="Cerrar menu" onClick={() => setOpen(false)}>
                    <svg className="h-6 w-6 text-violet-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <ul className="flex flex-col gap-6 mt-20 px-8">
                    {navLinks.map(link => (
                        <li key={link.href}><a href={link.href} className="text-violet-800 text-lg font-medium hover:text-violet-600 transition" onClick={() => setOpen(false)}>{link.name}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

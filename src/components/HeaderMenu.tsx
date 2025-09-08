import React, { useState, useEffect, useRef } from "react";

declare global {
    interface Window {
        smoothScrollTo: (targetSelector: string) => void;
    }
}

interface NavLink {
    href: string;
    name: string;
    children?: NavLink[];
}

interface HeaderMenuProps {
    navLinks: NavLink[];
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ navLinks }) => {
    const [open, setOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [openDesktopSubMenu, setOpenDesktopSubMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLElement>(null);

    const handleSubMenuToggle = (name: string) => {
        setOpenSubMenu(openSubMenu === name ? null : name);
    };

    const handleDesktopSubMenuToggle = (name: string) => {
        setOpenDesktopSubMenu(openDesktopSubMenu === name ? null : name);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            if (window.location.pathname === '/') {
                e.preventDefault();
                const targetSelector = href.substring(1);
                window.smoothScrollTo(targetSelector);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenDesktopSubMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <a href="/" className="flex items-center gap-2">
                    <img src="/logo1.jpeg" alt="Logo Nu-Spacio" className="h-12 w-12 object-cover rounded-full bg-white border border-violet-200" />
                    <span className="text-xl font-bold text-blue-800 font-montserrat">Nu-Spacio</span>
                </a>
                <nav className="hidden md:flex gap-8" ref={menuRef}>
                    {navLinks.map(link => (
                        <div key={link.name} className="relative">
                            {link.children ? (
                                <>
                                    <div className="flex items-center gap-1">
                                        <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-blue-800 font-medium hover:text-blue-600 transition">{link.name}</a>
                                        <button 
                                            onClick={() => handleDesktopSubMenuToggle(link.name)}
                                            className="text-blue-800 font-medium hover:text-blue-600 transition"
                                        >
                                            <svg className={`h-4 w-4 transform transition-transform duration-300 ${openDesktopSubMenu === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div 
                                        className={`absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 transition-opacity duration-300 ${openDesktopSubMenu === link.name ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        {link.children.map(child => (
                                            <a key={child.href} href={child.href} className="block px-4 py-2 text-blue-800 hover:bg-violet-100">{child.name}</a>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-blue-800 font-medium hover:text-blue-600 transition">{link.name}</a>
                            )}
                        </div>
                    ))}
                </nav>
                {/* Botón hamburguesa solo en móviles */}
                <button
                    className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                    aria-label="Abrir menu"
                    onClick={() => setOpen(true)}
                >
                    <svg className="h-7 w-7 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Overlay */}
            <div className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
            {/* Mobile nav */}
            <nav className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="absolute top-4 right-4" aria-label="Cerrar menu" onClick={() => setOpen(false)}>
                    <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <ul className="flex flex-col gap-6 mt-20 px-8">
                    {navLinks.map(link => (
                        <li key={link.name}>
                            {link.children ? (
                                <>
                                    <div className="flex justify-between items-center">
                                        <a href={link.href} className="text-blue-800 text-lg font-medium hover:text-blue-600 transition" onClick={(e) => {handleLinkClick(e, link.href); setOpen(false);}}>{link.name}</a>
                                        <button onClick={() => handleSubMenuToggle(link.name)} className="text-blue-800 text-lg font-medium hover:text-blue-600 transition">
                                            <svg className={`h-5 w-5 transform transition-transform duration-300 ${openSubMenu === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <ul className={`pl-4 mt-2 ${openSubMenu === link.name ? 'block' : 'hidden'}`}>
                                        {link.children.map(child => (
                                            <li key={child.href} className="mt-2">
                                                <a href={child.href} className="text-blue-800 text-base font-medium hover:text-blue-600 transition" onClick={() => setOpen(false)}>{child.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <a href={link.href} className="text-blue-800 text-lg font-medium hover:text-blue-600 transition" onClick={(e) => {handleLinkClick(e, link.href); setOpen(false);}}>{link.name}</a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default HeaderMenu;
import { useEffect, useRef } from 'react';
import pfp from "../assets/personal-photo.jfif"

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const contactLinks = [
        {
            icon: '📧',
            label: 'Connect via Gmail',
            description: 'Send me an email',
            action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=divymav5@gmail.com', '_blank'),
            bgColor: 'from-[#EA4335] to-[#C5221F]'
        },
        {
            icon: '💼',
            label: 'Connect via LinkedIn',
            description: 'View my professional profile',
            action: () => window.open('https://linkedin.com/in/divy-mav-7b82b0249', '_blank'),
            bgColor: 'from-[#0077B5] to-[#005885]'
        },
        {
            icon: '💻',
            label: 'Connect via GitHub',
            description: 'Check out my repositories',
            action: () => window.open('https://github.com/divy-arun-mav', '_blank'),
            bgColor: 'from-[#333333] to-[#1a1a1a]'
        },
        {
            icon: '📱',
            label: 'Call Me',
            description: '+91 75067 55337',
            action: () => window.open('tel:+917506755337', '_blank'),
            bgColor: 'from-[#25D366] to-[#128C7E]'
        }
    ];

    return (
        <div
            ref={menuRef}
            className="absolute bottom-10 left-0 w-96 bg-gradient-to-b from-[#245EDC] to-[#3A8CF2] rounded-tr-lg shadow-2xl border-2 border-[#0831D9] overflow-hidden animate-slideUp"
            style={{
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
        >
            <div className="bg-gradient-to-r from-[#245EDC] via-[#3A8CF2] to-[#245EDC] px-6 py-3 border-b-2 border-[#0831D9]">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-300">
                        <img src={pfp} alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg drop-shadow-md">Divy Mav</h3>
                        <p className="text-blue-100 text-xs">Full-Stack Developer</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#D3E5FA] p-2">
                <div className="bg-white rounded border border-[#A7C0E8] shadow-inner">
                    <div className="px-3 py-2 border-b border-gray-200">
                        <h4 className="text-[#003399] font-bold text-sm">Get in Touch</h4>
                    </div>

                    <div className="p-2 space-y-1">
                        {contactLinks.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    link.action();
                                    onClose();
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded hover:bg-gradient-to-r hover:from-[#3168D5] hover:to-[#4A88E8] hover:text-white transition-all group border border-transparent hover:border-[#2557C7]"
                            >
                                <div className={`w-10 h-10 bg-gradient-to-br ${link.bgColor} rounded flex items-center justify-center text-xl shadow-md`}>
                                    {link.icon}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-sm font-semibold text-gray-800 group-hover:text-white">
                                        {link.label}
                                    </div>
                                    <div className="text-xs text-gray-600 group-hover:text-blue-100">
                                        {link.description}
                                    </div>
                                </div>
                                <div className="text-blue-600 group-hover:text-white text-lg">›</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-2 p-2 bg-gradient-to-b from-[#5B96EC] to-[#4A88E8] rounded border border-[#2557C7] shadow-inner">
                    <button
                        onClick={onClose}
                        className="w-full py-2 px-4 bg-gradient-to-b from-[#F46523] to-[#D84A1B] hover:from-[#FF7537] hover:to-[#E85829] text-white font-bold text-sm rounded shadow-md border border-[#C23D15] transition-all flex items-center justify-center gap-2"
                    >
                        <span>⏻</span>
                        <span>Close Menu</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;

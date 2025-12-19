'use client';

import { cn } from '@/lib/utilities/ui';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Fokusér input automatisk når søgefeltet åbnes
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!open) {
            setQuery('');
        }
    }, [open]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        router.push(`/search?query=${encodeURIComponent(query)}`);
        setQuery(''); // nulstil feltet
        setOpen(false); // luk overlay
    }

    return (
        <>
            {/* Ikon i headeren */}
            <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
            >
                {/* Mobil: 32px */}
                <Search size={32} strokeWidth={2} className="block lg:hidden" />

                {/* Desktop: 24px */}
                <Search size={24} strokeWidth={2} className="hidden lg:block" />
            </motion.button>

            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    >
                        {/* Luk-knap */}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-6 right-6 text-fg-base hover:text-fg-faded z-[60] pt-section-xxs pr-section-xxs cursor-pointer"
                        >
                            <X size={32} />
                        </button>

                        {/* Søgefelt container */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="absolute inset-0 flex justify-center items-center bg-bg-base md:h-[54vh] p-section-xxs w-full"
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                            exit={{ y: -100 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Tekstfelt */}
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={cn(
                                    'w-full text-fg-faded text-center heading-5 heading-4xl font-regular',
                                    'bg-transparent focus:outline-none',
                                    query.length === 0 ? '-indent-[200px]' : 'indent-0',
                                )}
                            />

                            {/* Placeholder*/}
                            {query.length === 0 && (
                                <span
                                    className={cn(
                                        'absolute inset-0  flex items-center justify-center',
                                        'heading-5 heading-4xl text-fg-faded/60 font-regular',
                                        'pointer-events-none select-none',
                                    )}
                                >
                                    SØG
                                </span>
                            )}
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

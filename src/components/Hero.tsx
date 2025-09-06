import { ArrowUpRightIcon, ChevronDownIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import screen1 from "@/assets/screen-1.png";
import screen2 from "@/assets/screen-2.png";
import screen3 from "@/assets/screen-3.png";
import { Button } from "./ui/button";

export default function Hero() {
    const scrollToFeatures = () => {
        document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const [open, setOpen] = useState(false)
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, ease: [0.33, 1, 0.68, 1], duration: 0.4 }
        }
    } as const
    const item = {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { ease: [0.33, 1, 0.68, 1], duration: 0.6 } }
    } as const
    return (
        <section id="hero" className="flex-1 flex flex-col lg:flex-row px-6 md:px-9 bg-[#2F52DF] min-h-dvh pt-20 overflow-hidden">
            <motion.div className="flex-1 self-stretch min-w-0 flex flex-col justify-center space-y-8 md:space-y-12" initial="hidden" animate="show" variants={container}>
                <div className="space-y-8">
                    <div className="space-y-6">
                        <motion.h1 className="text-4xl md:text-5xl/13 text-white text-center lg:text-left" variants={item}>The First Competitive 1v1 Quiz Game Designed for the UKMLA</motion.h1>
                        <motion.p className="hidden md:block text-white text-center lg:text-left text-lg md:text-2xl" variants={item}>Challenge friends or medical students around the globe. <br /><span className="font-semibold text-white italic text-xl md:text-3xl">Learn, compete, win.</span></motion.p>
                    </div>
                    <motion.div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start" variants={item}>
                        <Button onClick={() => setOpen(true)} variant={"default"} className="bg-white text-[#2F52DF] text-base !h-auto !py-3 !px-4 has-[>svg]:!px-6">Sign up for public testing <ArrowUpRightIcon /></Button>
                        <Button variant={"outline"} className="hidden md:block bg-transparent text-white text-base !h-auto !py-3 !px-4 has-[>svg]:!px-6 border-[1.5px]">Find out more</Button>
                    </motion.div>
                </div>
                <motion.div className="flex gap-2 items-center justify-center lg:justify-start" variants={item}>
                    <p onClick={scrollToFeatures} className="w-fit text-[#BEC5E2] hover:text-white cursor-pointer select-none">Scroll to explore </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={scrollToFeatures}
                        className="size-8 bg-white/10 text-white cursor-pointer"
                        aria-label="Scroll to content"
                        type="button"
                    >
                        <motion.span
                            aria-hidden
                            animate={{ y: [0, 6, 0], opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: [0.445, 0.05, 0.55, 0.95] }}
                        >
                            <ChevronDownIcon className="size-4" />
                        </motion.span>
                    </Button>
                </motion.div>

                {/* Mobile Carousel - ONLY for mobile screens */}
                <motion.div className="block md:hidden w-full h-64 mt-6 mb-6 relative" variants={item}>
                    <div className="h-full flex items-center justify-center">
                        <CarouselStack />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#2F52DF] to-transparent pointer-events-none"></div>
                </motion.div>
            </motion.div>

            <div className="hidden md:block lg:hidden w-full h-64 mt-6 mb-6">
                <div className="h-full flex items-center justify-center">
                    <CarouselStack />
                </div>
            </div>

            <div className="hidden lg:block flex-1 self-stretch min-w-0 min-h-0 overflow-hidden">
                <CarouselStack />
            </div>
            <SignupDialog open={open} onClose={() => setOpen(false)} />
        </section>
    )
}

function CarouselStack() {
    const images = [screen1, screen2, screen3]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 3500)
        return () => clearInterval(id)
    }, [images.length])

    const getPosition = (i: number) => {
        if (i === index) return "center"
        if (i === (index + 1) % images.length) return "right"
        return "left"
    }

    return (
        <div
            className="relative h-full w-full flex items-center justify-center"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            aria-roledescription="carousel"
        >
            {images.map((src, i) => {
                const position = getPosition(i)
                return (
                    <motion.img
                        key={i}
                        src={src}
                        alt={`App screen ${i + 1}`}
                        initial={false}
                        animate={
                            position === "center"
                                ? { x: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1, filter: "blur(0px)" }
                                : position === "left"
                                    ? { x: -100, scale: 0.9, rotate: -6, zIndex: 10, opacity: 0.9, filter: "blur(0.5px)" }
                                    : { x: 100, scale: 0.9, rotate: 6, zIndex: 10, opacity: 0.9, filter: "blur(0.5px)" }
                        }
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className="absolute rounded-[28px] shadow-2xl border border-white/20 bg-black/50 select-none pointer-events-none w-[140px] sm:w-[160px] md:w-[240px] lg:w-[340px]"
                        draggable={false}
                    />
                )
            })}
        </div>
    )
}

function SignupDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-50 grid place-items-center px-4"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
                            <button
                                aria-label="Close"
                                onClick={onClose}
                                className="absolute right-3 top-3 size-8 grid place-items-center rounded-md hover:bg-black/5"
                            >
                                <X className="size-5" />
                            </button>
                            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                                <span>◎ PUBLIC BETA</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">Join the MedRoyale Public Testing</h3>
                            <p className="text-center text-sm text-gray-600 mb-5">Be the first to try new features and help us improve for UKMLA students worldwide.</p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onClose();
                                }}
                                className="flex flex-col gap-3"
                            >
                                <input type="email" required placeholder="Email address" className="w-full rounded-md border px-4 py-3 text-base outline-none focus:ring-[3px] focus:ring-[#2F52DF]/30" />
                                <Button type="submit" className="w-full bg-[#2F52DF] text-white hover:bg-[#2F52DF]/90">
                                    Join the beta <ArrowUpRightIcon className="ml-2" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
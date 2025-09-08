import { motion } from "motion/react";
import { Button } from "./ui/button";
import screen1 from "@/assets/screen-1.png";
import screen2 from "@/assets/screen-2.png";
import screen3 from "@/assets/screen-3.png";

export default function CTA() {
    return (
        <section className="w-full bg-[#2F52DF] px-6 md:px-9 py-16 md:py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 w-full">
                    <h2
                        className="text-white font-semibold text-2xl md:text-3xl lg:text-[42px] leading-[115%] tracking-[0.0025em]"
                        style={{ fontFamily: "Figtree, sans-serif" }}
                    >
                        To build a community.
                        <br />To ignite competition.
                        <br />To make learning fun.
                    </h2>
                    <p
                        className="mt-6 text-white/90 text-[20px] leading-[28px] tracking-[0.0025em] max-w-2xl"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                        The journey starts here - and it starts with you.
                    </p>
                    <div className="mt-8 flex flex-col md:flex-row w-full max-w-xl gap-3">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full md:flex-1 text-[16px] rounded-full border border-white/70 bg-white/95 text-black placeholder-black/60 px-5 py-3 outline-none focus:ring-[3px] focus:ring-white/30"
                        />
                        <Button className="w-full md:w-auto rounded-full bg-black text-white hover:bg-black/90 !h-auto py-3 px-6">
                            Sign up
                        </Button>
                    </div>
                </div>
                <div className="relative flex-1 w-full min-h-[360px] md:min-h-[520px] flex items-center justify-end">
                    <div className="absolute right-0 -bottom-[25%] h-[120%] w-full max-w-[620px] translate-x-6 md:translate-x-16 scale-[1.08] pointer-events-none">
                        <PhonesStatic />
                    </div>
                </div>
            </div>
        </section>
    )
}

function PhonesStatic() {
    return (
        <div className="relative h-full w-full flex items-end justify-center">
            <motion.img
                src={screen2}
                alt="phone-left"
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                whileHover={{
                    rotateX: 10,
                    rotateY: -10,
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="absolute bottom-0 -left-6 rotate-[-6deg] z-10 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px]"
                draggable={false}
            />
            <motion.img
                src={screen1}
                alt="phone-center"
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
                whileHover={{
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.08,
                    y: -15,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="absolute bottom-0 z-20 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[180px] sm:w-[210px] md:w-[240px] lg:w-[280px]"
                draggable={false}
            />
            <motion.img
                src={screen3}
                alt="phone-right"
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.19 }}
                whileHover={{
                    rotateX: 10,
                    rotateY: 10,
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="absolute bottom-0 -right-6 rotate-[6deg] z-10 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px]"
                draggable={false}
            />
        </div>
    )
}



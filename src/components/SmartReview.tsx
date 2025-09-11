import iphone1 from "@/assets/spaced_rep/iphone_spaced_rep_1.png"
import iphone2 from "@/assets/spaced_rep/iphone_spaced_rep_2.png"
import iphone3 from "@/assets/spaced_rep/iphone_spaced_rep_3.png"
import blueCircle from "@/assets/spaced_rep/blue-circle.png"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { motion } from "motion/react"
import { ArrowUpRightIcon, GamepadIcon } from "lucide-react"
import { useMemo } from "react"

interface SmartReviewProps {
    badgeText?: string
    heading?: string
    description?: string
    leftTitle?: string
    leftDescription?: string
    rightTitle?: string
    rightDescription?: string
}

export default function SmartReview({
    badgeText = "Review mode",
    rightTitle = "Spaced repetition made simple",
    rightDescription = "Use the Review mode filter to control what topics are added. Our spaced repetition engine is built on FSRS – a cutting-edge, open-source algorithm designed to outperform traditional systems like Anki’s SM-2."
}: SmartReviewProps) {
    const contentAnimations = useMemo(() => ({
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" as const }
    }), [])

    return (
        <div className="relative w-full max-w-full mx-auto py-12">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={contentAnimations.initial}
                    animate={contentAnimations.animate}
                    transition={contentAnimations.transition}
                    className={`flex flex-col gap-4 order-2 lg:order-2 items-center text-center lg:items-end lg:text-right justify-end`}
                >
                    <Badge className="w-fit"><GamepadIcon /> {badgeText ?? "Review mode"}</Badge>
                    <h2
                        className="font-medium text-2xl md:text-3xl lg:text-[48px] leading-[115%] tracking-[0.0075em] whitespace-pre-line"
                        style={{ fontFamily: 'Figtree, sans-serif' }}
                    >
                        {rightTitle}
                    </h2>
                    <p className={`text-base md:text-lg text-muted-foreground max-w-prose`}>
                        {rightDescription}
                    </p>
                    <Button className="w-fit border-black" variant={"outline"}>Find out more <ArrowUpRightIcon /></Button>
                </motion.div>

                <div className="lg:col-span-1 relative flex justify-center order-1 lg:order-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src={blueCircle}
                            alt="Background decoration"
                            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] object-contain"
                        />
                    </div>

                    <div className="relative z-10 flex items-start justify-center gap-8 sm:gap-12 md:gap-16">
                        <div className="relative z-10 -mt-4 -ml-2">
                            <motion.img
                                src={iphone1}
                                alt="Review mode filter interface"
                                className="w-[130px] sm:w-[170px] md:w-[210px] lg:w-[230px] h-auto transform -rotate-[18deg] hover:rotate-0 transition-transform duration-300"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            />
                        </div>

                        <div className="relative z-20 -ml-4 group">
                            <motion.img
                                src={iphone3}
                                alt="Review mode question interface"
                                className="w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] h-auto transform rotate-[19.32deg] group-hover:rotate-0 transition-all duration-500 opacity-100 group-hover:opacity-0 absolute"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                            />
                            <motion.img
                                src={iphone2}
                                alt="Review mode question interface"
                                className="w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] h-auto transform rotate-[19.32deg] group-hover:rotate-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <Button
                    variant={"outline"}
                    className="w-fit"
                    onClick={() => {
                        const testSimulation = document.getElementById('test-simulation');
                        if (testSimulation) {
                            testSimulation.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Try our spaced repetition system
                </Button>
            </div>
        </div>
    )
}

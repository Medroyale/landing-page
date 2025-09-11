import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, GamepadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useMemo } from "react";

type Layout = "default" | "rtl" | "ltr";

type FeaturesProps = {
    layout: Layout
    imgSrc?: string
    badgeText?: string
    heading?: string
    description?: string
}

export default function Features({ layout, imgSrc, badgeText, heading, description }: FeaturesProps) {
    const textBadge = badgeText ?? "Unique PVP"
    const textHeading = heading ?? "A New UKMLA Question Bank You Can Trust"
    const textDescription = description ??
        "Questions are handcrafted by a team of doctors, ranging from one to a decade of experience, highly detailed explanations, helping you to understand, not memorise."
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const shouldReduceMotion = useReducedMotion()

    const inView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
        margin: "0px 0px -5% 0px"
    })

    const animationVariants = useMemo(() => ({
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const }
    }), [shouldReduceMotion])

    const staggerVariants = useMemo(() => ({
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" as const, delay: shouldReduceMotion ? 0 : 0.05 }
    }), [shouldReduceMotion])
    const hoverAnimations = useMemo(() => shouldReduceMotion ? {} : {
        whileHover: {
            scale: 1.02,
            y: -5,
            transition: { type: "spring" as const, stiffness: 300, damping: 20 }
        },
        whileTap: { scale: 0.98 }
    }, [shouldReduceMotion])

    if (layout === "default") {
        return (
            <motion.section
                ref={sectionRef as any}
                initial={animationVariants.initial}
                animate={inView ? animationVariants.animate : animationVariants.initial}
                transition={animationVariants.transition}
                className="flex flex-col items-center text-center"
            >
                <motion.div
                    initial={staggerVariants.initial}
                    animate={inView ? staggerVariants.animate : staggerVariants.initial}
                    transition={staggerVariants.transition}
                >
                    <Badge><GamepadIcon /> {textBadge}</Badge>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" as const, delay: shouldReduceMotion ? 0 : 0.1 }}
                    className="font-medium text-2xl md:text-3xl lg:text-[42px] leading-[115%] tracking-[0.0075em] max-w-3xl whitespace-pre-line"
                    style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                    {textHeading}
                </motion.h2>
                {textDescription && (
                    <motion.p
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" as const, delay: shouldReduceMotion ? 0 : 0.15 }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl"
                    >
                        {textDescription}
                    </motion.p>
                )}
                <motion.div
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut" as const, delay: shouldReduceMotion ? 0 : 0.2 }}
                    className="mt-8 mb-8 w-full mx-auto px-0"
                >
                    <motion.img
                        src={imgSrc}
                        alt="MedRoyale App Highlight"
                        className="rounded-[16px] w-full h-[220px] sm:h-[300px] md:h-[380px] block cursor-pointer"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0
                        }}
                        loading="lazy"
                        {...hoverAnimations}
                    />
                </motion.div>
            </motion.section>
        )
    }

    const contentAnimations = useMemo(() => ({
        initial: { opacity: 0, x: shouldReduceMotion ? 0 : (layout === "ltr" ? 40 : -40) },
        animate: { opacity: 1, x: 0 },
        transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const }
    }), [shouldReduceMotion, layout])

    const mediaAnimations = useMemo(() => ({
        initial: { opacity: 0, x: shouldReduceMotion ? 0 : (layout === "ltr" ? -40 : 40), scale: shouldReduceMotion ? 1 : 0.9 },
        animate: { opacity: 1, x: 0, scale: 1 },
        transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const }
    }), [shouldReduceMotion, layout])

    const mediaHoverAnimations = useMemo(() => shouldReduceMotion ? {} : {
        whileHover: {
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: { type: "spring" as const, stiffness: 300, damping: 20 }
        },
        whileTap: { scale: 0.98 }
    }, [shouldReduceMotion])

    const content = (
        <motion.div
            initial={contentAnimations.initial}
            animate={inView ? contentAnimations.animate : contentAnimations.initial}
            transition={contentAnimations.transition}
            className={`flex flex-col gap-4 items-center text-center ${layout === "ltr" ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}
        >
            <Badge className="w-fit"><GamepadIcon /> {textBadge}</Badge>
            <h2
                className="font-medium text-2xl md:text-3xl lg:text-[48px] leading-[115%] tracking-[0.0075em] whitespace-pre-line"
                style={{ fontFamily: 'Figtree, sans-serif' }}
            >
                {textHeading}
            </h2>
            <p className={`text-base md:text-lg text-muted-foreground max-w-prose ${layout === "ltr" ? "md:text-right" : "md:text-left"}`}>
                {textDescription}
            </p>
            <Button className="w-fit border-black" variant={"outline"}>Find out more <ArrowUpRightIcon /></Button>
        </motion.div>
    )

    const media = (
        <motion.div
            initial={mediaAnimations.initial}
            animate={inView ? mediaAnimations.animate : mediaAnimations.initial}
            transition={mediaAnimations.transition}
            className="w-full flex justify-center px-0"
        >
            <motion.img
                src={imgSrc}
                alt={textHeading}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0
                }}
                className="rounded-[16px] w-full md:w-[720px] lg:w-[900px] h-[240px] md:h-[320px] lg:h-[380px] object-contain bg-white cursor-pointer mt-12 mb-8 mx-auto px-0"
                loading="lazy"
                {...mediaHoverAnimations}
            />
        </motion.div>
    )

    return (
        <motion.section
            ref={sectionRef as any}
            initial={animationVariants.initial}
            animate={inView ? animationVariants.animate : animationVariants.initial}
            transition={animationVariants.transition}
            className="grid gap-8 md:gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 items-center"
        >
            <div className={layout === "ltr" ? "md:order-2" : "md:order-1"}>{content}</div>
            <div className={layout === "ltr" ? "md:order-1" : "md:order-2"}>{media}</div>
        </motion.section>
    )
}
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, GamepadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

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
    const imageSrc = imgSrc ?? "/hero-image.png"
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const inView = useInView(sectionRef, { once: true, amount: 0.3, margin: "0px 0px -10% 0px" })
    if (layout === "default") {
        return (
            <motion.section
                ref={sectionRef as any}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center gap-2"
            >
                <motion.div initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}>
                    <Badge><GamepadIcon /> {textBadge}</Badge>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    className="font-medium text-2xl md:text-3xl lg:text-[42px] leading-[115%] tracking-[0.0075em] max-w-3xl"
                    style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                    {textHeading}
                </motion.h2>
                {textDescription && (
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                        transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl"
                    >
                        {textDescription}
                    </motion.p>
                )}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="mt-8 -mx-6 md:-mx-9 w-full"
                >
                    <div className="rounded-[16px] border-black/10 w-full h-[240px] md:h-[320px] bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        Test Image Placeholder
                    </div>
                </motion.div>
            </motion.section>
        )
    }

    const content = (
        <motion.div
            initial={{ opacity: 0, x: layout === "ltr" ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: layout === "ltr" ? 40 : -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
        >
            <Badge className="w-fit"><GamepadIcon /> {textBadge}</Badge>
            <h2
                className="font-medium text-2xl md:text-3xl lg:text-[48px] leading-[115%] tracking-[0.0075em]"
                style={{ fontFamily: 'Figtree, sans-serif' }}
            >
                {textHeading}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-prose">
                {textDescription}
            </p>
            <Button className="w-fit border-black" variant={"outline"}>Find out more <ArrowUpRightIcon /></Button>
        </motion.div>
    )

    const media = (
        <motion.div
            initial={{ opacity: 0, x: layout === "ltr" ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: layout === "ltr" ? -40 : 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex justify-center"
        >
            <img src={imageSrc} alt={textHeading} className="rounded-[16px] border border-black/10 w-full md:w-[640px] h-[240px] md:h-[320px] object-contain bg-white" />
        </motion.div>
    )

    return (
        <motion.section
            ref={sectionRef as any}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 items-center"
        >
            <div className={layout === "ltr" ? "md:order-2" : "md:order-1"}>{content}</div>
            <div className={layout === "ltr" ? "md:order-1" : "md:order-2"}>{media}</div>
        </motion.section>
    )
}
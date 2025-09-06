import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PlusIcon, MinusIcon } from "lucide-react"

type FaqItem = {
    q: string
    a: string
}

const faqItems: FaqItem[] = [
    {
        q: "What is MedRoyale?",
        a: "MedRoyale is a competitive 1v1 quiz platform designed around the UKMLA with handcrafted content and gameplay designed to make revision engaging.",
    },
    {
        q: "How do I signup for public testing?",
        a: "Use the Signup button in the top-right or the CTA in the hero section. We’ll notify you when your access is ready.",
    },
    {
        q: "Is MedRoyale free?",
        a: "We’ll offer a free tier during public testing with optional premium features coming later.",
    },
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <motion.section
            id="faq"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto w-full max-w-5xl"
        >
            <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="font-medium text-3xl md:text-4xl lg:text-5xl leading-[115%] tracking-[0.0075em] text-center mb-10 md:mb-14"
                style={{ fontFamily: "Figtree, sans-serif" }}
            >
                Frequently asked questions
            </motion.h2>

            <div className="divide-y">
                {faqItems.map((item, i) => {
                    const isOpen = openIndex === i
                    return (
                        <motion.div key={i} layout className="py-5">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                className="w-full flex items-center justify-between text-left"
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${i}`}
                            >
                                <span className="text-xl md:text-2xl font-medium">{item.q}</span>
                                {isOpen ? <MinusIcon className="size-6" /> : <PlusIcon className="size-6" />}
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        id={`faq-panel-${i}`}
                                        key="content"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="pt-3 text-muted-foreground text-base md:text-lg"
                                    >
                                        {item.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </motion.section>
    )
}
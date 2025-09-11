import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { sendSignUpTesting } from "@/modules/email/email";

export default function CTA() {
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState<null | "success" | "error">(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const isValidEmail = (val: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(val)
    const getFriendlyError = (err: unknown): string => {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status
            const apiMessage = (err.response?.data as any)?.message as string | undefined
            if (status === 400) return apiMessage || "That email looks invalid. Please check and try again."
            if (status === 409) return apiMessage || "This email is already registered for testing."
            if (status === 429) return apiMessage || "Too many attempts. Please wait a moment and try again."
            if (status && status >= 500) return "Our server is having a moment. Please try again shortly."
            if (err.code === 'ERR_NETWORK') return "Network issue detected. Check your connection and try again."
            return apiMessage || "Could not submit right now. Please try again."
        }
        return "Unexpected error occurred. Please try again."
    }

    const handleSubmit = async () => {
        setSubmitted(null)
        setErrorMsg(null)
        if (!isValidEmail(email)) {
            setSubmitted("error")
            setErrorMsg("Please enter a valid email address.")
            return
        }
        try {
            setSubmitting(true)
            await sendSignUpTesting({ email, message: "CTA signup" })
            setSubmitted("success")
            setEmail("")
        } catch (e) {
            setSubmitted("error")
            setErrorMsg(getFriendlyError(e))
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <section className="w-full bg-black px-6 md:px-9 lg:px-[96px] py-16 md:py-14 overflow-hidden">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="py-9">
                    <h2
                        className="text-white font-semibold text-5xl md:text-3xl lg:text-[42px] leading-[115%] tracking-[0.0025em] text-left md:text-left"
                        style={{ fontFamily: "Figtree, sans-serif" }}
                    >
                        Our goal is to <u>build a community</u>.
                        <br />To <u>ignite competition</u>.
                        <br />To make <u>medical revision fun</u>.

                    </h2>
                </div>
                <div className="py-9">
                    <div className="flex flex-col gap-4 items-center w-full text-center">
                        <p
                            className="text-white/90 text-[20px] leading-[28px] tracking-[0.0025em] w-full"
                            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                            The journey starts here - and it starts with you.
                        </p>
                        <div className="flex flex-col sm:flex-row w-full gap-3">
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                                disabled={submitting}
                                className="w-full text-[16px] rounded-2xl border border-white/70 bg-white/95 text-black placeholder-black/60 px-5 py-4 outline-none focus:ring-[3px] focus:ring-white/30 h-full"
                            />
                            <Button onClick={handleSubmit} disabled={submitting} className="w-full sm:w-fit rounded-2xl bg-[#2F3DCB] text-white hover:bg-black/90 disabled:opacity-60 disabled:cursor-not-allowed !h-auto py-4 px-6">
                                Sign up
                            </Button>
                        </div>
                        <div aria-live="polite" className="min-h-[1.25rem]">
                            {submitted === "success" && (
                                <p className="text-green-400 text-sm">Thanks! We\'ll be in touch soon.</p>
                            )}
                            {submitted === "error" && errorMsg && (
                                <p className="text-red-400 text-sm">{errorMsg}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// function PhonesStatic() {
//     return (
//         <div className="relative h-full w-full flex items-end justify-center">
//             <motion.img
//                 src={screen2}
//                 alt="phone-left"
//                 initial={{ opacity: 0, y: 60, scale: 0.85 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 viewport={{ once: true, amount: 0.4 }}
//                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
//                 whileHover={{
//                     rotateX: 10,
//                     rotateY: -10,
//                     scale: 1.05,
//                     y: -10,
//                     transition: { type: "spring", stiffness: 300, damping: 20 }
//                 }}
//                 className="absolute bottom-0 -left-6 rotate-[-6deg] z-10 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px]"
//                 draggable={false}
//             />
//             <motion.img
//                 src={screen1}
//                 alt="phone-center"
//                 initial={{ opacity: 0, y: 60, scale: 0.85 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 viewport={{ once: true, amount: 0.4 }}
//                 transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
//                 whileHover={{
//                     rotateX: 5,
//                     rotateY: 5,
//                     scale: 1.08,
//                     y: -15,
//                     transition: { type: "spring", stiffness: 300, damping: 20 }
//                 }}
//                 className="absolute bottom-0 z-20 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[180px] sm:w-[210px] md:w-[240px] lg:w-[280px]"
//                 draggable={false}
//             />
//             <motion.img
//                 src={screen3}
//                 alt="phone-right"
//                 initial={{ opacity: 0, y: 60, scale: 0.85 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 viewport={{ once: true, amount: 0.4 }}
//                 transition={{ duration: 0.7, ease: "easeOut", delay: 0.19 }}
//                 whileHover={{
//                     rotateX: 10,
//                     rotateY: 10,
//                     scale: 1.05,
//                     y: -10,
//                     transition: { type: "spring", stiffness: 300, damping: 20 }
//                 }}
//                 className="absolute bottom-0 -right-6 rotate-[6deg] z-10 rounded-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] select-none pointer-events-none w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px]"
//                 draggable={false}
//             />
//         </div>
//     )
// }

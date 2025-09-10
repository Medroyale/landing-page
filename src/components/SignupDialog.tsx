import { ArrowUpRightIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { sendSignUpTesting } from "@/modules/email/email";

interface SignupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function SignupDialog({ open, onClose }: SignupDialogProps) {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverMessage, setServerMessage] = useState<string>("")

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    if (!open) return null

    const dialogContent = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/40"
                        style={{ zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 grid place-items-center px-4"
                        style={{ zIndex: 10000 }}
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg text-gray-900">
                            <button
                                aria-label="Close"
                                onClick={onClose}
                                className="absolute right-3 top-3 size-8 grid place-items-center rounded-md hover:bg-black/5 text-gray-600"
                            >
                                <X className="size-5" />
                            </button>
                            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
                                <span>◎ PUBLIC BETA</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-center mb-2 text-gray-900">Join the MedRoyale Public Testing</h3>
                            <p className="text-center text-sm text-gray-600 mb-5">Be the first to try new features and help us improve for UKMLA students worldwide.</p>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (isSubmitting) return
                                    setIsSubmitting(true)
                                    setServerMessage("")
                                    try {
                                        const res = await sendSignUpTesting({ email, message: "Public testing sign-up" })
                                        // API returns 201 for new and 200 for duplicate, both are considered success
                                        const msg: string = res?.message || "Successfully registered for public testing"
                                        setServerMessage(msg)
                                    } catch (err) {
                                        setServerMessage("Something went wrong. Please try again.")
                                    } finally {
                                        setIsSubmitting(false)
                                    }
                                }}
                                className="flex flex-col gap-3"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 outline-none focus:ring-[3px] focus:ring-[#2F52DF]/30 focus:border-[#2F52DF]"
                                />
                                {serverMessage && (
                                    <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                                        {serverMessage}
                                    </div>
                                )}
                                <Button type="submit" disabled={isSubmitting} className="w-full bg-[#2F52DF] text-white hover:bg-[#2F52DF]/90 disabled:opacity-60 disabled:cursor-not-allowed">
                                    {isSubmitting ? "Submitting..." : (serverMessage ? "Submitted" : "Join the beta")} <ArrowUpRightIcon className="ml-2" />
                                </Button>
                                <p className="text-xs text-gray-500 text-center">We’ll only use your email for the public testing invitation.</p>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return createPortal(dialogContent, document.body)
}

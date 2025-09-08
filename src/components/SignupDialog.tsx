import { ArrowUpRightIcon, X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

interface SignupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function SignupDialog({ open, onClose }: SignupDialogProps) {
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
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onClose();
                                }}
                                className="flex flex-col gap-3"
                            >
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="Email address" 
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 outline-none focus:ring-[3px] focus:ring-[#2F52DF]/30 focus:border-[#2F52DF]" 
                                />
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

    return createPortal(dialogContent, document.body)
}

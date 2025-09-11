import { motion } from "motion/react";
import { useState } from "react";
import SignupDialog from "./SignupDialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
    const [open, setOpen] = useState(false)
    return (
        <footer className="bg-black text-white py-12 lg:py-[72px] px-6 md:px-9 lg:px-[96px]">
            <div className="w-full max-w-4xl mx-auto mb-10">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Input
                        type="email"
                        placeholder="Email address"
                        className="w-full text-[16px] rounded-2xl border border-white/50 bg-white/95 text-black placeholder-black/60 px-5 py-3 outline-none focus:ring-[3px] focus:ring-white/30"
                    />
                    <Button onClick={() => setOpen(true)} className="w-full sm:w-fit rounded-2xl bg-[#2F3DCB] text-white hover:bg-white hover:text-black !h-auto py-3 px-6">
                        Sign up
                    </Button>
                </div>
            </div>
            <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <motion.img
                            src="/logo.ico"
                            alt="MedRoyale Logo"
                            className="h-10 w-10 rounded cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            whileTap={{
                                scale: 0.95,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                        />
                        <span className="text-2xl font-semibold">MedRoyale</span>
                    </div>
                    <ul className="space-y-3 text-white/80">
                        <li><a className="hover:text-white" href="#">Acknowledgments</a></li>
                        <li><a className="hover:text-white" href="#">Terms & Conditions</a></li>
                        <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
                        <li><a className="hover:text-white" href="#">Disclaimer</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.02em] text-white/70">Products</h3>
                    <ul className="space-y-3 text-white/90">
                        <li><a className="hover:text-white" href="#">Question Banks</a></li>
                        <li><a className="hover:text-white" href="#">Textbook Editor</a></li>
                        <li><a className="hover:text-white" href="#">Clinical & MLA Question Bank</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.02em] text-white/70">Resources</h3>
                    <ul className="space-y-3 text-white/90">
                        <li><a className="hover:text-white" href="#">Download for iOS</a></li>
                        <li><a className="hover:text-white" href="#">Download for Android</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.02em] text-white/70">Community</h3>
                    <ul className="space-y-3 text-white/90">
                        <li><a className="hover:text-white" href="#">Download for iOS</a></li>
                        <li><a className="hover:text-white" href="#">Download for Android</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#252525] flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between text-center md:text-left">
                <p className="text-white/70 text-sm">© 2025 MedRoyale Ltd. All rights reserved.</p>
                <p className="text-white/70 text-sm">
                    Reach us at: <a className="underline hover:text-white" href="mailto:info@medroyale.co.uk">info@medroyale.co.uk</a>
                </p>
            </div>
            <SignupDialog open={open} onClose={() => setOpen(false)} />
        </footer>
    )
}
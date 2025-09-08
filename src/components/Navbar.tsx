import * as React from "react"
import { Menu, X } from "lucide-react"
import { motion } from "motion/react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button";
import SignupDialog from "./SignupDialog";

type NavbarProps = {
    variant?: "default" | "black"
}

export default function Navbar({ variant = "default" }: NavbarProps) {
    const [pastHero, setPastHero] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [signupDialogOpen, setSignupDialogOpen] = React.useState(false)
    const hamburgerRef = React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
        if (variant === "black") return
        const hero = document.getElementById("hero")
        if (!hero) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                setPastHero(!entry.isIntersecting)
            },
            { root: null, threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        )
        observer.observe(hero)
        return () => observer.disconnect()
    }, [variant])

    React.useEffect(() => {
        if (!mobileMenuOpen) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element
            if (hamburgerRef.current && hamburgerRef.current.contains(target)) {
                return
            }
            if (!target.closest('.mobile-menu-container')) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [mobileMenuOpen])

    const scrollToId = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setMobileMenuOpen(false)
    }

    const navbarColorClass = variant === "black"
        ? "bg-black text-white"
        : pastHero
            ? "bg-white text-black"
            : "bg-[#2F52DF]/95 text-white supports-[backdrop-filter]:bg-[#2F52DF]/80 backdrop-blur"

    return (
        <div className={`mobile-menu-container fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-6 lg:px-9 transition-colors duration-300 ${navbarColorClass}`}>
            <div className="flex items-center space-x-2">
                <motion.img 
                    src="/logo.ico" 
                    alt="MedRoyale Logo" 
                    draggable="false" 
                    className="h-10 w-10 md:h-14 md:w-14 rounded-lg cursor-pointer" 
                    onClick={() => scrollToId('#hero')}
                    whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ 
                        scale: 0.95,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    animate={{
                        y: [0, -2, 0],
                        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </div>
            <div className="hidden md:flex items-center space-x-2">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger onClick={() => scrollToId('#features')} className="bg-transparent text-inherit">Features</NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger onClick={() => scrollToId('#faq')} className="bg-transparent text-inherit">FAQ</NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger onClick={() => scrollToId('#footer')} className="bg-transparent text-inherit">Contact</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Button onClick={() => setSignupDialogOpen(true)} className={`rounded-lg ${variant === "black" ? "bg-white text-black" : pastHero ? "bg-[#2F52DF] text-white" : "bg-[#252525]/50 text-white"}`}>Signup for Public Testing</Button>
            </div>

            <button
                ref={hamburgerRef}
                onClick={(e) => {
                    e.stopPropagation()
                    setMobileMenuOpen(!mobileMenuOpen)
                }}
                className="md:hidden p-2 rounded-md hover:bg-black/10 transition-colors"
                aria-label="Toggle mobile menu"
            >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 py-4 space-y-4">
                    <button
                        onClick={() => scrollToId('#features')}
                        className="block w-full text-left py-2 text-gray-700 hover:text-[#2F52DF] transition-colors"
                    >
                        Features
                    </button>
                    <button
                        onClick={() => scrollToId('#faq')}
                        className="block w-full text-left py-2 text-gray-700 hover:text-[#2F52DF] transition-colors"
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => scrollToId('#footer')}
                        className="block w-full text-left py-2 text-gray-700 hover:text-[#2F52DF] transition-colors"
                    >
                        Contact
                    </button>
                    <div className="pt-2 border-t border-gray-200">
                        <Button onClick={() => setSignupDialogOpen(true)} className={`w-full rounded-lg ${variant === "black" ? "bg-white text-black" : "bg-[#2F52DF] text-white"}`}>
                            Signup for Public Testing
                        </Button>
                    </div>
                </div>
            </div>
            <SignupDialog open={signupDialogOpen} onClose={() => setSignupDialogOpen(false)} />
        </div>
    )
}
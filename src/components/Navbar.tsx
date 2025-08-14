import * as React from "react"
import { Link } from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button";

const navItems: { title: string; href: string; description: string }[] = [
    {
        title: "Home",
        href: "/",
        description:
            "The home page of the website.",
    },
    {
        title: "About",
        href: "/about",
        description:
            "About the website.",
    },
    {
        title: "Contact",
        href: "/contact",
        description:
            "Contact the website.",
    },
    {
        title: "Privacy Policy",
        href: "/privacy-policy",
        description: "The privacy policy of the website.",
    },
    {
        title: "Terms of Service",
        href: "/terms-of-service",
        description:
            "The terms of service of the website.",
    },
    {
        title: "Blog",
        href: "/blog",
        description:
            "The blog of the website.",
    },
]

export default function Navbar() {
    const [pastHero, setPastHero] = React.useState(false)

    React.useEffect(() => {
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
    }, [])

    const scrollToId = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-6 lg:px-9 transition-colors duration-300 ${pastHero ? "bg-white text-black" : "bg-[#2F52DF]/95 text-white supports-[backdrop-filter]:bg-[#2F52DF]/80 backdrop-blur"}`}>
            <div className="flex items-center space-x-2">
                <img src="/logo.ico" alt="MedRoyale Logo" draggable="false" className="h-14 w-14 rounded-lg cursor-pointer" onClick={() => scrollToId('#hero')} />
            </div>
            <div className="flex items-center space-x-2">
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
                <Button className={`rounded-lg ${pastHero ? "bg-[#2F52DF] text-white" : "bg-[#252525]/50 text-white"}`}>Signup for Public Testing</Button>
            </div>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link to={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
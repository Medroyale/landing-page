import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { createPortal } from "react-dom"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { X, Search, Briefcase, MapPin, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import type { Job } from "./model/career.interface"

const jobModules = import.meta.glob("./jobs/*.md", { eager: true, import: "default", query: "?raw" }) as Record<string, string>
const APPLICATION_EMAIL = "ikhsansdqq@gmail.com"

type ParsedJob = Job & { body: string }

function parseFrontmatter(raw: string): ParsedJob {
    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/m.exec(raw) || []
    const yaml = match[1] || ""
    const body = match[2] || raw
    const meta: any = {}
    yaml.split(/\n/).forEach((line) => {
        const idx = line.indexOf(":")
        if (idx === -1) return
        const key = line.slice(0, idx).trim()
        const value = line.slice(idx + 1).trim()
        meta[key] = value
    })
    return {
        id: meta.id,
        title: meta.title,
        division: meta.division,
        location: meta.location,
        jobType: meta.jobType,
        employment: meta.employment,
        descriptionMd: body.trim(),
        body: body.trim(),
    }
}

const JOBS: ParsedJob[] = Object.values(jobModules).map(parseFrontmatter)

export default function Careers() {
    const [query, setQuery] = useState("")
    const [division, setDivision] = useState("All")
    const [location, setLocation] = useState("All")
    const [employment, setEmployment] = useState("All")
    const [jobType, setJobType] = useState("All")

    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [page, setPage] = useState(1)
    const pageSize = 12

    const filtered = useMemo(() => {
        return JOBS.filter(j => (
            (division === "All" || j.division === division) &&
            (location === "All" || j.location === location) &&
            (employment === "All" || j.employment === employment) &&
            (jobType === "All" || j.jobType === jobType) &&
            (query.trim() === "" || `${j.title} ${j.division} ${j.location}`.toLowerCase().includes(query.toLowerCase()))
        ))
    }, [query, division, location, employment, jobType])

    // Reset to page 1 when filters/search change
    useEffect(() => { setPage(1) }, [query, division, location, employment, jobType])

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const paged = useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page])

    const divisions = useMemo(() => ["All", ...Array.from(new Set(JOBS.map(j => j.division)))], [])
    const locations = useMemo(() => ["All", ...Array.from(new Set(JOBS.map(j => j.location)))], [])
    const employments = ["All", "Permanent", "Contract", "Internship"] as const
    const jobTypes = ["All", "remote", "hybrid", "on-site"] as const

    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar variant="black" />
            <main className="flex-1 pt-24 pb-8 px-6 md:px-9 lg:px-[96px]">
                <section className="max-w-6xl mx-auto">
                    <header className="bg-black text-white rounded-xl overflow-hidden">
                        <div className="relative h-56 md:h-72 w-full bg-[url('/screen-1.png')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 p-6 md:p-9">
                                <h1 className="text-3xl md:text-5xl font-semibold">Work with us</h1>
                                <p className="mt-3 max-w-3xl text-white/80">MedRoyale is constantly adding and updating our resource. We are always interested in hearing from talented authors who have an interest in medical education.</p>
                            </div>
                        </div>
                    </header>

                    <article className="prose prose-neutral max-w-none mt-10">
                        <div className="flex gap-2 items-center">
                            <h3 className="text-lg font-semibold">Open positions</h3>
                            <Badge variant={"secondary"}>
                                ({filtered.length})
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-3 mt-3">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder="Search job roles..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                            </div>
                            <div className="flex flex-wrap gap-3 items-center">
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <span>Department</span>
                                    <Select value={division} onValueChange={(v: string) => setDivision(v)}>
                                        <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                        <SelectContent>
                                            {divisions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <span>Location</span>
                                    <Select value={location} onValueChange={(v: string) => setLocation(v)}>
                                        <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                        <SelectContent>
                                            {locations.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <span>Employment</span>
                                    <Select value={employment} onValueChange={(v: string) => setEmployment(v as any)}>
                                        <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                        <SelectContent>
                                            {(employments as unknown as string[]).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </label>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <span>Type</span>
                                    <Select value={jobType} onValueChange={(v: string) => setJobType(v as any)}>
                                        <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                        <SelectContent>
                                            {(jobTypes as unknown as string[]).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </label>
                                <button
                                    onClick={() => { setQuery(""); setDivision("All"); setLocation("All"); setEmployment("All"); setJobType("All") }}
                                    className="ml-auto text-sm text-gray-600 hover:text-gray-900"
                                >Reset Filters</button>
                            </div>

                            {paged.length === 0 ? (
                                <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-gray-600 text-sm">No open position right now</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {paged.map((job) => (
                                        <JobRow key={job.id} job={job} onOpen={() => setSelectedJob(job)} />
                                    ))}
                                </div>
                            )}

                            {filtered.length > pageSize && (
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onChange={setPage}
                                />
                            )}
                        </div>
                    </article>
                </section>
            </main>
            <section id="footer">
                <Footer />
            </section>

            <JobDialog job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    )
}

// (virtualized list removed; using grid with pagination)

function Pagination({ page, totalPages, onChange }: { page: number, totalPages: number, onChange: (p: number) => void }) {
    const canPrev = page > 1
    const canNext = page < totalPages
    return (
        <div className="flex items-center justify-center gap-2 mt-3">
            <button
                onClick={() => canPrev && onChange(page - 1)}
                className={`px-3 py-1.5 rounded-md text-sm border ${canPrev ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                disabled={!canPrev}
            >Prev</button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <button
                onClick={() => canNext && onChange(page + 1)}
                className={`px-3 py-1.5 rounded-md text-sm border ${canNext ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                disabled={!canNext}
            >Next</button>
        </div>
    )
}

function JobRow({ job, onOpen }: { job: Job, onOpen: () => void }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow min-h-[180px] flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className="bg-gray-100 text-gray-800">
                    <MapPin className="size-3 mr-1" /> {job.location}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800">
                    <Briefcase className="size-3 mr-1" /> {job.jobType}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800">
                    <Building2 className="size-3 mr-1" /> {job.division}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800">{job.employment}</Badge>
            </div>
            <div className="mt-auto pt-3 flex justify-end">
                <Button onClick={onOpen} className="rounded-full bg-[#2F52DF] text-white">Apply Now</Button>
            </div>
        </div>
    )
}

function renderMarkdown(md: string) {
    let html = md
    // headings
    html = html.replace(/^###\s(.+)$/gm, '<h3>$1<\/h3>')
    html = html.replace(/^##\s(.+)$/gm, '<h2>$1<\/h2>')
    html = html.replace(/^#\s(.+)$/gm, '<h1>$1<\/h1>')
    // bold/italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1<\/strong>')
    html = html.replace(/\*(.+?)\*/g, '<em>$1<\/em>')
    // lists
    html = html.replace(/^\-\s(.+)$/gm, '<li>$1<\/li>')
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}<\/ul>`)
    // links
    html = html.replace(/\[(.+?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1<\/a>')
    // line breaks
    html = html.replace(/\n/g, '<br/>')
    return { __html: html }
}

function JobDialog({ job, onClose }: { job: Job | null, onClose: () => void }) {
    const [email, setEmail] = useState("")
    if (!job) return null

    const dialog = (
        <AnimatePresence>
            <motion.div className="fixed inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ zIndex: 9999 }} />
            <motion.div role="dialog" aria-modal className="fixed inset-0 grid place-items-center px-4" initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} style={{ zIndex: 10000 }}>
                <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg text-gray-900">
                    <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 size-8 grid place-items-center rounded-md hover:bg-black/5 text-gray-600">
                        <X className="size-5" />
                    </button>
                    <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-2xl font-semibold">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge className="bg-gray-100 text-gray-800"><MapPin className="size-3 mr-1" /> {job.location}</Badge>
                            <Badge className="bg-gray-100 text-gray-800"><Briefcase className="size-3 mr-1" /> {job.jobType}</Badge>
                            <Badge className="bg-gray-100 text-gray-800"><Building2 className="size-3 mr-1" /> {job.division}</Badge>
                            <Badge className="bg-gray-100 text-gray-800">{job.employment}</Badge>
                        </div>
                    </div>
                    <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={renderMarkdown(job.descriptionMd)} />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
                            const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
                            const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

                            if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
                                emailjs.init({ publicKey: PUBLIC_KEY })
                                emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                                    to_email: APPLICATION_EMAIL,
                                    applicant_email: email,
                                    job_title: job.title,
                                    division: job.division,
                                    location: job.location,
                                    job_type: job.jobType,
                                    employment: job.employment,
                                    subject: `Application form for ${job.title}`,
                                }).then(() => {
                                    onClose()
                                    alert("Thanks! We'll be in touch via email.")
                                }).catch(() => {
                                    const subject = encodeURIComponent(`Application form for ${job.title}`)
                                    const body = encodeURIComponent(
                                        `Role: ${job.title}\nDivision: ${job.division}\nLocation: ${job.location}\nType: ${job.jobType}\nEmployment: ${job.employment}\nApplicant email: ${email}\n\nPlease reach out to the applicant to proceed.`
                                    )
                                    window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${subject}&body=${body}`
                                    onClose()
                                })
                            } else {
                                const subject = encodeURIComponent(`Application form for ${job.title}`)
                                const body = encodeURIComponent(
                                    `Role: ${job.title}\nDivision: ${job.division}\nLocation: ${job.location}\nType: ${job.jobType}\nEmployment: ${job.employment}\nApplicant email: ${email}\n\nPlease reach out to the applicant to proceed.`
                                )
                                window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${subject}&body=${body}`
                                onClose()
                            }
                        }}
                        className="mt-6 flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="email"
                            placeholder="Your email to receive next steps"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 outline-none focus:ring-[3px] focus:ring-[#2F52DF]/30 focus:border-[#2F52DF]"
                        />
                        <Button type="submit" className="bg-[#2F52DF] text-white rounded-md">Apply Now</Button>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    )
    return createPortal(dialog, document.body)
}



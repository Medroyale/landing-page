export type JobType = "remote" | "hybrid" | "on-site"
export type EmploymentKind = "Permanent" | "Contract" | "Internship"

export interface Job {
    id: string
    title: string
    division: string
    location: string
    jobType: JobType
    employment: EmploymentKind
    descriptionMd: string
}

export interface JobRequest {
    title: string;
    division: string;
    location: string;
    jobType: JobType;
    employment: EmploymentKind;
    descriptionMd: string;
}
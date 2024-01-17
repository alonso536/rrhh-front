export interface Job {
    id: number;
    name: string;
    description: string;
    department: Department;
}

export interface Department {
    id: number;
    name: string;
}
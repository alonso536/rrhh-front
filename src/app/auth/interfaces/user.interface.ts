export interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
    google: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
}
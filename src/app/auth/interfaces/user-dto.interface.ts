export interface UserDTO {
    username: string;
    email: string;
    isAdmin: boolean;
    authorities: string[];
    iat: number;
    exp: number;
}
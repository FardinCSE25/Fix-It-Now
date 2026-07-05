import { Role } from "../../../generated/prisma/enums";

export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    role?: Role;
    experience?: string;
    bio?: string
}

export interface LoginPayload {
    email: string;
    password: string;
}
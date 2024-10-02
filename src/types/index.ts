export interface User extends CreatableUser {
    id: string;
    isVerified: boolean;
    createdAt: Date;
    lastLoginTime: Date;
    lastLoginLocation: string;
}

export interface CreatableUser {
    name: string;
    email: string;
}

export interface Payload {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        export interface Request {
            useragent: string;
        }
    }
}
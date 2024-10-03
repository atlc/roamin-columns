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

export interface Board {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
}

export interface Column {
    id: string;
    boardId: string;
    name: string;
    createdAt: Date;
}

export interface Card {
    id: string;
    columnId: string;
    title: string;
    description: string;
    position: number;
    createdAt: string;
    dueAt: Date
}


export interface Payload {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
            useragent: string;
        }
    }
}


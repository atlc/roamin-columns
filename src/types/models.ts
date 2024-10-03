export interface BaseUser {
    name: string;
    email: string;
}

export interface User extends BaseUser {
    id: string;
    isVerified: boolean;
    createdAt: Date;
    lastLoginTime: Date;
    lastLoginLocation: string;
}

export interface BaseBoard {
    name: string;
    userId: string;
}

export interface Board extends BaseBoard {
    id: string;
    createdAt: Date;
}

export interface BaseColumn {
    name: string;
    boardId: string;
}

export interface Column extends BaseColumn {
    id: string;
    createdAt: Date;
}

export interface BaseCard {
    columnId: string;
    title: string;
    description: string;
    dueAt?: Date
}

export interface Card extends BaseCard {
    id: string;
    position: number;
    createdAt: string;
}
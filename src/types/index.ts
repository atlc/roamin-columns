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

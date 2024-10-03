import { Query } from "../connection";
import { BaseUser, User } from "../../types";

const find = (email: User['email'], userAgentString: string) => {
    const lastLoginTime = new Date().toISOString();
    Query('UPDATE users SET lastLoginTime=$1, lastLoginLocation=$2 WHERE email=$3', [lastLoginTime, userAgentString, email])
    return Query<User[]>('SELECT * FROM users WHERE email=$1', [email])
}

const register = ({ name, email }: BaseUser, userAgentString: string) => {
    const createdAt = new Date().toISOString();
    return Query('INSERT INTO users (name, email, createdAt, lastLoginTime, lastLoginLocation) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, email, createdAt, createdAt, userAgentString])
}

const verify = (id: User['id'], userAgentString: string) => {
    const lastLoginTime = new Date().toISOString();
    return Query('UPDATE users SET isVerified=true, lastLoginTime=$1, lastLoginLocation=$2 WHERE id=$3', [lastLoginTime, userAgentString, id])
}

export default {
    find,
    register,
    verify
}
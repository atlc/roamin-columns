import { Query } from "../connection";
import { CreatableUser, User } from "../../types";

const find = (email: User['email']) => Query<User[]>('SELECT * FROM users WHERE email=$1', [email])

const login = (id: User['id'], userAgentString: string) => {
    const lastLoginTime = new Date().toISOString();
    return Query('UPDATE users SET lastLoginTime=$1, lastLoginLocation=$2 WHERE id=$3', [lastLoginTime, userAgentString, id])
}

const register = ({ name, email }: CreatableUser, userAgentString: string) => {
    const createdAt = new Date().toISOString();
    return Query('INSERT INTO users (name, email, createdAt, lastLoginTime, lastLoginLocation) VALUES ($1, $2, $3, $4, $5)', [name, email, createdAt, createdAt, userAgentString])
}

const verify = (id: User['id'], userAgentString: string) => {
    const lastLoginTime = new Date().toISOString();
    return Query('UPDATE users SET isVerified=true, lastLoginTime=$1, lastLoginLocation=$2 WHERE id=$3', [lastLoginTime, userAgentString, id])
}

export default {
    find,
    login,
    register,
    verify
}
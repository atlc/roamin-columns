import { Query } from "../connection";

export const users = {
    create: () =>
        Query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                email VARCHAR(128) NOT NULL UNIQUE,
                isVerified BOOLEAN DEFAULT FALSE,
                createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                lastLoginTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                lastLoginLocation VARCHAR(256)
            );
        `),
    drop: () => Query(`DROP TABLE IF EXISTS users`),
    seed: () =>
        Query(`
            INSERT INTO users (name, email, isVerified, lastLoginLocation)
            VALUES
                ('Alice Johnson', 'alice@example.com', TRUE, 'New York'),
                ('Bob Smith', 'bob@example.com', FALSE, 'Los Angeles'),
                ('Charlie Brown', 'charlie@example.com', TRUE, 'Chicago');
        `)
}

export const boards = {
    create: () =>
        Query(`
            CREATE TABLE IF NOT EXISTS boards (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                userId UUID,
                name VARCHAR(64) NOT NULL,
                createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(userId) REFERENCES users(id)
            );
    `),
    drop: () => Query(`DROP TABLE IF EXISTS boards`),
    seed: () =>
        Query(`
            INSERT INTO boards (userId, name)
            VALUES
                ((SELECT id FROM users WHERE email = 'alice@example.com'), 'Alices Board'),
                ((SELECT id FROM users WHERE email = 'bob@example.com'), 'Bobs Board'),
                ((SELECT id FROM users WHERE email = 'charlie@example.com'), 'Charlies Board');
        `)
}

export const columns = {
    create: () =>
        Query(`
            CREATE TABLE IF NOT EXISTS columns (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                boardId UUID,
                name VARCHAR(64) NOT NULL,
                createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(boardId) REFERENCES boards(id)
            );
        `),
    drop: () => Query(`DROP TABLE IF EXISTS columns`),
    seed: () =>
        Query(`
            INSERT INTO columns (boardId, name)
            VALUES
                ((SELECT id FROM boards WHERE name = 'Alices Board'), 'To Do'),
                ((SELECT id FROM boards WHERE name = 'Alices Board'), 'In Progress'),
                ((SELECT id FROM boards WHERE name = 'Bobs Board'), 'Backlog'),
                ((SELECT id FROM boards WHERE name = 'Charlies Board'), 'Completed');
        `)
}

export const cards = {
    create: () =>
        Query(`
            CREATE TABLE IF NOT EXISTS cards (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                columnId UUID,
                title VARCHAR(64) NOT NULL,
                description VARCHAR(1024),
                position SERIAL,
                createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                dueAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(columnId) REFERENCES columns(id)
            );
        `),
    drop: () => Query(`DROP TABLE IF EXISTS cards`),
    seed: () =>
        Query(`
            INSERT INTO cards (columnId, title, description, position, dueAt)
            VALUES
                ((SELECT id FROM columns WHERE name = 'To Do'), 'Task 1', 'Description for Task 1', 1, '2024-10-10'),
                ((SELECT id FROM columns WHERE name = 'In Progress'), 'Task 2', 'Description for Task 2', 2, '2024-10-11'),
                ((SELECT id FROM columns WHERE name = 'Backlog'), 'Task 3', 'Description for Task 3', 1, '2024-10-12'),
                ((SELECT id FROM columns WHERE name = 'Completed'), 'Task 4', 'Description for Task 4', 1, '2024-10-13');
        `)
}

export const begin = () => Query("BEGIN")
export const commit = () => Query("COMMIT")
export const rollback = () => Query("ROLLBACK")
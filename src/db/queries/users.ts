import { Query } from "../connection";
import { BaseUser, Board, Card, Column, User, UserProfileJoinResults } from "../../types";

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

const profile = async (userId: string) => {
    const flattenedRelationalUserBoards = await Query<UserProfileJoinResults[]>(`
        SELECT 
            b.id as boardId, b.name as boardName,
            cl.id as columnId, cl.name as columnName,
            ca.id as cardId, ca.title as cardTitle, ca.description as cardDescription,
            ca.position as cardPosition, ca.dueAt as cardDueAt, ca.createdAt as cardCreatedAt
        FROM users u
        JOIN boards b ON b.userId=u.id
        LEFT JOIN columns cl ON cl.boardId=b.id
        LEFT JOIN cards ca ON ca.columnId=cl.id
        WHERE u.id=$1`,
        [userId]);

    type ExpandedColumnEntry = Partial<Column> & { cards: Partial<Card>[] }
    type ExpandedBoardEntry = Partial<Board> & { columns: ExpandedColumnEntry[] }

    const userBoardsExpanded: { [boardIdKey: string]: ExpandedBoardEntry } = {};

    flattenedRelationalUserBoards.forEach(row => {
        const board = userBoardsExpanded[row.boardId];

        if (!board) {
            userBoardsExpanded[row.boardId] = {
                id: row.boardId,
                name: row.boardName,
                columns: []
            }
        }

        const column = userBoardsExpanded[row.boardId].columns.find(col => col.id === row.columnId)

        if (!column) {
            userBoardsExpanded[row.boardId].columns.push({
                id: row.columnId,
                name: row.columnName,
                cards: []
            })
        }

        const card = userBoardsExpanded[row.boardId].columns.find(col => col.cards.find(card => card.id === row.cardId))

        if (!card) {
            const { cardId, cardTitle, cardDescription, cardDueAt, cardCreatedAt, cardPosition } = row;

            userBoardsExpanded[row.boardId].columns.find(col => col.id === row.columnId)?.cards.push({
                id: cardId,
                title: cardTitle,
                description: cardDescription,
                dueAt: cardDueAt,
                createdAt: cardCreatedAt,
                position: cardPosition
            })
        }
    });

    const boards = Object.keys(userBoardsExpanded).map(boardId => userBoardsExpanded[boardId]);
    return boards;
}

export default {
    find,
    profile,
    register,
    verify,
}
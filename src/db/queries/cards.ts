import { Query } from "../connection";
import { BaseCard, Card } from "../../types";

const COLUMN_ID_CLAUSE = `columnId IN (SELECT id FROM columns WHERE boardId IN (SELECT id FROM boards WHERE userId=$3))`

const create = ({ title, description, columnId, dueAt }: BaseCard, userId: string) => {
    if (!dueAt) {
        dueAt = new Date();
        dueAt.setDate(dueAt.getDate() + 14)
    }

    return Query(`
        INSERT INTO cards (columnId, title, description, dueAt) 
            VALUES ((SELECT id FROM columns WHERE id=$1 AND boardId IN (SELECT id FROM boards WHERE userId=$5), $2, $3, $4)
            RETURNING id`,
        [columnId, title, description, dueAt, userId]
    );
}

const move = ({ id, columnId }: Partial<Card>, userId: string) => Query(`UPDATE cards SET columnId=$2 WHERE id=$1 AND ${COLUMN_ID_CLAUSE}`, [id, columnId, userId]);

const redate = ({ dueAt, id }: Partial<Card>, userId: string) => Query(`UPDATE cards SET dueAt=$1 WHERE id=$2 AND ${COLUMN_ID_CLAUSE}`, [dueAt, id, userId]);

const redescribe = ({ description, id }: Partial<Card>, userId: string) => Query(`UPDATE cards SET description=$1 WHERE id=$2 AND ${COLUMN_ID_CLAUSE}`, [description, id, userId]);

const retitle = ({ title, id }: Partial<Card>, userId: string) => Query(`UPDATE cards SET title=$1 WHERE id=$2 AND ${COLUMN_ID_CLAUSE}`, [title, id, userId]);

const destroy = ({ id }: Partial<Card>, userId: string) => Query('DELETE FROM cards WHERE id=$1 AND boardId IN (SELECT id FROM boards WHERE userId=$2)', [id, userId]);

export default {
    create,
    update: {
        description: redescribe,
        dueDate: redate,
        column: move,
        title: retitle
    },
    destroy
}
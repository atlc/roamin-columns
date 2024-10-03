import { Query } from "../connection";
import { BaseColumn, Column } from "../../types";

const create = ({ name, boardId }: BaseColumn, userId: string) => Query('INSERT INTO columns (name, boardId) VALUES ($1, (SELECT id FROM boards WHERE id=$2 AND userId=$3)) RETURNING id', [name, boardId, userId]);
const rename = ({ name, id }: Partial<Column>, userId: string) => Query('UPDATE columns SET name=$1 WHERE id=$2 AND boardId IN (SELECT id FROM boards WHERE userId=$3)', [name, id, userId]);
const destroy = ({ id }: Partial<Column>, userId: string) => Query('DELETE FROM columns WHERE id=$1 AND boardId IN (SELECT id FROM boards WHERE userId=$2)', [id, userId]);

export default {
    create,
    rename,
    destroy
}
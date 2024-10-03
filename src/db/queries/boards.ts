import { Query } from "../connection";
import { BaseBoard, Board } from "../../types";

const create = ({ name, userId }: BaseBoard) => Query('INSERT INTO boards (name, userId) VALUES ($1, $2) RETURNING id', [name, userId]);
const rename = ({ name, userId, id }: Partial<Board>) => Query('UPDATE boards SET name=$1 WHERE id=$2 AND userId=$3', [name, id, userId]);
const destroy = ({ id, userId }: Partial<Board>) => Query('DELETE FROM boards WHERE id=$1 AND userId=$2', [id, userId]);

export default {
    create,
    rename,
    destroy
}
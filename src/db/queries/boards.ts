import { Query } from "../connection";
import { BaseBoard, Board } from "../../types";

const create = ({ name, userId }: BaseBoard) => Query('INSERT INTO boards (name, userId) VALUES ($1, $2) RETURNING id', [name, userId]);
const rename = ({ name, userId }: BaseBoard) => Query('UPDATE boards SET name=$1 WHERE userId=$2', [name, userId]);
const destroy = ({ id, userId }: Partial<Board>) => Query('DELETE FROM boards WHERE id=$1 AND userId=$2', [id, userId]);

export default {
    create,
    rename,
    destroy
}
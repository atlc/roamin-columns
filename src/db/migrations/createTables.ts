import { users, boards, columns, cards } from "./utils";

export const create = async () =>
    users.create()
        .then(boards.create)
        .then(columns.create)
        .then(cards.create)
        .catch(console.log);

create();
import { users, boards, columns, cards } from "./utils";

export const drop = async () =>
    cards.drop()
        .then(columns.drop)
        .then(boards.drop)
        .then(users.drop)
        .catch(console.log);

drop();
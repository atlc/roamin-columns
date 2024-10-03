import { users, boards, columns, cards } from "./utils";

export const seed = async () =>
    users.seed()
        .then(boards.seed)
        .then(columns.seed)
        .then(cards.seed)
        .catch(console.log);

seed();
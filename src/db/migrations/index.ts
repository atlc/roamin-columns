import { create } from "./createTables";
import { drop } from "./drop";
import { seed } from "./seed";
import { begin, commit, rollback } from "./utils";

const fail = (error: Error) => {
    console.log(error);
    rollback();
}

begin().then(drop).then(create).then(seed).then(commit).catch(fail);
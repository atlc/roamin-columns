import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.pg);

type QueryResultsReturningID = pg.QueryResult & { id?: string };

export const Query = async <T = QueryResultsReturningID>(sql: string, vals?: unknown[]) => {
    const res = await pool.query(sql, vals);

    if (res.command === "SELECT") return res.rows as T;

    if (res.command === "INSERT") return { ...res, id: res?.rows[0]?.id } as T;

    return res as T;
};
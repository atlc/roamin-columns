import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.pg.url ? { connectionString: config.pg.url } : { ...config.pg, ssl: { rejectUnauthorized: false } });

type QueryResultsReturningID = pg.QueryResult & { id: string };

export const Query = async <T = QueryResultsReturningID>(sql: string, vals?: unknown[]) => {
    console.log({ sql, vals })
    const res = await pool.query(sql, vals);

    if (res.command === "SELECT") return res.rows as T;

    if (res.command === "INSERT") return { ...res, id: res?.rows[0]?.id } as T;

    return res as T;
};
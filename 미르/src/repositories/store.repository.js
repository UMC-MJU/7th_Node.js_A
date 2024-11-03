import { pool } from "../db.config.js";
export const addStore = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            "INSERT INTO store (region_id, name, address, score, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
            [data.region_id, data.name, data.address, data.score]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
export const checkRegionExists = async (region_id) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query("SELECT 1 FROM region WHERE id = ?", [region_id]);
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

import { pool } from "../db.config.js";
export const checkMissionAlreadyProgress = async (member_id, mission_id) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            "SELECT 1 FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = '진행중'",
            [member_id, mission_id]
        );
        return rows.length > 0;
    } finally {
        conn.release();
    }
};
export const addMissionProgress = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            "INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [data.member_id, data.mission_id, data.status]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
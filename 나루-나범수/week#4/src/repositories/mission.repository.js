import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 가게 있는지 검증
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE store_id = ?) as isExistStore;`,
      data.store_id
    );

    if (!confirm[0].isExistStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.store_id,
        data.reward,
        data.deadline,
        data.mission_spec,
        data.created_at,
        data.updated_at,
      ]
    );

    console.log("confirm", result.insertId);
    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

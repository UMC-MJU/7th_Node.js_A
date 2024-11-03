import { pool } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM review WHERE store_id = ?) as isExistEmail;`,
      data.store_Id
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO review (store_Id, member_Id, score, body, created_at) VALUES (?, ?, ?, ?, ?);`,
      [data.store_Id, data.member_Id, data.score, data.body, data.created_at]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

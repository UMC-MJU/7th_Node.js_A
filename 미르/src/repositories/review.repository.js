import { pool } from "../db.config.js";
export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT 1 FROM store WHERE id = ?", [storeId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};
export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO review (member_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW())",
      [data.member_id, data.store_id, data.body, data.score]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};
export const addReviewImages = async (reviewId, storeId, images) => {
  const conn = await pool.getConnection();
  try {
    const values = images.map((url) => [reviewId, storeId, url, new Date(), new Date()]);
    await conn.query("INSERT INTO review_image (review_id, store_id, image_url, created_at, updated_at) VALUES ?", [values]);
  } finally {
    conn.release();
  }
};

import { pool } from "../db.config.js";
export const addUser = async (data) => {
    const conn = await pool.getConnection();
  
    try {
      const [confirm] = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
        [data.email]
      );
  
      if (confirm[0].isExistEmail) {
        return null;
      }
  
      const [result] = await pool.query(
        `INSERT INTO member (email, name, gender, birth, address, spec_address, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          data.email,
          data.name,
          data.gender,
          data.birth,
          data.address,
          data.detailAddress,
          data.phoneNumber,
        ]
      );
  
      return result.insertId;
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };
  
  export const getUser = async (userId) => {
    const conn = await pool.getConnection();
  
    try {
      const [user] = await pool.query(`SELECT * FROM member WHERE id = ?;`, [
        userId,
      ]);
  
      if (user.length == 0) {
        return null;
      }
  
      return user[0];
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };
  

  export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection();
  
    try {
      await pool.query(
        `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
        [foodCategoryId, userId]
      );
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };

  export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();
  
    try {
      const [preferences] = await pool.query(
        `SELECT mp.id, mp.category_id, mp.member_id, fc.name 
         FROM member_prefer mp 
         JOIN food_category fc ON mp.category_id = fc.id 
         WHERE mp.member_id = ? 
         ORDER BY mp.category_id ASC;`,
        [userId]
      );
  
      return preferences;
    } catch (err) {
      throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
      conn.release();
    }
  };
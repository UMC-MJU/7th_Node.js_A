import { pool } from "../db.config.js";

export const addMemberMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 이미 진행중인 미션인지 검증
    // 토큰 검증 단계를 안 나갔기 떄문에 유저는 id=1로 가정
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM member_mission WHERE mission_id = ? and member_id = 1) as isExistMission`,
      data.mission_id
    );

    if (confirm[0].isExistMission) {
      return null;
    }

    const [confirmMission] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission`,
      [data.mission_id] // 여기도 배열 형태로 변경
    );

    if (!confirmMission[0].isExistMission) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?);`,
      [
        data.member_id,
        data.mission_id,
        data.status,
        data.created_at,
        data.updated_at,
      ]
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

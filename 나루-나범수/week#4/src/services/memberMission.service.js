import { addMemberMission } from "../repositories/memberMission.repository.js";

export const postMemberMission = async (data) => {
  const reviewPostId = await addMemberMission({
    member_id: data.member_id,
    mission_id: data.mission_id,
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at,
  });

  // 이미 진행중인 미션인지 검증
  if (reviewPostId === null) {
    throw new Error("이미 도전중인 미션입니다.");
  }

  return { message: "성공" };
};

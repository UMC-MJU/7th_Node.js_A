import { prisma } from "../db.config.js";

export const addMemberMission = async (data) => {
  try {
    // 이미 진행 중인 미션인지 검증
    const existingMission = await prisma.memberMission.findFirst({
      where: {
        mission_id: data.mission_id,
        member_id: 1, // 토큰 검증이 없는 상태로, 회원 ID를 1로 가정
      },
    });

    if (existingMission) {
      return null;
    }

    // 미션 존재 여부 확인
    const missionExists = await prisma.mission.findUnique({
      where: {
        id: data.mission_id,
      },
    });

    if (!missionExists) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    // 새로운 미션 추가
    const newMission = await prisma.memberMission.create({
      data: {
        member_id: data.member_id,
        mission_id: data.mission_id,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at,
      },
    });

    return newMission.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

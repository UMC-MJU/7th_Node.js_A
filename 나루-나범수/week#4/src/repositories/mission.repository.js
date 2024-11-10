import { prisma } from "../db.config.js";

export const addMission = async (data) => {
  try {
    // 가게가 존재하는지 검증
    const storeExists = await prisma.mission.findUnique({
      where: {
        store_id: data.store_id,
      },
    });

    if (!storeExists) {
      return null;
    }

    // 새로운 미션 생성
    const newMission = await prisma.mission.create({
      data: {
        store_id: data.store_id,
        reward: data.reward,
        deadline: data.deadline,
        mission_spec: data.mission_spec,
        created_at: data.created_at,
        updated_at: data.updated_at,
      },
    });

    console.log("confirm", newMission.id);
    return newMission.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getMyMission = async () => {
  const reviewIds = await prisma.member_mission.findMany({
    select: { mission_id: true },
    where: { member_id: 1, status: "진행중" }, // 토큰 유저 인증이 없어 1로 가정
    orderBy: { id: "asc" },
    take: 5,
  });

  const missionIds = reviewIds.map((item) => item.mission_id);

  const missions = await prisma.mission.findMany({
    select: { reward: true, deadline: true, mission_spec: true },
    where: { id: { in: missionIds } },
  });

  return missions;
};

export const getStoreMission = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: { reward: true, deadline: true, mission_spec: true },
    where: { store_id: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

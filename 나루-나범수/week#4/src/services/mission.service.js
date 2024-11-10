import {
  addMission,
  getMyMission,
  getStoreMission,
} from "../repositories/mission.repository.js";

export const postMission = async (data) => {
  const reviewPostId = await addMission({
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
    created_at: data.created_at,
    updated_at: data.updated_at,
  });

  // 가게 존재 검증
  if (reviewPostId === null) {
    throw new Error("가게가 존재하지 않습니다.");
  }

  return { message: "성공" };
};

export const listMyMission = async () => {
  const missions = await getMyMission();
  return missions;
};

export const listStoreMission = async (storeId, cursor) => {
  const missions = await getStoreMission(storeId, cursor);
  return missions;
};

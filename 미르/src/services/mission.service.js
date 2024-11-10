import { checkMissionAlreadyProgress, addMissionProgress, getOngoingMissions } from "../repositories/mission.repository.js";
export const addMissionProgressService = async (data) => {

    //도전 중인지 확인
    const isMissionOngoing = await checkMissionAlreadyProgress(data.member_id, data.mission_id);
    if (isMissionOngoing) {
        throw new Error("This mission is already in-progress for the member.");
    }
    //새로운 미션 진행중으로 추가
    const progressMissionId = await addMissionProgress(data);
    return { progressMissionId };
};
//성능문제


//진행 중인 미션 목록 반환
export const getOngoingMissionsService = async (memberId) => {
    return await getOngoingMissions(memberId);
  };
import { DuplicateMissionError } from "../errors.js";
import { checkMissionAlreadyProgress, addMissionProgress } from "../repositories/mission.repository.js";
export const addMissionProgressService = async (data) => {
    const isMissionOngoing = await checkMissionAlreadyProgress(data.member_id, data.mission_id);
    if (isMissionOngoing) {
        throw new DuplicateMissionError("이미 진행 중인 미션입니다.", { memberId: data.member_id, missionId: data.mission_id });
    }
    const progressMissionId = await addMissionProgress(data);
    return { progressMissionId };
};
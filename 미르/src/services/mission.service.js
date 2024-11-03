import { checkMissionAlreadyProgress, addMissionProgress } from "../repositories/mission.repository.js";
export const addMissionProgressService = async (data) => {
    const isMissionOngoing = await checkMissionAlreadyProgress(data.member_id, data.mission_id);
    if (isMissionOngoing) {
        throw new Error("This mission is already in-progress for the member.");
    }
    const progressMissionId = await addMissionProgress(data);
    return { progressMissionId };
};
import { StatusCodes } from "http-status-codes";
import { formatMissionData } from "../dtos/mission.dtos.js";
import { addMissionProgressService } from "../services/mission.service.js";
export const handleAddMissionProgress = async (req, res, next) => {
    try {
        const missionData = formatMissionData(req.body);
        const result = await addMissionProgressService(missionData);
        res.status(StatusCodes.CREATED).json({ message: "Mission added to in-progress list successfully", result });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};
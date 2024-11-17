import { StatusCodes } from "http-status-codes";
import { formatMissionData } from "../dtos/mission.dtos.js";
import { addMissionProgressService, getOngoingMissionsService } from "../services/mission.service.js";
export const handleAddMissionProgress = async (req, res, next) => {
    console.log("가게의 미션을 도전 중인 미션에 추가하기를 요청하였습니다!");
    console.log("body:", req.body); 
    try {
        const missionData = formatMissionData(req.body);
        const result = await addMissionProgressService(missionData);
        res.status(StatusCodes.CREATED).success({ message: "Mission added to in-progress list successfully", result });
    } catch (error) {
       next(error);   
    }
};

//진행 중인 미션 목록 조회
export const handleGetOngoingMissions = async (req, res, next) => {
    try {
      const memberId = parseInt(req.params.memberId, 10);
      const ongoingMissions = await getOngoingMissionsService(memberId);
      res.status(StatusCodes.OK).json({ ongoingMissions });
    } catch (error) {
      next(error);
    }
  };
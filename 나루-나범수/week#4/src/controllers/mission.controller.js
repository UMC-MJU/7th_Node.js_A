import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/misssion.dto.js";
import {
  listMyMission,
  listStoreMission,
  postMission,
} from "../services/mission.service.js";

export const handlePostMission = async (req, res, next) => {
  console.log("미션 생성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await postMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleListMyMission = async (req, res, next) => {
  const mission = await listMyMission();
  res.status(StatusCodes.OK).success(mission);
};

export const handleListStoreMissions = async (req, res, next) => {
  const missionList = await listStoreMission(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missionList);
};

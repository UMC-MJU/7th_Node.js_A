import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/misssion.dto.js";
import { postMission } from "../services/mission.service.js";

export const handlePostMission = async (req, res, next) => {
  console.log("미션 생성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await postMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

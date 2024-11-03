import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { postMemberMission } from "../services/memberMission.service.js";

export const handlePostMemberMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await postMemberMission(bodyToMemberMission(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

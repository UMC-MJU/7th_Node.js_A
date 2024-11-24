import { StatusCodes } from "http-status-codes";
import { formatMissionData } from "../dtos/mission.dtos.js";
import { addMissionProgressService, getOngoingMissionsService } from "../services/mission.service.js";
export const handleAddMissionProgress = async (req, res, next) => {
  /*
#swagger.summary = '가게의 미션을 도전 중인 미션에 추가 API';
#swagger.description = '특정 가게의 미션을 회원의 진행 중인 미션 목록에 추가합니다.';
#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          member_id: { type: "number", description: "회원 ID", example: 1 },
          mission_id: { type: "number", description: "미션 ID", example: 1 },
        }
      }
    }
  }
};
#swagger.responses[200] = {
  description: "미션 추가 성공 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "SUCCESS" },
          error: { type: "object", nullable: true, example: null },
          success: {
            type: "object",
            properties: {
              message: { type: "string", example: "Mission added to in-progress list successfully" },
              result: { type: "object", properties: { progressMissionId: { type: "number", example: 1 } } }
            }
          }
        }
      }
    }
  }
};
#swagger.responses[400] = {
  description: "이미 진행 중인 미션으로 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "M001" },
              reason: { type: "string", example: "이미 진행 중인 미션입니다." },
              data: {
                type: "object",
                properties: {
                  memberId: { type: "number", example: 1 },
                  missionId: { type: "number", example: 1 }
                }
              }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};
*/

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
  /*
  #swagger.summary = '진행 중인 미션 목록 조회 API';
  #swagger.responses[200] = {
    description: "진행 중인 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 1 },
                      status: { type: "string", example: "진행중" },
                      createdAt: { type: "string", format: "date-time", example: "2024-11-22T10:00:00Z" },
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          reward: { type: "number", example: 500 },
                          deadline: { type: "string", format: "date-time", example: "2024-12-01T23:59:59Z" },
                          missionSpec: { type: "string", example: "특별 미션 세부사항" },
                          store: {
                            type: "object",
                            properties: {
                              name: { type: "string", example: "ABC 상점" }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, example: null }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
*/

    try {
      const memberId = parseInt(req.params.memberId, 10);
      const ongoingMissions = await getOngoingMissionsService(memberId);
      res.status(StatusCodes.OK).json({ ongoingMissions });
    } catch (error) {
      next(error);
    }
  };
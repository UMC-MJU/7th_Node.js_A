import { StatusCodes } from "http-status-codes";
import { formatStoreData } from "../dtos/store.dtos.js";
import { addStoreService, getStoreMissionsService } from "../services/store.service.js";

//새로운 가게 정보 추가 요청 처리
export const handleAddStore = async (req, res, next) => {  
  /*
#swagger.summary = '특정 지역에 가게 추가하기 API';
#swagger.description = '지역 ID와 함께 가게 정보를 추가합니다.';
#swagger.parameters['regionId'] = {
  in: 'path',
  description: '지역 ID',
  required: true,
  schema: { type: 'integer', example: 1 }
};
#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: { type: "string", description: "가게 이름", example: "맛있는 식당" },
          address: { type: "string", description: "가게 주소", example: "서울특별시 강남구" },
          score: { type: "number", description: "가게 초기 평점", example: 4.5, nullable: true }
        }
      }
    }
  }
};
#swagger.responses[200] = {
  description: "가게가 추가 성공 응답",
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
              message: { type: "string", example: "Store added successfully" },
              result: { type: "object", properties: { storeId: { type: "number", example: 101 } } }
            }
          }
        }
      }
    }
  }
};
#swagger.responses[400] = {
  description: "가게 추가 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "R002" },
              reason: { type: "string", example: "해당 지역이 존재하지 않습니다." },
              data: { type: "object", nullable: true }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};
*/

    console.log("가게 추가하기를 요청하였습니다!");
    console.log("body:", req.body); 
    try {
        const storeData = formatStoreData({ ...req.body, region_id: req.params.regionId });
        const result = await addStoreService(storeData);
        res.status(StatusCodes.CREATED).success({ message: "Store added successfully", result });
    } catch (error) {
        next(error);
    }
};

// 특정 가게의 미션목록
export const handleGetStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '특정 가게의 미션 목록 조회 API';
  #swagger.responses[200] = {
    description: "특정 가게의 미션 목록 조회 성공 응답",
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
                    reward: { type: "number", example: 500 },
                    deadline: { type: "string", format: "date-time", example: "2024-12-01T23:59:59Z" },
                    missionSpec: { type: "string", example: "식사를 하시오" },
                    createdAt: { type: "string", format: "date-time", example: "2024-11-20T12:00:00Z" },
                    updatedAt: { type: "string", format: "date-time", example: "2024-11-21T15:00:00Z" }
                  }
                }
              },
              pagination: {
                type: "object",
                properties: {
                  cursor: { type: "number", nullable: true, example: 15 }
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
        const storeId = parseInt(req.params.storeId, 10);
        const missions = await getStoreMissionsService(storeId);
        res.status(StatusCodes.OK).json(missions);
    } catch (error) {
        next(error);
    }
};
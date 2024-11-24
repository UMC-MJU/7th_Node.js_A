import { StatusCodes } from "http-status-codes";
import { addReviewService,getUserReviewsService } from "../services/review.service.js";
import { formatReviewData } from "../dtos/review.dtos.js";
export const handleAddReview = async (req, res, next) => {
  /*
#swagger.summary = '가게 리뷰 추가 API';
#swagger.description = '사용자가 특정 가게에 리뷰를 추가합니다.';
#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          member_id: { type: "number", description: "회원 ID", example: 123 },
          store_id: { type: "number", description: "가게 ID", example: 456 },
          body: { type: "string", description: "리뷰 내용", example: "정말 맛있었어요!" },
          score: { type: "number", description: "리뷰 평점", example: 4.5 },
          images: {
            type: "array",
            description: "리뷰 이미지 URL 배열",
            items: { type: "string", example: "https://example.com/image1.jpg" },
            nullable: true
          }
        },
        required: ["member_id", "store_id", "body", "score"]
      }
    }
  }
};
#swagger.responses[200] = {
  description: "리뷰 추가 성공 응답",
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
              message: { type: "string", example: "Review added successfully" },
              result: { type: "object", properties: { reviewId: { type: "number", example: 789 } } }
            }
          }
        }
      }
    }
  }
};
#swagger.responses[400] = {
  description: "리뷰 추가 실패 응답 (가게가 존재하지 않음)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "R001" },
              reason: { type: "string", example: "가게가 존재하지 않습니다." },
              data: {
                type: "object",
                properties: {
                  member_id: { type: "number", example: 123 },
                  store_id: { type: "number", example: 456 }
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

    console.log("가게에 리뷰 추가를 요청하였습니다!"); 
    console.log("body:", req.body); 
    try {
      const reviewData = formatReviewData(req.body);
      const result = await addReviewService(reviewData);
      res.status(StatusCodes.CREATED).success({ message: "Review added successfully", result });
    } catch (error) {
      next(error);
    }
};


export const handleGetUserReviews = async (req, res, next) => {
   /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  try {
      const { cursorId = null, pageSize = 10 } = req.query;  // 커서와 페이지 크기 읽기
      const userId = req.params.userId;
      const reviews = await getUserReviewsService(userId, cursorId ? parseInt(cursorId) : null, parseInt(pageSize));
      res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
      next(error);
  }
};


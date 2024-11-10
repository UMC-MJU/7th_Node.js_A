import { StatusCodes } from "http-status-codes";
import { addReviewService,getUserReviewsService } from "../services/review.service.js";
import { formatReviewData } from "../dtos/review.dtos.js";
export const handleAddReview = async (req, res, next) => {
    console.log("handleAddReview가 호출되었습니다"); 
    try {
      const reviewData = formatReviewData(req.body);
      const result = await addReviewService(reviewData);
      res.status(StatusCodes.CREATED).json({ message: "Review added successfully", result });
    } catch (error) {
      next(error);
    }
};

export const handleGetUserReviews = async (req, res, next) => {
  try {
      const { cursorId = null, pageSize = 10 } = req.query;  // 커서와 페이지 크기 읽기
      const userId = req.params.userId;
      const reviews = await getUserReviewsService(userId, cursorId ? parseInt(cursorId) : null, parseInt(pageSize));
      res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
      next(error);
  }
};

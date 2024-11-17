import { StatusCodes } from "http-status-codes";
import { addReviewService } from "../services/review.service.js";
import { formatReviewData } from "../dtos/review.dtos.js";
export const handleAddReview = async (req, res, next) => {
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

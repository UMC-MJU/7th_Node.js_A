import { StatusCodes } from "http-status-codes";
import { addReviewService } from "../services/review.service.js";
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
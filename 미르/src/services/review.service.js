import { checkStoreExists, addReview, addReviewImages,getUserReviews } from "../repositories/review.repository.js";
export const addReviewService = async (data) => {
  const storeExists = await checkStoreExists(data.store_id);
  if (!storeExists) {
    throw new Error("Store does not exist");
  }
  const reviewId = await addReview(data);
  if (data.images && data.images.length > 0) {
    await addReviewImages(reviewId, data.store_id, data.images); 
  }
  return { reviewId };
};

//특정 사용자 리뷰 목록 반환
export const getUserReviewsService = async (userId) => {
    return await getUserReviews(userId);
};

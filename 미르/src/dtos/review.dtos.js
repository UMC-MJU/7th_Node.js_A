import { getUserReviews } from "../repositories/review.repository.js";
export const formatReviewData = (body) => {
    return {
      member_id: body.member_id,
      store_id: body.store_id,
      body: body.body,
      score: body.score,
      images: body.images || [],
    };
  };


  export const getUserReviewsService = async (userId, cursor, limit = 10) => {
    // 커서가 있을 때는 해당 커서 이후의 데이터부터 가져옴
    const reviews = await getUserReviews(userId, cursor, limit);
    
    // 다음 페이지로 넘길 커서 설정 (마지막 항목의 ID를 커서로 사용)
    const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].id : null;

    return {
        reviews,
        nextCursor
    };
};

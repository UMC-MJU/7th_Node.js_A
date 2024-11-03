import { addReview } from "../repositories/review.repository.js";

export const postReview = async (data) => {
  const reviewPostId = await addReview({
    store_Id: data.store_Id,
    member_Id: data.member_Id,
    score: data.score,
    body: data.body || "",
    created_at: data.created_at,
  });

  // 가게 존재 검증
  if (reviewPostId === null) {
    throw new Error("가게가 존재하지 않습니다.");
  }

  return { message: "성공" };
};

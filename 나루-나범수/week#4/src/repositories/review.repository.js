import { prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  try {
    // 가게에 이미 리뷰가 존재하는지 확인
    // 이게 아니라 그 가게가 존재하는 가게인지
    const existingReview = await prisma.review.findFirst({
      where: {
        store_Id: data.store_Id,
      },
    });

    if (existingReview) {
      return null;
    }

    // 리뷰 추가
    const newReview = await prisma.review.create({
      data: {
        store_Id: data.store_Id,
        member_Id: data.member_Id,
        score: data.score,
        body: data.body,
        created_at: data.created_at,
      },
    });

    return newReview.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { body: true, score: true, created_at: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllMyReviews = async (userId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, body: true, score: true, store_Id: true },
    where: { member_id: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

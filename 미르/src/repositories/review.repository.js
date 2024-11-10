import { prisma } from "../db.config.js";


export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
    });
    return store !== null;
};


export const addReview = async (data) => {
    const newReview = await prisma.review.create({
        data: {
            memberId: data.member_id,
            storeId: data.store_id,
            body: data.body,
            score: data.score,
            createdAt: new Date(),
        },
    });
    return newReview.id;
};


export const addReviewImages = async (reviewId, storeId, images) => {
    await prisma.reviewImage.createMany({
        data: images.map((url) => ({
            reviewId: reviewId,
            storeId: storeId,
            imageUrl: url,
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
    });
};

//내가 작성한 리뷰 목록
export const getUserReviews = async (userId, cursorId = null, pageSize = 10) => {
    return await prisma.review.findMany({
        where: {
            memberId: parseInt(userId, 10)  
        },
        select: {
            id: true,
            body: true,
            score: true,
            createdAt: true,
            reviewImages: {
                select: {
                    imageUrl: true
                }
            },
            store: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        cursor: cursorId ? { id: cursorId } : undefined, 
        skip: cursorId ? 1 : 0, 
        take: pageSize
    });
};

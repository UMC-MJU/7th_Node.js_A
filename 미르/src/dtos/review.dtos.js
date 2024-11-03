export const formatReviewData = (body) => {
    return {
      member_id: body.member_id,
      store_id: body.store_id,
      body: body.body,
      score: body.score,
      images: body.images || [],
    };
  };
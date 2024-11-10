export const bodyToReview = (body) => {
  const created_at = new Date();

  return {
    store_Id: body.store_Id,
    member_Id: body.member_Id,
    score: body.score,
    body: body.body || "",
    created_at,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

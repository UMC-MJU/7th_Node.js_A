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

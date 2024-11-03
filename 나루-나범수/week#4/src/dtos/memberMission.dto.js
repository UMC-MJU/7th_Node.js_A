export const bodyToMemberMission = (body) => {
  const created_at = new Date();
  const updated_at = new Date();

  return {
    member_id: body.member_id,
    mission_id: body.mission_id,
    status: body.status,
    created_at,
    updated_at,
  };
};

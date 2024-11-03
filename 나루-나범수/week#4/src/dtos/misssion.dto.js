export const bodyToMission = (body) => {
  const created_at = new Date();
  const updated_at = new Date();

  return {
    store_id: body.store_id,
    reward: body.reward,
    deadline: body.deadline,
    mission_spec: body.mission_spec,
    created_at,
    updated_at,
  };
};

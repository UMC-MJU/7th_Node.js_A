export const formatMissionData = (body) => {
    return {
        member_id: body.member_id,
        mission_id: body.mission_id,
        status: body.status || "진행중" 
    };
};

import { prisma } from "../db.config.js";

export const checkMissionAlreadyProgress = async (memberId, missionId) => {
    const existingMission = await prisma.memberMission.findFirst({
        where: {
            memberId: memberId,
            missionId: missionId,
            status: "진행중",
        },
    });
    return existingMission !== null; 
};


export const addMissionProgress = async (data) => {
    const newMission = await prisma.memberMission.create({
        data: {
            memberId: data.member_id,
            missionId: data.mission_id,
            status: data.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    return newMission.id; 
};

//진행 중인 미션 목록
export const getOngoingMissions = async (memberId, cursor, pageSize = 10) => {
    return await prisma.memberMission.findMany({
        where: {
            memberId: memberId,
            status: "진행중"
        },
        select: {
            id: true,
            status: true,
            createdAt: true,
            mission: {
                select: {
                    id: true,
                    reward: true,
                    deadline: true,
                    missionSpec: true,
                    store: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        cursor: cursor ? { id: cursor } : undefined,  // 커서 설정
        skip: cursor ? 1 : 0,  
        take: pageSize  
    });
};
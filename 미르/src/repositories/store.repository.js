import { prisma } from "../db.config.js";

export const addStore = async (data) => {
    const newStore = await prisma.store.create({
        data: {
            regionId: parseInt(data.region_id, 10),
            name: data.name,
            address: data.address,
            score: data.score,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
    return newStore.id;
};

export const checkRegionExists = async (region_id) => { //가게로 수정?
    const regionExists = await prisma.region.findUnique({
        where: {
            id: parseInt(region_id, 10)
        }
    });
    return regionExists !== null; 
};


export const getStoreMissions = async (storeId, cursor, pageSize = 10) => { // 특정 가게의 미션 목록
    return await prisma.mission.findMany({
        where: {
            storeId: storeId
        },
        select: {
            id: true,
            reward: true,
            deadline: true,
            missionSpec: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc"
        },
        cursor: cursor ? { id: cursor } : undefined, // 커서 설정
        skip: cursor ? 1 : 0, 
        take: pageSize 
    });
};

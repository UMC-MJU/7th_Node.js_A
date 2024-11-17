
import { DuplicateRegionNotFoundError } from "../errors.js";
import { checkRegionExists, addStore } from "../repositories/store.repository.js";


//해당 가게에 속할 지역이 존재하는지 -> 잘못 짬 ...?..

export const addStoreService = async (data) => {
    const regionExists = await checkRegionExists(data.region_id);
    if (!regionExists) {
        throw new DuplicateRegionNotFoundError("해당 지역이 존재하지 않습니다.");
    }
    //가게데이터 DB에 추가
    const storeId = await addStore(data);
    return { storeId };
};

//특정 가게 미션 목록 반환
export const getStoreMissionsService = async (storeId) => {
    return await getStoreMissions(storeId);
};
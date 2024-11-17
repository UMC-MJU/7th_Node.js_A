import { DuplicateRegionNotFoundError } from "../errors.js";
import { checkRegionExists, addStore } from "../repositories/store.repository.js";
export const addStoreService = async (data) => {
    const regionExists = await checkRegionExists(data.region_id);
    if (!regionExists) {
        throw new DuplicateRegionNotFoundError("해당 지역이 존재하지 않습니다.");
    }
    const storeId = await addStore(data);
    return { storeId };
};
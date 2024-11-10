import { StatusCodes } from "http-status-codes";
import { formatStoreData } from "../dtos/store.dtos.js";
import { addStoreService, getStoreMissionsService } from "../services/store.service.js";

//새로운 가게 정보 추가 요청 처리
export const handleAddStore = async (req, res, next) => {
    try {
        const storeData = formatStoreData({ ...req.body, region_id: req.params.regionId });
        const result = await addStoreService(storeData);
        res.status(StatusCodes.CREATED).json({ message: "Store added successfully", result });
    } catch (error) {
        next(error);
    }
};

// 특정 가게의 미션목록
export const handleGetStoreMissions = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId, 10);
        const missions = await getStoreMissionsService(storeId);
        res.status(StatusCodes.OK).json(missions);
    } catch (error) {
        next(error);
    }
};
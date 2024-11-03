import { StatusCodes } from "http-status-codes";
import { formatStoreData } from "../dtos/store.dtos.js";
import { addStoreService } from "../services/store.service.js";
export const handleAddStore = async (req, res, next) => {
    try {
        const storeData = formatStoreData({ ...req.body, region_id: req.params.regionId });
        const result = await addStoreService(storeData);
        res.status(StatusCodes.CREATED).json({ message: "Store added successfully", result });
    } catch (error) {
        next(error);
    }
};

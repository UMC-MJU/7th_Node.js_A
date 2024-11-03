export const formatStoreData = (body) => {
    return {
        region_id: body.region_id,
        name: body.name,
        address: body.address,
        score: body.score || 0, 
    };
};

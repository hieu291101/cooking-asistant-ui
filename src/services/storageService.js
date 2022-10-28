import * as httpRequest from '~/utils/httpRequest';

const getAllStorage = (accountId) => {
    return httpRequest.post(`storage/${accountId}`).then((response) => {
        return response.data.storage;
    });
};

const addStorage = (accountId, ingredientName, measure, quantity, bestBefore) => {
    return httpRequest.post('storage/add', {
        accountId,
        ingredientName,
        measure,
        quantity,
        bestBefore,
    });
};

const deleteStorage = (accountId, ingredientName) => {
    return httpRequest.dele(`storage/${accountId}`, {
        ingredientName,
    });
};

const StorageService = {
    getAllStorage,
    addStorage,
    deleteStorage,
};

export default StorageService;

import * as httpRequest from '~/utils/httpRequest';

const getAllShopping = (accountId) => {
    return httpRequest.post(`shopping/${accountId}`).then((response) => {
        return response.data.storage;
    });
};

const addShopping = (accountId, ingredientName, measure, quantity, bestBefore) => {
    return httpRequest.post('storage/add', {
        accountId,
        ingredientName,
        measure,
        quantity,
        bestBefore,
    });
};

const deleteShopping = (accountId, ingredientName) => {
    return httpRequest.dele(`storage/${accountId}`, {
        ingredientName,
    });
};

const ShoppingService = {
    getAllShopping,
    addShopping,
    deleteShopping,
};

export default ShoppingService;

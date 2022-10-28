import * as httpRequest from '~/utils/httpRequest';

export const search = (page = 1, total_time) => {
    try {
        const res = httpRequest.get('recipes/filter', {
            params: {
                page,
                total_time
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

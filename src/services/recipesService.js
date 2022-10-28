import * as httpRequest from '~/utils/httpRequest';

const recipes = (page = 1) => {
    return httpRequest
        .get('recipes/pagination', {
            params: {
                page,
            },
        })
        .then((response) => {
            console.log(response);
            return response.data;
        });
};

const filter = (page = 1, totaltime = 0, cuisine) => {
    return httpRequest
        .get('recipes/filter', {
            params: {
                page: page,
                total_time: totaltime,
                cuisine: cuisine
            },
        })
        .then((response) => {
            return response.data.recipe;
        });
}

const RecipeService = {
    recipes,
    filter
};

export default RecipeService;

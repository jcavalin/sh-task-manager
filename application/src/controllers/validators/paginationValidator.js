import joi from "joi";

function validatePagination(parameters) {
    return joi.object({
        page: joi.number().integer(),
        limit: joi.number().integer()
    }).validate(parameters);
}

export {
    validatePagination
}
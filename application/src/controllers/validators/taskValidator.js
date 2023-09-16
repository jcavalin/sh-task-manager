import joi from "joi";

function validateCreateTask(parameters) {
    return joi.object({
        summary: joi.string().max(2500).trim().required(),
        date: joi.date().required()
    }).validate(parameters);
}

export {
    validateCreateTask
}
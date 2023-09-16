import joi from "joi";

function validateAuthenticateUser(parameters) {
    return joi.object({
        email: joi.string().email().trim().required(),
        password: joi.string().required()
    }).validate(parameters);
}

export {
    validateAuthenticateUser
}
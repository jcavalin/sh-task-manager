import bcrypt from "bcrypt";

function isValidPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function generateHash(password) {
    return bcrypt.hashSync(password, 10);
}

export {
    isValidPassword,
    generateHash
}
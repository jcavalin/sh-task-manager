import bcrypt from "bcrypt";

export default class PasswordManager {
    isValid(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    generate(password) {
        return bcrypt.hashSync(password, 10);
    }
}
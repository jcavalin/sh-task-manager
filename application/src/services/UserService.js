import UserRepository from "../repositories/UserRepository.js";
import labelConfig from "../config/labelConfig.js";
import AuthorizationToken from "../helpers/AuthorizationToken.js";
import PasswordManager from "../helpers/PasswordManager.js";

export default class UserService {

    constructor() {
        this.repository = new UserRepository();
    }

    getByEmail(email) {
        return this.repository.selectOne(email);
    }

    async authenticate(email, password) {
        const user = await this.getByEmail(email);
        const passwordManager = new PasswordManager();

        if (!user || !passwordManager.isValid(password, user.password)) {
            throw new Error(labelConfig.authentication_failed);
        }

        const authorizationToken = new AuthorizationToken();
        return authorizationToken.generate({email: user.email, role: user.role});
    }
}
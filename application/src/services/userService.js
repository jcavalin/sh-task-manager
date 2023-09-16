import {getUserByEmail} from "../repositories/userRepository.js";
import label from "../config/labelConfig.js";
import {generateToken} from "../helpers/authorizationToken.js";
import {isValidPassword} from "../helpers/passwordManager.js";

async function authenticateUser(email, password) {
    const user = await getUserByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
        throw new Error(label('authentication_failed'));
    }

    return generateToken({email: user.email, role: user.role});
}

export {
    getUserByEmail,
    authenticateUser
}
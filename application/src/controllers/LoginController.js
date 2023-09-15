export default class LoginController {
    authAction(req, res) {
        res.send({'action': 'authentication'});
    }
}
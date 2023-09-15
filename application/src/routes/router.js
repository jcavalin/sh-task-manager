import roleConfig from "../config/roleConfig.js";
import authorizer from "./middlewares/authorizer.js";
import roleManager from "./middlewares/roleManager.js";
import IndexController from '../controllers/IndexController.js';
import UserController from '../controllers/UserController.js';
import TaskController from '../controllers/TaskController.js';

export default function (app) {
    app.get('/', (req, res) => new IndexController().indexAction(req, res));

    app.post('/login/auth', (req, res) => new UserController().authenticateAction(req, res));

    app.get(
        '/tasks',
        authorizer,
        roleManager([roleConfig.technician, roleConfig.manager]),
        (req, res) => new TaskController().listAction(req, res)
    );
    app.post(
        '/tasks',
        authorizer,
        roleManager(roleConfig.manager),
        (req, res) => new TaskController().createAction(req, res)
    );
};
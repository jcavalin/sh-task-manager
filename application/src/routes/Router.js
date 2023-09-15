import IndexController from '../controllers/IndexController.js';
import LoginController from '../controllers/LoginController.js';
import TaskController from '../controllers/TaskController.js';

export default class Router {
    constructor(app) {
        this.app = app;
    }

    setRoutes() {
        this.app.route('/')
            .get((req, res) => new IndexController().indexAction(req, res));

        this.app.route('/login/auth')
            .post((req, res) => new LoginController().authAction(req, res));

        this.app.route('/tasks')
            .get((req, res) => new TaskController().listAction(req, res))
            .post((req, res) => new TaskController().createAction(req, res));
    }
};
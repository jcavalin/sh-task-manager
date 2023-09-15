import authorizer from "./middlewares/authorizer.js";
import IndexController from '../controllers/IndexController.js';
import UserController from '../controllers/UserController.js';
import TaskController from '../controllers/TaskController.js';

export default function (app) {
    app.get('/', (req, res) => new IndexController().indexAction(req, res));

    app.post('/login/auth', (req, res) => new UserController().authenticateAction(req, res));

    app.get('/tasks', authorizer, (req, res) => new TaskController().listAction(req, res));
    app.post('/tasks', authorizer, (req, res) => new TaskController().createAction(req, res))
};
import {technician, manager} from "../config/roleConfig.js";
import authorizer from "./middlewares/authorizer.js";
import roleManager from "./middlewares/roleManager.js";
import {home} from '../controllers/indexController.js';
import {authenticate} from '../controllers/userController.js';
import {listTasks, createTask} from '../controllers/taskController.js';


export default function (app) {
    app.get('/', home);

    app.post('/login/auth', authenticate);

    app.get('/tasks', authorizer, roleManager([technician, manager]), listTasks);
    app.post('/tasks', authorizer, roleManager(technician), createTask);
};
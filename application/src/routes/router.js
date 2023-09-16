import {technician, manager} from "../config/roleConfig.js";
import authorizer from "./middlewares/authorizer.js";
import roleManager from "./middlewares/roleManager.js";
import {homeAction} from '../controllers/indexController.js';
import {authenticateAction} from '../controllers/userController.js';
import {listTasksAction, createTaskAction} from '../controllers/taskController.js';


export default function (app) {
    app.get('/', homeAction);

    app.post('/login/auth', authenticateAction);

    app.get('/tasks', authorizer, roleManager([technician, manager]), listTasksAction);
    app.post('/tasks', authorizer, roleManager(technician), createTaskAction);
};
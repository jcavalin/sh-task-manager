import {technicianType, managerType} from "../helpers/role.js";
import authorizer from "./middlewares/authorizer.js";
import roleManager from "./middlewares/roleManager.js";
import {openApiAction, docsAction} from '../controllers/docsController.js';
import {authenticateAction} from '../controllers/userController.js';
import {listTasksAction, createTaskAction} from '../controllers/taskController.js';

export default function (app) {
    app.get('/', docsAction);
    app.get('/docs/v1/openapi.yaml', openApiAction);

    app.post('/api/v1/login/auth', authenticateAction);

    app.get('/api/v1/tasks', authorizer, roleManager([technicianType, managerType]), listTasksAction);
    app.post('/api/v1/tasks', authorizer, roleManager(technicianType), createTaskAction);
};
export default class TaskController {
    listAction(req, res) {
        res.send({'action': 'get tasks'});
    }

    createAction(req, res) {
        res.send({'action': 'create tasks'});
    }
}
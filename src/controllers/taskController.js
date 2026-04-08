const taskService = require('../services/tasksService');

const getRequestBody = (req) => {
    return new Promise((resolve,reject) => {
        let body ='';

        req.on('data', chunk => {
            resolve(JSON.parse(body));
        });
    });
};

const createTask = async (req, res) => {
    const body = await getRequestBody(req);

    const task = taskService.addTask(body.title);

    res.statusCode = 201;
    res.end(JSON.stringify(task));
};

const listTasks = (req, res) => {
    const tasks = taskService.getTasks();

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
};

const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);

    const task = taskService.updateTask(id, body.title);

    if(!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrada' })
        );
    }

    res.end(JSON.stringify(task));
};

const deleteTask = (req, res, id) => {
    const sucess = taskService.deleteTask(id);

    if (!success){
        res.statusCode = 404;
        return res.end(JSON.stringify(
            {message: 'Não encontrada' }
        ));
    }

    res.end(JSON.stringify({ message: 'Removida'}));
};

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask
};
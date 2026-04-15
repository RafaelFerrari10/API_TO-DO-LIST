const taskService = require('../services/taskServices');
 
// Função auxiliar para ler o body da requisição
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
 
        req.on('data', chunk => {
            body += chunk.toString();
        });
 
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error('JSON inválido no corpo da requisição'));
            }
        });
 
        req.on('error', reject);
    });
};
 
// Função auxiliar para enviar resposta JSON
const sendJSON = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
};
 
// Criar tarefa
const createTask = async (req, res) => {
    try {
        const body = await getRequestBody(req);
 
        if (!body.title) {
            return sendJSON(res, 400, { message: 'O campo "title" é obrigatório' });
        }
 
        const task = taskService.addTask(body.title);
        sendJSON(res, 201, task);
    } catch (error) {
        sendJSON(res, 400, { message: error.message });
    }
};
 
// Listar tarefas
const listTasks = (req, res) => {
    try {
        const tasks = taskService.getTasks();
        sendJSON(res, 200, tasks);
    } catch (error) {
        sendJSON(res, 500, { message: 'Erro interno do servidor' });
    }
};
 
// Buscar tarefa por ID (Nível Pleno)
const getTaskById = (req, res, id) => {
    try {
        const task = taskService.getTaskById(id);
 
        if (!task) {
            return sendJSON(res, 404, { message: 'Tarefa não encontrada' });
        }
 
        sendJSON(res, 200, task);
    } catch (error) {
        sendJSON(res, 500, { message: 'Erro interno do servidor' });
    }
};
 
// Atualizar tarefa (Nível Júnior - suporta title e completed)
const updateTask = async (req, res, id) => {
    try {
        const body = await getRequestBody(req);
 
        if (Object.keys(body).length === 0) {
            return sendJSON(res, 400, { message: 'Envie ao menos um campo para atualizar: "title" ou "completed"' });
        }
 
        const task = taskService.updateTask(id, body);
 
        if (!task) {
            return sendJSON(res, 404, { message: 'Tarefa não encontrada' });
        }
 
        sendJSON(res, 200, task);
    } catch (error) {
        sendJSON(res, 400, { message: error.message });
    }
};
 
// Deletar tarefa
const deleteTask = (req, res, id) => {
    try {
        const success = taskService.deleteTask(id);
 
        if (!success) {
            return sendJSON(res, 404, { message: 'Tarefa não encontrada' });
        }
 
        sendJSON(res, 200, { message: 'Removida' });
    } catch (error) {
        sendJSON(res, 500, { message: 'Erro interno do servidor' });
    }
};
 
module.exports = {
    createTask,
    listTasks,
    getTaskById,
    updateTask,
    deleteTask
};
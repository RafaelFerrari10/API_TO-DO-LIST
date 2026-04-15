const taskController = require('../controllers/taskController');
 
module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;
 
    // GET /tasks — Listar todas as tarefas
    if (url === '/tasks' && method === 'GET') {
        return taskController.listTasks(req, res);
    }
 
    // POST /tasks — Criar tarefa
    if (url === '/tasks' && method === 'POST') {
        return taskController.createTask(req, res);
    }
 
    // Rotas com ID dinâmico: /tasks/:id
    const taskWithId = url.match(/^\/tasks\/(\d+)$/);
 
    if (taskWithId) {
        const id = parseInt(taskWithId[1]);
 
        // GET /tasks/:id — Buscar tarefa por ID (Nível Pleno)
        if (method === 'GET') {
            return taskController.getTaskById(req, res, id);
        }
 
        // PUT /tasks/:id — Atualizar tarefa (Nível Júnior: title e/ou completed)
        if (method === 'PUT') {
            return taskController.updateTask(req, res, id);
        }
 
        // DELETE /tasks/:id — Deletar tarefa
        if (method === 'DELETE') {
            return taskController.deleteTask(req, res, id);
        }
    }
 
    // Rota não encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};
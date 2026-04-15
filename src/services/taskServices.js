const fs = require('fs');
const path = require('path');
const { createTask } = require('../models/taskModels');
 
const DATA_FILE = path.join(__dirname, '../../data/tasks.json');
 
// Garante que o diretório data existe
const ensureDataDir = () => {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
 
// Lê tarefas do arquivo JSON
const readTasks = () => {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
        return [];
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
};
 
// Salva tarefas no arquivo JSON
const saveTasks = (tasks) => {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};
 
// Obtém próximo ID disponível
const getNextId = (tasks) => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
};
 
// Criar tarefa
const addTask = (title) => {
    if (!title || title.trim().length < 3) {
        throw new Error('O título deve ter pelo menos 3 caracteres');
    }
    const tasks = readTasks();
    const task = createTask(getNextId(tasks), title.trim());
    tasks.push(task);
    saveTasks(tasks);
    return task;
};
 
// Listar todas as tarefas
const getTasks = () => {
    return readTasks();
};
 
// Buscar tarefa por ID (Nível Pleno)
const getTaskById = (id) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    return task || null;
};
 
// Atualizar tarefa (Nível Júnior - suporta title e completed)
const updateTask = (id, data) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
 
    if (data.title !== undefined) {
        if (data.title.trim().length < 3) {
            throw new Error('O título deve ter pelo menos 3 caracteres');
        }
        task.title = data.title.trim();
    }
 
    if (data.completed !== undefined) {
        task.completed = Boolean(data.completed);
    }
 
    saveTasks(tasks);
    return task;
};
 
// Deletar tarefa
const deleteTask = (id) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
};
 
module.exports = {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
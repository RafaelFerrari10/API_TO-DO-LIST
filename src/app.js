const http = require('http');
const taskRoutes = require('./routes/taskRoutes');
 
// Porta do servidor
const PORT = 3000;
 
// Cria servidor HTTP
const server = http.createServer((req, res) => {
 
    // Define cabeçalho padrão JSON
    res.setHeader('Content-Type', 'application/json');
 
    // Permite requisições de qualquer origem (CORS básico)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    // Responde preflight do CORS
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    }
 
    // Log de cada requisição
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
 
    // Chama o roteador
    taskRoutes(req, res);
});
 
// Inicia o servidor
server.listen(PORT, () => {
    console.log(`\nServidor rodando em http://localhost:${PORT}`);
    console.log(`Dados salvos em: data/tasks.json`);
    console.log(`\nEndpoints disponíveis:`);
    console.log(`  GET    /tasks          → listar tarefas`);
    console.log(`  POST   /tasks          → criar tarefa`);
    console.log(`  GET    /tasks/:id      → buscar por ID`);
    console.log(`  PUT    /tasks/:id      → atualizar tarefa`);
    console.log(`  DELETE /tasks/:id      → deletar tarefa\n`);
});
const http = require ('http');

const taskRoutes = require('./routes/tasks');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    taskRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
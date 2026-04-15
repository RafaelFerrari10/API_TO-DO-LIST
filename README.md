# 📝 TO-DO LIST API — Node.js Puro

API RESTful construída com **Node.js puro** (sem frameworks), utilizando o módulo nativo `http` e o sistema de módulos **CommonJS**. Desenvolvida como atividade avaliativa da disciplina de Programação Web II — Etec Bento Quirino.

---

## 🎯 Nível Implementado: Sênior (MB)

Este projeto implementa todos os níveis de forma acumulativa:

| Nível | Descrição | Status |
|-------|-----------|--------|
| **Júnior** | Campo `completed` no model + atualizar status via PUT | ✅ |
| **Pleno** | Endpoint `GET /tasks/:id` para buscar tarefa por ID | ✅ |
| **Sênior** | Persistência em arquivo `data/tasks.json` via módulo `fs` | ✅ |

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — runtime JavaScript no servidor
- **Módulo `http`** — criação do servidor HTTP nativo
- **Módulo `fs`** — leitura e escrita de arquivos (persistência)
- **Módulo `path`** — manipulação de caminhos de arquivo
- **CommonJS** — sistema de módulos (`require` / `module.exports`)

Sem dependências externas. Sem `npm install`. Roda com Node.js puro.

---

## 📁 Estrutura do Projeto

```
TO_DO_LIST/
├── data/
│   └── tasks.json          # Arquivo de persistência (gerado automaticamente)
├── src/
│   ├── controllers/
│   │   └── taskController.js   # Controla o fluxo das requisições
│   ├── models/
│   │   └── taskModel.js        # Define a estrutura de uma tarefa
│   ├── routes/
│   │   └── taskRoutes.js       # Roteamento manual de endpoints
│   ├── services/
│   │   └── taskService.js      # Lógica de negócio + persistência JSON
│   └── app.js                  # Servidor HTTP principal
└── README.md
```

---

## ⚙️ Como Configurar o Ambiente

**Requisito:** Node.js instalado (versão 14 ou superior).

Verifique com:
```bash
node -v
```

---

## 📦 Como Instalar as Dependências

Este projeto **não possui dependências externas**. Não é necessário rodar `npm install`.

---

## ▶️ Como Executar o Aplicativo

```bash
# Entre na pasta do projeto
cd TO_DO_LIST

# Inicie o servidor
node src/app.js
```

O servidor iniciará em `http://localhost:3000`.

---

## 🔌 Endpoints da API

**Base URL:** `http://localhost:3000`

### Criar Tarefa
```http
POST /tasks
Content-Type: application/json

{ "title": "Estudar Node.js" }
```
**Resposta (201):**
```json
{ "id": 1, "title": "Estudar Node.js", "completed": false }
```

---

### Listar Tarefas
```http
GET /tasks
```
**Resposta (200):**
```json
[{ "id": 1, "title": "Estudar Node.js", "completed": false }]
```

---

### Buscar Tarefa por ID *(Nível Pleno)*
```http
GET /tasks/1
```
**Resposta (200):**
```json
{ "id": 1, "title": "Estudar Node.js", "completed": false }
```

---

### Atualizar Tarefa *(Nível Júnior — title e/ou completed)*
```http
PUT /tasks/1
Content-Type: application/json

{ "title": "Estudar HTTP no Node", "completed": true }
```
**Resposta (200):**
```json
{ "id": 1, "title": "Estudar HTTP no Node", "completed": true }
```

---

### Deletar Tarefa
```http
DELETE /tasks/1
```
**Resposta (200):**
```json
{ "message": "Removida" }
```

---

## 💡 Explicação da Solução

### Arquitetura em Camadas

A API segue uma arquitetura profissional em 4 camadas:

1. **Routes** — porta de entrada; mapeia URL + método HTTP para o controller correto
2. **Controller** — intermediário; lê o body da requisição, chama o service, envia a resposta
3. **Service** — coração da aplicação; contém toda a lógica de negócio e faz a persistência
4. **Model** — define a estrutura de dados de uma tarefa (`id`, `title`, `completed`)

### Persistência de Dados (Nível Sênior)

O `taskService.js` utiliza o módulo nativo `fs` para:
- **Ler** as tarefas do arquivo `data/tasks.json` a cada operação
- **Gravar** as tarefas atualizadas de volta ao arquivo após cada modificação
- **Criar** o arquivo automaticamente na primeira execução, caso não exista

Isso garante que os dados **sobrevivem ao reinício do servidor**.

### Roteamento Manual

Sem Express, o roteamento é feito comparando `req.url` e `req.method` manualmente. Para rotas dinâmicas (`/tasks/:id`), usamos uma expressão regular:

```js
const taskWithId = url.match(/^\/tasks\/(\d+)$/);
```

### Validações Implementadas

- Título obrigatório no POST
- Título com mínimo de 3 caracteres
- Retorno `404` quando ID não existe
- Retorno `400` para JSON inválido ou body vazio no PUT
- Retorno `400` para dados inválidos na criação/atualização

---

## 👨‍💻 Autor

Desenvolvido para a disciplina **Programação Web II** — Etec Bento Quirino / CPS — 2026.

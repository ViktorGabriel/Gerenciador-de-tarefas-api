// src/routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const taskRoutes = Router();
const taskController = new TaskController();

// Vincula a URL e o método HTTP ao método correto do Controller
// Usamos uma arrow function para garantir que o contexto do 'this' dentro do controller não se perca
taskRoutes.post('/', (req, res) => taskController.create(req, res));
taskRoutes.get('/', (req, res) => taskController.listAll(req, res));

export { taskRoutes };
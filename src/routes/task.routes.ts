// src/routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const taskRoutes = Router();
const taskController = new TaskController();

// Vincula a URL e o método HTTP ao método correto do Controller
// Usamos uma arrow function para garantir que o contexto do 'this' dentro do controller não se perca
taskRoutes.post('/', (req, res) => taskController.create(req, res));
taskRoutes.get('/', (req, res) => taskController.listAll(req, res));
taskRoutes.get('/:id', (req, res) => taskController.show(req, res));
taskRoutes.put('/:id', (req, res) => taskController.update(req, res));
taskRoutes.delete('/:id', (req, res) => taskController.delete(req, res));

export { taskRoutes };
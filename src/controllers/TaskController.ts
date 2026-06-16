// src/controllers/TaskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/TaskServices';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        // Não precisa de try/catch! Se o Zod falhar, o middleware captura.
        const newTask = await this.taskService.executeCreate(req.body);
        return res.status(201).json(newTask);
    }

    async listAll(req: Request, res: Response): Promise<Response> {
        const tasks = await this.taskService.executeListAll();
        return res.status(200).json(tasks);
    }
}
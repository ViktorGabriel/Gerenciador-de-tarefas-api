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

    async show(req: Request, res: Response): Promise<Response> {
        const id = req.params.id as string;
        const task = await this.taskService.executeFindById(id);
        return res.status(200).json(task);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id as string;
        const updatedTask = await this.taskService.executeUpdate(id, req.body);
        return res.status(200).json(updatedTask);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id as string;
        await this.taskService.executeDelete(id);
        return res.status(204).send(); // 204 No Content é o padrão para deleções com sucesso
    }
}
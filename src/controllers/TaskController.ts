import { Request, Response } from 'express';
import { TaskService } from '../services/TaskServices';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            // Passa o corpo da requisição (req.body) para o Service executar
            const newTask = await this.taskService.executeCreate(req.body);

            // Retorna 201 Created com o objeto da nova tarefa criado no banco
            return res.status(201).json(newTask);
        } catch (error: any) {
            // Tratamento temporário de erro simples (vamos melhorar isso depois)
            if (error.issues) {
                // Se o erro veio das validações do Zod
                return res.status(400).json({ error: error.issues });
            }
            return res.status(500).json({ message: error.message || 'Erro interno no servidor' });
        }
    }

    // Endpoint para listar todas as tarefas
    async listAll(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await this.taskService.executeListAll();
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).json({ message: error.message || 'Erro interno no servidor' });
        }
    }
}
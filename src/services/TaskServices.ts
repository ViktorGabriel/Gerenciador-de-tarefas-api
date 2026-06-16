import { TaskRepository, CreateTaskData } from '../repositories/TaskRepository';
import { z } from 'zod';
import { AppError } from '../errors/AppError';

const createTaskSchema = z.object({
    title: z.string().min(3, "O titulo deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    priority: z.enum(['Alta', 'Media', 'Baixa'], {
        message: 'A prioridade deve ser Alta, Media ou Baixa',
    }),
    category: z.string().min(2, 'A categoria deve ter pelo menos 2 caracteres'),
});

export class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async executeCreate(bodyData: unknown) {
        //valida os dados que vieram da requisição contra o schema do Zod
        const validatedData = createTaskSchema.parse(bodyData);

        //Se passou na validação, chama o repositório para salvar no banco
        const newTask = await this.taskRepository.create({
            ...validatedData,
            description: validatedData.description ?? null,
        });
        return newTask;

    }

    async executeListAll() {
        return await this.taskRepository.findAll();
    }

    async executeFindById(id: string) {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new AppError('Tarefa não encontrada', 404);
        }

        return task;
    }

    async executeUpdate(id: string, bodyData: unknown) {
        // Garante que a tarefa existe antes de atualizar
        await this.executeFindById(id);

        const updateTaskSchema = z.object({
            title: z.string().min(3).optional(),
            description: z.string().nullable().optional(),
            priority: z.enum(['Alta', 'Média', 'Baixa']).optional(),
            category: z.string().min(2).optional(),
            completed: z.boolean().optional(),
        });

        const validatedData = updateTaskSchema.parse(bodyData);

        // Remove undefined properties to comply with exactOptionalPropertyTypes
        const cleanData = Object.fromEntries(
            Object.entries(validatedData).filter(([_, value]) => value !== undefined)
        ) as Partial<CreateTaskData & { completed: boolean }>;

        return await this.taskRepository.update(id, cleanData);
    }

    async executeDelete(id: string) {
        // Garante que a tarefa existe antes de deletar
        await this.executeFindById(id);

        await this.taskRepository.delete(id);
    }
}

import { TaskRepository } from '../repositories/TaskRepository';
import { z } from 'zod';

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
        const newTask = await this.taskRepository.create(validatedData);
        return newTask;

    }

    async executeListAll() {
        return await this.taskRepository.findAll();
    }
}

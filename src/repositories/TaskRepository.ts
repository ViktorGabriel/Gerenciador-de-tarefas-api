import { prisma } from '../config/prisma';

interface CreateTaskData {
    title: string;
    description?: string;
    priority: string;
    category: string;
}

export class TaskRepository {
    //Metodo para salvar a tarefa no SQlite
    async create(data: CreateTaskData) {
        return await prisma.task.create({
            data: {
                title: data.title,
                description: data.description ?? null,
                priority: data.priority,
                category: data.category,
            }
        });
    }

    //Metodo para buscar todas tarefas no banco de dados
    async findAll() {
        return await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc',// mais recentes primeiro
            },
        });
    }
}

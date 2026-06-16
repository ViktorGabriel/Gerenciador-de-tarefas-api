import { prisma } from '../config/prisma';

export interface CreateTaskData {
    title: string;
    description?: string | null;
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

    async findById(id: string) {
        return await prisma.task.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Partial<CreateTaskData & { completed: boolean }>) {
        return await prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        await prisma.task.delete({
            where: { id },
        });
    }
}

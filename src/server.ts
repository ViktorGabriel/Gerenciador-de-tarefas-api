// src/server.ts
import express, { Request, Response } from 'express';
import { taskRoutes } from './routes/task.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota inicial de teste
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'API de Gerenciamento de Tarefas rodando com sucesso!',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Acopla as rotas de tarefas prefixadas com /tasks
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`[server]: Servidor ativo na porta http://localhost:${PORT}`);
});
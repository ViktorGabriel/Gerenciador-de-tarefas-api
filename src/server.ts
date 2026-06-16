import express, { Request, Response } from 'express';
import { taskRoutes } from './routes/task.routes';
import { errorHandler } from './errors/AppError';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API rodando perfeitamente!' });
});

// Suas rotas
app.use('/tasks', taskRoutes);

// O Middleware de erro fica OBRIGATORIAMENTE no final, após as rotas
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`[server]: Servidor ativo na porta http://localhost:${PORT}`);
});
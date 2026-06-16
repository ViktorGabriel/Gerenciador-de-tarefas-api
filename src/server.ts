import express, { Request, Response } from 'express';
import { taskRoutes } from './routes/task.routes';
import { errorHandler } from './errors/AppError';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
const PORT = 3000;

app.use(express.json());

// Documentação da API com Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    console.log(`[swagger]: Documentação disponível em http://localhost:${PORT}/api-docs`);
});
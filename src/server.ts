import express = require('express');
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Api de Gerenciamento de Tarefas arodando com sucesso!',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`[server]: Servidor rodando em "http://localhost:${PORT}"`);
});
export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // 1. Se o erro foi disparado por nós via AppError (ex: 404 Not Found)
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    // 2. Se o erro veio da validação do Zod (Campos incorretos)
    if (error instanceof ZodError) {
        return res.status(400).json({
            status: 'validation_error',
            message: 'Dados inválidos enviados na requisição.',
            issues: error.format(), // Formata o erro do Zod para ficar mais legível
        });
    }

    // 3. Se for um erro desconhecido do servidor (ex: banco caiu, erro de sintaxe)
    console.error('[Internal Error]:', error); // Logamos no terminal para o desenvolvedor ver

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor.',
    });
}

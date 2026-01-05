// src/middleware/errorHandler.ts
import { ResponseStatus } from '../models/Link';
export const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    const response = {
        status: ResponseStatus.ERROR,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
    res.status(500).json(response);
};
// Middleware para rotas não encontradas
export const notFoundHandler = (req, res) => {
    const response = {
        status: ResponseStatus.ERROR,
        message: 'Rota não encontrada'
    };
    res.status(404).json(response);
};

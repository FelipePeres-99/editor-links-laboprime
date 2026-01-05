// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { ApiResponse, ResponseStatus } from '../models/Link';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  const response: ApiResponse = {
    status: ResponseStatus.ERROR,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  };

  res.status(500).json(response);
};

// Middleware para rotas não encontradas
export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    status: ResponseStatus.ERROR,
    message: 'Rota não encontrada'
  };

  res.status(404).json(response);
};
"use strict";
// src/middleware/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const Link_1 = require("../models/Link");
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    const response = {
        status: Link_1.ResponseStatus.ERROR,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
// Middleware para rotas não encontradas
const notFoundHandler = (req, res) => {
    const response = {
        status: Link_1.ResponseStatus.ERROR,
        message: 'Rota não encontrada'
    };
    res.status(404).json(response);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map
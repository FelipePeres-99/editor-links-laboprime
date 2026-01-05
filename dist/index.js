// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import linkRoutes from './routes/linkRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
// Carrega variáveis de ambiente
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares de segurança e logging
app.use(helmet()); // Headers de segurança
app.use(cors()); // CORS para frontend
app.use(morgan('combined')); // Logs de requisições
// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
// Rotas principais
app.use('/', linkRoutes);
// Middlewares de erro (devem ser os últimos)
app.use(notFoundHandler);
app.use(errorHandler);
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
export default app;

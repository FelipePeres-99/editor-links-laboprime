// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import linkRoutes from './routes/linkRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
// Para ES Modules - obter __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
console.log('🔧 Configurando middlewares...');
// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir arquivos estáticos
const publicPath = path.join(__dirname, '../public');
console.log(`📁 Pasta pública: ${publicPath}`);
app.use(express.static(publicPath));
// Rota principal
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, '../public/index.html');
    console.log(`📄 Servindo: ${htmlPath}`);
    res.sendFile(htmlPath);
});
// Rota de saúde
app.get('/health', (req, res) => {
    console.log('💚 Health check acessado');
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// DEBUG: Verificar se as rotas estão sendo importadas
console.log('📡 Registrando rotas da API...');
console.log('linkRoutes:', typeof linkRoutes);
console.log('redirectRoutes:', typeof redirectRoutes);
// Rotas da API
app.use('/api', linkRoutes);
console.log('✅ Rotas da API registradas em /api');
// Rotas de redirecionamento
app.use('/', redirectRoutes);
console.log('✅ Rotas de redirecionamento registradas em /');
// Middleware de erro
app.use(errorHandler);
console.log('🚀 Iniciando servidor...');
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log(`🚀 SERVIDOR RODANDO!`);
    console.log(`📍 URL: http://localhost:3000`);
    console.log(`📊 Health: http://localhost:3000/health`);
    console.log(`🔗 API: http://localhost:3000/api/links`);
    console.log(`📁 Static: ${publicPath}`);
    console.log('='.repeat(50) + '\n');
});
export default app;

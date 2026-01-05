"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const linkRoutes_1 = __importDefault(require("./routes/linkRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
// Carrega variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares de segurança e logging
app.use((0, helmet_1.default)()); // Headers de segurança
app.use((0, cors_1.default)()); // CORS para frontend
app.use((0, morgan_1.default)('combined')); // Logs de requisições
// Middleware para parsing JSON
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Servir arquivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rotas principais
app.use('/', linkRoutes_1.default);
// Middlewares de erro (devem ser os últimos)
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
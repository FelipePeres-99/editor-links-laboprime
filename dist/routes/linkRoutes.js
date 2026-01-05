// src/routes/linkRoutes.ts
import { Router } from 'express';
import { sharedLinkController } from '../controllers/SharedController.js';
const router = Router();
console.log('🔧 Criando rotas de links...');
// Usar a instância compartilhada
router.post('/links', sharedLinkController.createLink);
router.get('/links', sharedLinkController.getAllLinks);
console.log('✅ Rotas de links criadas');
export default router;

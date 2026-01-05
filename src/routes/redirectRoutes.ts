// src/routes/redirectRoutes.ts
import { Router } from 'express';
import { sharedLinkController } from '../controllers/SharedController.js';

const router = Router();

console.log('🔧 Criando rotas de redirecionamento...');

// Usar a instância compartilhada
router.get('/:alias', sharedLinkController.redirectLink);

console.log('✅ Rotas de redirecionamento criadas');

export default router;
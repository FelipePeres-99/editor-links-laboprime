// src/routes/linkRoutes.ts

import { Router } from 'express';
import { LinkController } from '../controllers/LinkController';

const router = Router();
const linkController = new LinkController();

// Rotas da API
router.post('/api/links', linkController.createLink);
router.get('/api/links', linkController.getAllLinks);

// Rota de redirecionamento (deve ser a última)
router.get('/:alias', linkController.redirectLink);

export default router;
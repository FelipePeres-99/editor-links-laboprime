"use strict";
// src/routes/linkRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LinkController_1 = require("../controllers/LinkController");
const router = (0, express_1.Router)();
const linkController = new LinkController_1.LinkController();
// Rotas da API
router.post('/api/links', linkController.createLink);
router.get('/api/links', linkController.getAllLinks);
// Rota de redirecionamento (deve ser a última)
router.get('/:alias', linkController.redirectLink);
exports.default = router;
//# sourceMappingURL=linkRoutes.js.map
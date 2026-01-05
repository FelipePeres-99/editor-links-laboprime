// src/controllers/SharedController.ts
import { LinkController } from './LinkController.js';
// Instância única compartilhada
export const sharedLinkController = new LinkController();
console.log('🌍 Controller compartilhado criado');

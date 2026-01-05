"use strict";
// src/services/LinkService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
const validators_1 = require("../utils/validators");
const uuid_1 = require("uuid");
class LinkService {
    constructor() {
        // Em produção, isso seria um banco de dados
        this.links = new Map();
    }
    /**
     * Cria um novo link personalizado
     */
    async createLink(linkData) {
        // Validações
        if (!validators_1.Validators.isValidUrl(linkData.originalUrl)) {
            throw new Error('URL inválida');
        }
        if (!validators_1.Validators.isValidAlias(linkData.customAlias)) {
            throw new Error('Alias deve ter 3-50 caracteres e conter apenas letras, números, - e _');
        }
        if (!validators_1.Validators.isValidTitle(linkData.title)) {
            throw new Error('Título deve ter entre 1 e 100 caracteres');
        }
        // Verifica se alias já existe
        if (this.links.has(linkData.customAlias.toLowerCase())) {
            throw new Error('Este alias já está em uso');
        }
        // Cria o link
        const newLink = {
            id: (0, uuid_1.v4)(),
            originalUrl: linkData.originalUrl,
            customAlias: linkData.customAlias.toLowerCase(),
            title: validators_1.Validators.sanitizeString(linkData.title),
            emoji: linkData.emoji,
            clicks: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        };
        // Salva no "banco" (Map)
        this.links.set(newLink.customAlias, newLink);
        return newLink;
    }
    /**
     * Busca link pelo alias
     */
    async getLinkByAlias(alias) {
        return this.links.get(alias.toLowerCase());
    }
    /**
     * Incrementa contador de cliques
     */
    async incrementClicks(alias) {
        const link = this.links.get(alias.toLowerCase());
        if (link && link.isActive) {
            link.clicks++;
            link.updatedAt = new Date();
        }
    }
    /**
     * Lista todos os links
     */
    async getAllLinks() {
        return Array.from(this.links.values());
    }
    /**
     * Converte Link para DTO de resposta
     */
    linkToResponseDTO(link, baseUrl) {
        return {
            id: link.id,
            shortUrl: `${baseUrl}/${link.customAlias}`,
            originalUrl: link.originalUrl,
            title: link.title,
            emoji: link.emoji,
            clicks: link.clicks,
            createdAt: link.createdAt.toISOString()
        };
    }
}
exports.LinkService = LinkService;
//# sourceMappingURL=LinkService.js.map
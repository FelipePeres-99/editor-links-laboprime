// src/services/LinkService.ts
import { Validators } from '../utils/validators';
import { v4 as uuidv4 } from 'uuid';
export class LinkService {
    constructor() {
        // Em produção, isso seria um banco de dados
        this.links = new Map();
    }
    /**
     * Cria um novo link personalizado
     */
    async createLink(linkData) {
        // Validações
        if (!Validators.isValidUrl(linkData.originalUrl)) {
            throw new Error('URL inválida');
        }
        if (!Validators.isValidAlias(linkData.customAlias)) {
            throw new Error('Alias deve ter 3-50 caracteres e conter apenas letras, números, - e _');
        }
        if (!Validators.isValidTitle(linkData.title)) {
            throw new Error('Título deve ter entre 1 e 100 caracteres');
        }
        // Verifica se alias já existe
        if (this.links.has(linkData.customAlias.toLowerCase())) {
            throw new Error('Este alias já está em uso');
        }
        // Cria o link
        const newLink = {
            id: uuidv4(),
            originalUrl: linkData.originalUrl,
            customAlias: linkData.customAlias.toLowerCase(),
            title: Validators.sanitizeString(linkData.title),
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

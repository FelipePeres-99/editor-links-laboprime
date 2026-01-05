// src/controllers/LinkController.ts
import { LinkService } from '../services/LinkService.js';
import { ResponseStatus } from '../models/Link';
export class LinkController {
    constructor() {
        /**
         * Cria um novo link personalizado
         * POST /api/links
         */
        this.createLink = async (req, res) => {
            try {
                const linkData = req.body;
                // Cria o link
                const newLink = await this.linkService.createLink(linkData);
                // Converte para DTO de resposta
                const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
                const responseData = this.linkService.linkToResponseDTO(newLink, baseUrl);
                const response = {
                    status: ResponseStatus.SUCCESS,
                    message: 'Link criado com sucesso!',
                    data: responseData
                };
                res.status(201).json(response);
            }
            catch (error) {
                const response = {
                    status: ResponseStatus.ERROR,
                    message: 'Erro ao criar link',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                };
                res.status(400).json(response);
            }
        };
        /**
         * Redireciona para o link original
         * GET /:alias
         */
        this.redirectLink = async (req, res) => {
            try {
                const { alias } = req.params;
                const link = await this.linkService.getLinkByAlias(alias);
                if (!link || !link.isActive) {
                    res.status(404).json({
                        status: ResponseStatus.ERROR,
                        message: 'Link não encontrado'
                    });
                    return;
                }
                // Incrementa contador de cliques
                await this.linkService.incrementClicks(alias);
                // Redireciona
                res.redirect(301, link.originalUrl);
            }
            catch (error) {
                res.status(500).json({
                    status: ResponseStatus.ERROR,
                    message: 'Erro interno do servidor'
                });
            }
        };
        /**
         * Lista todos os links (para dashboard)
         * GET /api/links
         */
        this.getAllLinks = async (req, res) => {
            try {
                const links = await this.linkService.getAllLinks();
                const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
                const responseData = links.map(link => this.linkService.linkToResponseDTO(link, baseUrl));
                const response = {
                    status: ResponseStatus.SUCCESS,
                    message: 'Links recuperados com sucesso',
                    data: responseData
                };
                res.json(response);
            }
            catch (error) {
                res.status(500).json({
                    status: ResponseStatus.ERROR,
                    message: 'Erro ao buscar links'
                });
            }
        };
        this.linkService = new LinkService();
    }
}

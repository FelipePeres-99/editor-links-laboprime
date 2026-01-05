// src/controllers/LinkController.ts

import { Request, Response } from 'express';
import { LinkService } from '../services/LinkService.js';
import { CreateLinkDTO, ApiResponse, ResponseStatus } from '../models/Link.js';

export class LinkController {
  private linkService: LinkService;

  constructor() {
    // Use getInstance() em vez de new LinkService()
    this.linkService = LinkService.getInstance();
  }

  /**
   * Cria um novo link personalizado
   */
  createLink = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      console.log('📝 Rota POST /api/links acessada!');
      console.log('Body recebido:', req.body);

      const linkData: CreateLinkDTO = req.body;
      
      // Cria o link
      const newLink = await this.linkService.createLink(linkData);
      
      // Converte para DTO de resposta
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const responseData = this.linkService.linkToResponseDTO(newLink, baseUrl);

      const response: ApiResponse = {
        status: ResponseStatus.SUCCESS,
        message: 'Link criado com sucesso!',
        data: responseData
      };

      console.log('✅ Link criado:', newLink.customAlias);
      return res.status(201).json(response);

    } catch (error: any) {
      console.error('❌ Erro ao criar link:', error.message);
      
      const response: ApiResponse = {
        status: ResponseStatus.ERROR,
        message: error.message || 'Erro ao criar link',
        error: error.message
      };

      return res.status(400).json(response);
    }
  };

  /**
   * Lista todos os links
   */
  getAllLinks = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      console.log('📋 Rota GET /api/links acessada!');
      
      const links = await this.linkService.getAllLinks();
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      const responseData = links.map(link => 
        this.linkService.linkToResponseDTO(link, baseUrl)
      );

      const response: ApiResponse = {
        status: ResponseStatus.SUCCESS,
        message: 'Links recuperados com sucesso',
        data: responseData
      };

      console.log(`📊 Retornando ${links.length} links`);
      return res.json(response);

    } catch (error: any) {
      console.error('❌ Erro ao buscar links:', error.message);
      
      const response: ApiResponse = {
        status: ResponseStatus.ERROR,
        message: 'Erro ao buscar links',
        error: error.message
      };

      return res.status(500).json(response);
    }
  };

  /**
   * Redireciona para o link original
   */
  redirectLink = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { alias } = req.params;
      
      console.log(`🔗 Tentando redirecionar alias: "${alias}"`);
      
      // Busca o link
      const link = await this.linkService.getLinkByAlias(alias);
      
      if (!link) {
        console.log(`❌ Link não encontrado: "${alias}"`);
        
        const response: ApiResponse = {
          status: ResponseStatus.ERROR,
          message: 'Link não encontrado'
        };
        
        return res.status(404).json(response);
      }

      if (!link.isActive) {
        console.log(`⚠️ Link inativo: "${alias}"`);
        
        const response: ApiResponse = {
          status: ResponseStatus.ERROR,
          message: 'Link inativo'
        };
        
        return res.status(410).json(response);
      }

      // Incrementa contador
      await this.linkService.incrementClicks(alias);
      
      console.log(`✅ Redirecionando "${alias}" para: ${link.originalUrl}`);
      console.log(`📈 Cliques: ${link.clicks + 1}`);
      
      // Redireciona
      return res.redirect(302, link.originalUrl);

    } catch (error: any) {
      console.error('❌ Erro no redirecionamento:', error.message);
      
      const response: ApiResponse = {
        status: ResponseStatus.ERROR,
        message: 'Erro interno do servidor',
        error: error.message
      };

      return res.status(500).json(response);
    }
  };
}
// src/services/LinkService.ts

import { Link, CreateLinkDTO, LinkResponseDTO } from '../models/Link.js';
import { Validators } from '../utils/validators.js';
import { v4 as uuidv4 } from 'uuid';

export class LinkService {
  // Singleton - instância única
  private static instance: LinkService;
  private links: Map<string, Link> = new Map();

  private constructor() {
    console.log('🔧 LinkService instanciado');
  }

  // Método para obter a instância única
  public static getInstance(): LinkService {
    if (!LinkService.instance) {
      LinkService.instance = new LinkService();
      console.log('🆕 Nova instância do LinkService criada');
    } else {
      console.log('♻️ Reutilizando instância existente do LinkService');
    }
    return LinkService.instance;
  }

  /**
   * Cria um novo link personalizado
   */
  async createLink(linkData: CreateLinkDTO): Promise<Link> {
    console.log('🔧 [CREATE] Iniciando criação do link:', linkData);
    
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

    const aliasLower = linkData.customAlias.toLowerCase();
    console.log(`🔍 [CREATE] Verificando se alias '${aliasLower}' já existe...`);

    // Verifica se alias já existe
    if (this.links.has(aliasLower)) {
      console.log(`❌ [CREATE] Alias '${aliasLower}' já existe!`);
      throw new Error('Este alias já está em uso');
    }

    // Cria o link
    const newLink: Link = {
      id: uuidv4(),
      originalUrl: linkData.originalUrl,
      customAlias: aliasLower,
      title: Validators.sanitizeString(linkData.title),
      emoji: linkData.emoji,
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    // Salva no "banco" (Map)
    this.links.set(aliasLower, newLink);
    
    console.log(`💾 [CREATE] Link salvo com chave: '${aliasLower}'`);
    console.log(`📊 [CREATE] Total de links: ${this.links.size}`);
    console.log(`🔑 [CREATE] Todas as chaves:`, Array.from(this.links.keys()));
    
    // Teste imediato de busca
    const testFind = this.links.get(aliasLower);
    console.log(`🧪 [CREATE] Teste de busca imediata: ${testFind ? 'ENCONTRADO' : 'NÃO ENCONTRADO'}`);
    
    return newLink;
  }

  /**
   * Busca link pelo alias
   */
  async getLinkByAlias(alias: string): Promise<Link | undefined> {
    const aliasLower = alias.toLowerCase();
    
    console.log(`🔍 [SEARCH] Buscando alias: "${alias}" -> "${aliasLower}"`);
    console.log(`📊 [SEARCH] Total de links no Map: ${this.links.size}`);
    console.log(`🔑 [SEARCH] Chaves disponíveis:`, Array.from(this.links.keys()));
    
    const link = this.links.get(aliasLower);
    console.log(`📋 [SEARCH] Link encontrado:`, link ? 'SIM' : 'NÃO');
    
    if (link) {
      console.log(`✅ [SEARCH] Detalhes do link encontrado:`, {
        id: link.id,
        alias: link.customAlias,
        url: link.originalUrl,
        active: link.isActive
      });
    }
    
    return link;
  }

  /**
   * Incrementa contador de cliques
   */
  async incrementClicks(alias: string): Promise<void> {
    const aliasLower = alias.toLowerCase();
    const link = this.links.get(aliasLower);
    if (link && link.isActive) {
      link.clicks++;
      link.updatedAt = new Date();
      console.log(`📈 [CLICKS] Cliques incrementados para ${aliasLower}: ${link.clicks}`);
    } else {
      console.log(`❌ [CLICKS] Link não encontrado ou inativo: ${aliasLower}`);
    }
  }

  /**
   * Lista todos os links
   */
  async getAllLinks(): Promise<Link[]> {
    console.log(`📋 [LIST] Listando links. Total: ${this.links.size}`);
    console.log(`🔑 [LIST] Chaves:`, Array.from(this.links.keys()));
    return Array.from(this.links.values());
  }

  /**
   * Converte Link para DTO de resposta
   */
  linkToResponseDTO(link: Link, baseUrl: string): LinkResponseDTO {
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
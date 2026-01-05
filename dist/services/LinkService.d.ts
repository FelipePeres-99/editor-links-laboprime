import { Link, CreateLinkDTO, LinkResponseDTO } from '../models/Link';
export declare class LinkService {
    private links;
    /**
     * Cria um novo link personalizado
     */
    createLink(linkData: CreateLinkDTO): Promise<Link>;
    /**
     * Busca link pelo alias
     */
    getLinkByAlias(alias: string): Promise<Link | undefined>;
    /**
     * Incrementa contador de cliques
     */
    incrementClicks(alias: string): Promise<void>;
    /**
     * Lista todos os links
     */
    getAllLinks(): Promise<Link[]>;
    /**
     * Converte Link para DTO de resposta
     */
    linkToResponseDTO(link: Link, baseUrl: string): LinkResponseDTO;
}

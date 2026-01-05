import { Request, Response } from 'express';
export declare class LinkController {
    private linkService;
    constructor();
    /**
     * Cria um novo link personalizado
     * POST /api/links
     */
    createLink: (req: Request, res: Response) => Promise<void>;
    /**
     * Redireciona para o link original
     * GET /:alias
     */
    redirectLink: (req: Request, res: Response) => Promise<void>;
    /**
     * Lista todos os links (para dashboard)
     * GET /api/links
     */
    getAllLinks: (req: Request, res: Response) => Promise<void>;
}

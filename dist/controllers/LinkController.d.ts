import { Request, Response } from 'express';
export declare class LinkController {
    private linkService;
    constructor();
    /**
     * Cria um novo link personalizado
     */
    createLink: (req: Request, res: Response) => Promise<Response | void>;
    /**
     * Lista todos os links
     */
    getAllLinks: (req: Request, res: Response) => Promise<Response | void>;
    /**
     * Redireciona para o link original
     */
    redirectLink: (req: Request, res: Response) => Promise<Response | void>;
}

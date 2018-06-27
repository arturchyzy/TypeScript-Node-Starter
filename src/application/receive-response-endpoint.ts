import { NextFunction, Request, Response, Router } from 'express';
import { ReceiveResponseService } from '../infrastructure/scg/receive-response.service';

class ReceiveResponseEndpoint {
    readonly router: Router;
    private readonly receiveResponseService: ReceiveResponseService;

    constructor() {
        this.router = Router();
        this.init();
        this.receiveResponseService = new ReceiveResponseService();
    }

    private receiveResponse(req: Request, res: Response, next: NextFunction) {
        this.receiveResponseService.receiveResponse(req.body)
            .then(() => res.json({}));
    }


    private init() {
        this.router.post(
            '/',
            (req, res, next) => this.receiveResponse(req, res, next)
        );
    }
}

export default new ReceiveResponseEndpoint().router;

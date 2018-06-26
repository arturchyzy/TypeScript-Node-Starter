import { NextFunction, Request, Response, Router } from "express";
import { SendTextService } from "../infrastructure/scg/send-text.service";

class SendTextEndpoint {
    readonly router: Router;
    private readonly sendTextService: SendTextService;

    constructor() {
        this.router = Router();
        this.init();
        this.sendTextService = new SendTextService();
    }

    private sendText(req: Request, res: Response, next: NextFunction) {
        this.sendTextService.sendText(req.body.to, req.body.text);
        res.json({});
    }


    private init() {
        this.router.post(
            "/",
            (req, res, next) => this.sendText(req, res, next)
        );
    }
}

export default new SendTextEndpoint().router;

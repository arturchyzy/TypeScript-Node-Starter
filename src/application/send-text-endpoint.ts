import { NextFunction, Request, Response, Router } from 'express';

class SendTextEndpoint {
  readonly router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private sendText(req: Request, res: Response, next: NextFunction) {
      console.log("send");
    res.json({});
  }


  private init() {
    this.router.post(
      '/',
      (req, res, next) => this.sendText(req, res, next)
    );
  }
}

export default new SendTextEndpoint().router;

import * as express from 'express';
import { ErrorRequestHandler, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as nocache from 'node-nocache';
import * as cors from 'cors';
import { Request, Response } from 'express-serve-static-core';
import * as morgan from 'morgan';
import SendTextEndpoint from '../application/send-text-endpoint';
import ReceiveResponseEndpoint from '../application/receive-response-endpoint';

// tslint:disable-next-line no-any
export const errorHandler: ErrorRequestHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
    console.error(
        `Error \'${err.message}\' when handling request \'${req.method}: ${req.url}\' with params`, req.params, 'and body', req.body
    );
    res.status(500).send({});
    next(err);
};

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json({limit: '6mb'}));
        this.express.use(bodyParser.urlencoded({limit: '6mb', extended: true}));
        this.express.use(nocache as any);
        this.express.use(morgan('tiny'));
        const corsOptions = {
            origin: process.env.ALLOWED_DOMAIN,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true
        };
        this.express.use(cors(corsOptions));
        this.express.use(errorHandler);
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        const router = express.Router();
        // placeholder route handler
        router.get('/api/health-check', (req, res, next) => {
            res.json({
                message: 'I\'m doing fine'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/send-text', SendTextEndpoint);
        this.express.use('/api/receive-response', ReceiveResponseEndpoint);
    }
}

export default new App().express;

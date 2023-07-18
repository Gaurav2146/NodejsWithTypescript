import express, { Router } from 'express';
import * as bodyParser from 'body-parser';
import { ApiRouter } from './routes/ApiRouter';

class App {
    public app: express.Application;
    public port: number;

    constructor(routers: Array<ApiRouter>, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeRouters(routers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeRouters(routers: Array<ApiRouter>) {
        routers.forEach((router) => {
            this.app.use('/', router.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
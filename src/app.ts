import express, { Router } from 'express';
import * as bodyParser from 'body-parser';
import { ApiRouter } from './routes/ApiRouter';
import { DataSource } from "typeorm"

class App {
    public app: express.Application;
    public port: number;

    constructor(routers: Array<ApiRouter>, port: number) {
        this.app = express();
        this.port = port;
        this.initializeDatabase(routers);
    }
    
    private initializeDatabase(routers:Array<ApiRouter>)
    {
        const AppDataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Gau@9931",
            database: "typeORM",
            logging: true,
            synchronize: true,
            entities: [
                "./entity/*.ts"
            ],
        })
        
        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
                this.initializeMiddlewares();
                this.initializeRouters(routers);
            })
            .catch((err:Error) => {
                console.error("Error during Data Source initialization", err)
            })
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeRouters(routers: Array<ApiRouter>) {
        routers.forEach((router) => {
            this.app.use(router.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
import { DataSource } from "typeorm";

export class DatabaseFactory
{
    static AppDataSource : DataSource;

    private constructor()
    {}

    static setDataSource()
    {
        this.AppDataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "typeORM",
            logging: true,
            synchronize: true,
            entities: [
                "./src/entity/User.ts"
            ],
        })
        
        this.AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err:Error) => {
                console.error("Error during Data Source initialization", err)
            })

    }

}
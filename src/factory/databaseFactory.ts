import { DataSource } from "typeorm";

//Singleton object creation
export class DatabaseFactory
{
    private static AppDataSource : DataSource;

    private constructor()
    {}

    static setDataSource()
    {
        this.AppDataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Gau@9931",
            database: "typeORM",
            logging: true,
            synchronize: false,
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

    static getDataSource()
    {
        return this.AppDataSource;
    }

}
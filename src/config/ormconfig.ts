import { DataSourceOptions } from "typeorm";

export const configuration:DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Gau@9931",
    database: "typeORM",
    logging: true,
    logger: "file",
    synchronize: false,
    entities: [
        "./src/entity/*.ts"
    ]
}


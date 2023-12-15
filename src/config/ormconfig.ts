import { DataSourceOptions } from "typeorm";

export const configuration:DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Gau@9931",
    database: "typeORM",
    logging: true,
    logger: "advanced-console",
    synchronize: false,
    entities: [
        "./src/entity/ManyToMany/*.ts",
        "./src/entity/OneToMany/*.ts",
        "./src/entity/OneToOne/*.ts"
    ]
}


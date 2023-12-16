import { DataSourceOptions } from "typeorm";

export const configuration:DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "typeORM",
    logging: true,
    logger: "file",
    synchronize: true,
    entities: [
        "./src/entity/ManyToMany/*.ts",
        "./src/entity/OneToMany/*.ts",
        "./src/entity/OneToOne/*.ts"
    ]
}


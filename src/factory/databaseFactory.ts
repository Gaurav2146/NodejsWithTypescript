import { DataSource } from "typeorm";

export class DatabaseFactory
{
    static AppDataSource : DataSource;

    private constructor()
    {}

    static setDataSource(data:DataSource)
    {
        console.log(data , "setDataSource");
        this.AppDataSource = data;
    }

    static getDataSource():DataSource
    {
       return this.AppDataSource;
    }
}
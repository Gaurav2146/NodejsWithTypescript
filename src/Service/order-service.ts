import { EntityManager } from "typeorm";
import { User } from "../entity/User";
import {DatabaseFactory} from "../factory/databaseFactory";

export class OrderService{

async createOrder(name:string,price:number)
{
    try{
        const user1 = new User();
        user1.name = name;
        user1.price = price;

        const user2 = new User();
        user2.name = name;
        user2.price = price;

        const user3 = new User();
        user3.name = name;
        user3.price = price;

        // The following database drivers support the standard isolation levels 
        //(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE):
        // MySQL
        // Postgres
        // SQL Server

        //IMPLEMENTING TRANSACTION and ISOLATION LEVELS
        await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE" ,async (transactionalEntityManager:EntityManager) => {

            await transactionalEntityManager.save(user1);

            await transactionalEntityManager.save(user2);

        })

        // INSERTING DATA WITHOUT USING TRANSACTION
        return await DatabaseFactory.getDataSource().manager.save(user3);
        // return DatabaseFactory.AppDataSource.manager.create(User,{name:name,price:price});
    }catch(error)
    {
        throw new Error();
    }   
 }
}
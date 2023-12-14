import { EntityManager , QueryRunner } from "typeorm";
import { User } from "../entity/User";
import {DatabaseFactory} from "../factory/databaseFactory";
import {Category} from "../entity/Category ";
import {Question} from "../entity/Question";
let queryRunner:QueryRunner;

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
        // return await DatabaseFactory.getDataSource().manager.save(user3);
        // return DatabaseFactory.AppDataSource.manager.create(User,{name:name,price:price});
    }catch(error)
    {
        throw new Error();
    }   
 }

 //FETCHING RESULTS USING CUSTOM QUERY
 async getOrder()
 {
    try{
            queryRunner = DatabaseFactory.getDataSource().createQueryRunner();
            // establish real database connection using our new query runner
            await queryRunner.connect();

            //IMPLEMENTING TRANSACTION and ISOLATION LEVELS
            await queryRunner.startTransaction("SERIALIZABLE");
        
            await queryRunner.query('insert into user (name,price) values("Gaurav",135)');

            await queryRunner.query('insert into user (name,price) values("Gaurav1",136)');

            await queryRunner.query("Delete from user where price=135");

            await queryRunner.query("update user set name='Rahul' where price=136");

            //commit transaction now:
            await queryRunner.commitTransaction();

            // ALWAYS USE SELECT STATEMENT OUTSIDE TRANSACTION
            return await queryRunner.query("SELECT * FROM user");
    }catch(error:any)
    {
        await queryRunner.rollbackTransaction();
        throw new Error(error.message);
    }
    finally
    {
        await queryRunner.release();
    }
 }

 async insertCategoryAndQuenstions(question:Question,category:Category)
 {
    try{

        let result;

        await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE" ,async (transactionalEntityManager:EntityManager) => {
        
        result = await transactionalEntityManager.save(question);
    
        })

        return result;

    }catch(error:any)
    {
        throw new Error(error.message);
    }
 }

 async getCategoryAndQuenstions()
 {
    

 }

}
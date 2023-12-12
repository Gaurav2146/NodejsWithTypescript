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

        //IMPLEMENTING TRANSACTION and ISOLATION LEVELS
        return await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE" ,async (transactionalEntityManager) => {

            await transactionalEntityManager.save(user1);

            await transactionalEntityManager.save(user2);

        })

        // INSERTING DATA WITHOUT USING TRANSACTION
        // return await DatabaseFactory.getDataSource().manager.save(user1);
        // return DatabaseFactory.AppDataSource.manager.create(User,{name:name,price:price});

        }
        catch(error)
        {
            throw new Error();
        }
        
    }

}
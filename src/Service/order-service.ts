import { User } from "../entity/User";
import {DatabaseFactory} from "../factory/databaseFactory";

export class OrderService{

    async createOrder(name:string,price:number)
    {
        const user = new User();
        user.name = name;
        user.price = price;

        return await DatabaseFactory.getDataSource().manager.save(user);
        //return DatabaseFactory.AppDataSource.manager.create(User,{name:name,price:price});
    }

}
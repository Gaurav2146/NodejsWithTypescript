
import { container } from "tsyringe";
import { User } from "../entity/User-entity";
import { DataSource } from "typeorm";
const AppDataSource = container.resolve(DataSource);

export class OrderService{

    async createOrder(name:string,price:number)
    {
        const user = new User();
        user.name = name;
        user.price = price;

        //return await AppDataSource.manager.save(user);
        return AppDataSource.manager.create(User,{name:name,price:price});
    }

}
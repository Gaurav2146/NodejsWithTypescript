import { NextFunction, Request, Response } from "express";
import 'reflect-metadata';
import { autoInjectable, container } from "tsyringe";
import {OrderService} from "../Service/order-service";
const orderService = new OrderService();

@autoInjectable()
class OrderController {
    name: string;
    static id: number = 5;

    constructor(name: string) {
        this.name = name;
    }

    static getId() {
        return this.id;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getId(): string {
        return this.getName();
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            let name = this.getId();
            let id = OrderController.getId();
            
            let order = await orderService.createOrder("Burger",149);
            res.status(200).json({ order : order });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }
}

//Registering container which is dependent on primitive value
// This will work what @Bean annotation was doing in java for creation
// of custom objects and registering it to IOC container
container.registerInstance(OrderController, new OrderController("Raghav"))

export {
    OrderController
}
import 'reflect-metadata';
import { container, autoInjectable } from 'tsyringe';
import { OrderRouter } from '../routes/order-route';

@autoInjectable()
export class Factory {

    constructor() { }

    getOrderRouter() {
        const orderRouter = container.resolve(OrderRouter);
        return orderRouter
    }
}


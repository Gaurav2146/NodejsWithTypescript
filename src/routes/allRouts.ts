import { ApiRouter } from "./ApiRouter";
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Factory } from '../factory/factory';

const factory = container.resolve(Factory);
const orderRouter = factory.getOrderRouter();

class AllRoutes {
    routes: Array<ApiRouter>;
    constructor(routes: Array<ApiRouter>) {
        this.routes = routes;
    }
}

let allRoutes: AllRoutes = new AllRoutes
    ([
        orderRouter
    ]);

export {
    allRoutes
}
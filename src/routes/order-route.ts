import { OrderController } from "../controller/order-controller";
import { Router, Request, Response, NextFunction } from 'express';
export class OrderRouter {
    router: Router
    private orderController: OrderController

    constructor(orderController: OrderController) {
        this.router = Router();
        this.orderController = orderController;
        this.init();
    }

    private init() {
        this.router.get('/create-order',
            (req: Request, res: Response, next: NextFunction) => this.orderController.createOrder(req, res, next))
    }
}


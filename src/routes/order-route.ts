import { OrderController } from "../controller/order-controller";
import { Router, Request, Response, NextFunction } from 'express';
import { ApiRouter } from './ApiRouter';
import 'reflect-metadata';
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class OrderRouter implements ApiRouter {
    router: Router
    private orderController: OrderController

    constructor(orderController: OrderController) {
        this.router = Router();
        this.orderController = orderController;
        this.init();
    }

    private init() {
        
        this.router.get('/order/create-order',
            (req: Request, res: Response, next: NextFunction) => this.orderController.createOrder(req, res, next))

        this.router.get('/order/get-order',
            (req: Request, res: Response, next: NextFunction) => this.orderController.getOrder(req, res, next)) 
            
        this.router.post('/order/insertCategoryAndQuenstions',
            (req: Request, res: Response, next: NextFunction) => this.orderController.insertCategoryAndQuenstions(req, res, next))    
        
        this.router.get('/order/getCategoryAndQuenstions',
            (req: Request, res: Response, next: NextFunction) => this.orderController.getCategoryAndQuenstions(req, res, next))

        this.router.delete('/order/deleteCategoryAndQuenstions',
            (req: Request, res: Response, next: NextFunction) => this.orderController.deleteCategoryAndQuenstions(req, res, next))    

        this.router.get('/order/getAllUser',
            (req: Request, res: Response, next: NextFunction) => this.orderController.getAllUser(req, res, next))

        this.router.post('/order/insertStudentAndSubject',
            (req: Request, res: Response, next: NextFunction) => this.orderController.insertStudentAndSubject(req, res, next)) 
            
        this.router.get('/order/getStudentAndSubject/:studentName',
            (req: Request, res: Response, next: NextFunction) => this.orderController.getStudentAndSubject(req, res, next))
        
        this.router.get('/order/getStudent/:studentName',
            (req: Request, res: Response, next: NextFunction) => this.orderController.getStudent(req, res, next))

        this.router.delete('/order/deleteStudent/:studentName',
            (req: Request, res: Response, next: NextFunction) => this.orderController.deleteStudent(req, res, next))
            
    }
}


import { NextFunction, Request, Response } from "express";
import 'reflect-metadata';
import { autoInjectable, container } from "tsyringe";
import { OrderService } from "../Service/order-service";
const orderService = new OrderService();
import { Category } from "../entity/ManyToMany/Category ";
import { Question } from "../entity/ManyToMany/Question";

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

            let order = await orderService.createOrder("Burger", "Male");
            res.status(200).json({ order: order });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async getOrder(req: Request, res: Response, next: NextFunction) {
        try {

            let order = await orderService.getOrder();
            res.status(200).json({ order: order });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async insertCategoryAndQuenstions(req: Request, res: Response, next: NextFunction) {
        try {

            let { name, title, text } = req.body;

            let question = new Question();
            question.text = text;
            question.title = title;

            let category = new Category();
            category.name = name;

            question.categories = new Array(category);

            let result = await orderService.insertCategoryAndQuenstions(question, category);
            res.status(200).json({ result: result });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async getCategoryAndQuenstions(req: Request, res: Response, next: NextFunction) {
        try {
            let { questionId } = req.query;

            let result = await orderService.getCategoryAndQuenstions(Number(questionId));
            res.status(200).json({ result: result });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            let result = await orderService.getAllUser();
            res.status(200).json({ result: result });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async insertStudentAndSubject(req: Request, res: Response, next: NextFunction) {
        try {
            let {studentName, subjectName} = req.body;
            let result = await orderService.insertStudentAndSubject(studentName,subjectName);
            res.status(200).json({ result: result });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async getStudentAndSubject(req: Request, res: Response, next: NextFunction) {
        try {
            let {studentName} = req.params;
            let result = await orderService.getStudentAndSubject(studentName);
            res.status(200).json({ result: result });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }

    async getStudent(req: Request, res: Response, next: NextFunction) {
        try {
            let {studentName} = req.params;
            let result = await orderService.getStudent(studentName);
            res.status(200).json({ result: result });
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
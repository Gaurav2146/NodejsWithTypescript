import { NextFunction, Request, Response } from "express";

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
        this.setName("Gaurav");
        return this.getName();
    }

    createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            let name = this.getId();
            let id = OrderController.getId();
            res.status(200).json({ name: name, id: id });
        }
        catch (error) {
            console.log("Catch ERROR")
            next(error);
        }
    }
}

export {
    OrderController
}
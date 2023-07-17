import { NextFunction, Request, Response } from "express";

class OrderController {

    constructor() { }

    createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("create order called");
            res.status(200).json({ success: true });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export {
    OrderController
}
import express, { Request, Response } from "express";
const orderRouter = express.Router();
import { OrderController } from "../controller/order-controller";

//Routes
orderRouter.get('/create-order', (new OrderController()).createOrder)

export {
    orderRouter
}
import express, { NextFunction, Request, Response } from "express";
const app = express();
import { OrderRouter } from "./routes/order-route";
import { OrderController } from "./controller/order-controller";

//APIs
app.use('/order', new OrderRouter(new OrderController("Rahul")).router);

//Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, "error");
    if (err) {
        res.status(500).json({ message: err.message })
    }
})


app.listen(3000, () => {
    console.log("port running on port 3000");
})


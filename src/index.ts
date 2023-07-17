import express, { Request, Response } from "express";
const app = express();
import { orderRouter } from "./routes/order-route";

app.get('/create-order', orderRouter);

app.listen(3000, () => {
    console.log("port running on port 3000");
})
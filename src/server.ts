import App from './app';
import { OrderController } from './controller/order-controller';
import { OrderRouter } from './routes/order-route';


const app = new App(
    [
        new OrderRouter(new OrderController("Rahul")),
    ],
    4000,
);

app.listen();
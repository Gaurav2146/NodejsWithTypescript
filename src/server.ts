import App from './app';
import { allRoutes } from './routes/allRouts';

const app = new App(
    allRoutes.routes,
    4000,
);

app.listen();
import { Router } from 'express';

import dealsRouter from './deals.routes';
import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/deals', dealsRouter);
routes.use('/orders', ordersRouter);

export default routes;

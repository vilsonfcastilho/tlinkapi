import { Router } from 'express';

import dealsRouter from './deals.routes';
import ordersRouter from './orders.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    api: 'Test LinkAPi',
    repository: 'https://github.com/vilsonfcastilho/tlinkapi',
    endpoints: [
      {
        route: '[GET] /deals',
        description: 'Retorna todos as Deals do Pipedrive.',
      },
      {
        route: '[GET] /orders/list',
        description: 'Retorna todas as Orders recebidas pelo Bling',
      },
      {
        route: '[POST] /orders/create',
        description:
          'Tranforma todas as Deals do Pipedrive em Orders e enviam como pedido no Bling.',
      },
    ],
  });
});

routes.use('/deals', dealsRouter);
routes.use('/orders', ordersRouter);

export default routes;

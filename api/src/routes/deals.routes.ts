import { Router } from 'express';

import pipedriveApi from '../services/pipedriveApi';
import { pipedriveToken } from '../config/tokens';

const dealsRouter = Router();

dealsRouter.get('/wonlist', async (req, res) => {
  try {
    // getting all deals with won status
    const dealsWon = await pipedriveApi.get(
      `/deals?status=won&start=0&api_token=${pipedriveToken.api_token}`,
    );

    const { data } = dealsWon.data;

    return res.json(data);
  } catch (err) {
    return res.json({ err: 'Erro ao listar Deals com status Won.' });
  }
});

export default dealsRouter;

import { Router } from 'express';
import utf8 from 'utf8';

import pipedriveApi from '../services/pipedriveApi';
import blingApi from '../services/blingApi';
import { pipedriveToken, blingToken } from '../config/tokens';

import createOrder from '../utils/createOrder';

const ordersRouter = Router();

ordersRouter.get('/list', async (req, res) => {
  try {
    // Pegando todas os pedidos do Bling
    const orders = await blingApi.get(
      `/pedidos/json?apikey=${blingToken.apikey}`,
    );

    return res.json(orders.data);
  } catch {
    return res.json({ message: 'Não foi possível litsar as orders.' });
  }
});

ordersRouter.post('/create', async (req, res) => {
  try {
    // Pegando todas as deals com status won do Pipedrive
    const dealsWon = await pipedriveApi.get(
      `/deals?status=won&start=0&api_token=${pipedriveToken.api_token}`,
    );

    // Salvando todas as deals em data
    const { data } = dealsWon.data;

    // Formatando as deals para enviar no padrão do Bling
    const deals = data.map(deal => ({
      pedido: {
        numero: deal.id,
        cliente: {
          nome: deal.org_name,
          cpf_cnpj: '00.000.000/0000-1',
          endereco: deal.org_id.address,
          numero: '000',
          bairro: 'Cidade Alta',
          cep: '95.700-000',
          cidade: 'Bento Gonçalves',
          uf: 'RS',
        },
        volume: {
          servico: deal.title,
        },
        item: {
          codigo: 185,
          descricao: deal.title,
          un: 'Pç',
          qtde: deal.products_count,
          vlr_unit: 100,
        },
        parcela: {
          vlr: deal.value,
        },
      },
    }));

    // Convertendo os pedidos do Pipedrive em xml
    const dataXml = createOrder(deals);

    // Criando o pedido no Bling
    const order = await blingApi.post(
      utf8.encode(`/pedido/json?apikey=${blingToken.apikey}&xml=${dataXml}`),
    );

    return res.json(order.data);
  } catch {
    return res.json({ message: 'Não foi possível criar a Order.' });
  }
});

export default ordersRouter;

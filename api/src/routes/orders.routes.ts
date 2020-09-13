import { Router } from 'express';

import pipedriveApi from '../services/pipedriveApi';
import blingApi from '../services/blingApi';
import { pipedriveToken, blingToken } from '../config/tokens';

import createOrder from '../utils/createOrder';

const ordersRouter = Router();

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
        numero: 1, // deal.id
        cliente: {
          nome: 'Empresa X', // deal.org_name
          cpf_cnpj: '00.000.000/0000-1',
          endereco: 'Rua Visconde de São Gabriel', // deal.org_id.address
          numero: '000',
          bairro: 'Cidade Alta',
          cep: '95.700-000',
          cidade: 'Bento Gonçalves',
          uf: 'RS',
        },
        volume: {
          servico: 'Venda de produto X', // deal.title
        },
        item: {
          codigo: 185,
          descricao: 'Venda de produto X', // deal.title
          un: 'Pç',
          qtde: 300, // deal.products_count
          vlr_unit: 10,
        },
        parcela: {
          vlr: 3000, // deal.value
        },
      },
    }));

    // Convertendo os pedidos do Pipedrive em xml
    const dataXml = createOrder(deals);

    const order = await blingApi.post(
      `/pedido/json?apikey=${blingToken.apikey}&xml=${dataXml}`,
    );

    console.log(order);

    return res.json({ message: 'order' });
  } catch {
    return res.json({ message: 'Não foi possível criar a Order.' });
  }
});

export default ordersRouter;

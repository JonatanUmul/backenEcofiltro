import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { getSapSession } from './sapSession.js';

const httpsAgent = new https.Agent({
  ca: fs.readFileSync(path.resolve('certs/fullchain.pem')),
  rejectUnauthorized: true
});

export const OtpSAP = async (req, res) => {
  const { sessionId, routeId } = getSapSession();
  const {payload} = req.body;
console.log('Orden de produccion otp',payload)
  if (!sessionId) {
    return res.status(401).json({ error: 'No hay sesión activa en SAP' });
  }

  const cookies = [`B1SESSION=${sessionId}`];
  if (routeId) cookies.push(routeId);

  try {
    const queryUrl = `https://sapsl.eco-aplicaciones.com:50000/b1s/v1/ProductionOrders`;
//  const queryUrl = `https://sapsl.eco-aplicaciones.com:50000/b1s/v1/ProductionOrders?$filter=(ProductionOrderStatus eq 'boposPlanned' or ProductionOrderStatus eq 'boposReleased') and (substringof('PP500', ItemNo) or substringof('MP1000', ItemNo))`;

    const response = await axios.post(queryUrl, payload,
        {
      httpsAgent,
      headers: {
        'Cookie': cookies.join('; ')
      }
    });

    res.status(200).json(response.data);
console.log(response.data)
  } catch (error) {
    console.error('Error al consultar órdenes:', error.message);
    res.status(500).json({ error: 'No se pudo consultar órdenes en SAP' });
  }
};

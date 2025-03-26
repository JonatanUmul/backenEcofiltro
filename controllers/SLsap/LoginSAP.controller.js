import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { setSapSession } from './Orders/sapSession.js'; // ajustá el path si es necesario

const httpsAgent = new https.Agent({
  ca: fs.readFileSync(path.resolve('certs/fullchain.pem')),
  rejectUnauthorized: true
});



export const LoginSAP = async (req, res) => {
  const { username, password } = req.body;
console.log('Datos obtenidos para Sap',username,password)
  const body = {
    CompanyDB: "SBO_ECOFILTRO_RIQRA",
    Password: password,
    UserName: username,
    Language: "25"
  };

  try {
    const response = await axios.post(
      'https://sapsl.eco-aplicaciones.com:50000/b1s/v1/Login',
      body,
      {
        httpsAgent,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
    );
   
    console.log('Intentando login SAP con:', response.data);
    const sessionId = response.data.SessionId;
    const routeCookie = response.headers['set-cookie']?.find(c => c.includes('ROUTEID'));
    const routeId = routeCookie ? routeCookie.split(';')[0] : null;

    // 🔐 Guardar sesión
    setSapSession(sessionId, routeId);

    res.status(200).json({ message: 'Sesión iniciada correctamente',sessionId });
  } catch (error) {
    console.error('Error al iniciar sesión en SAP:', error.message);
    res.status(500).json({ error: 'No se pudo iniciar sesión en SAP' });
  }
};

// console.log("Script iniciado");

// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';
// import { pool } from "../src/db.js";
// import { formatFecha } from './FormatearFecta.js';

// dotenv.config();

// // Configuración de correo
// // const emailsend = process.env.EMAIL_SEND;
// // const passEmail = process.env.EMAIL_PASS;
// // const emailFrom = process.env.EMAIL_FROM;

// const emailsend = 'jumul@ecofiltro.com';
// const passEmail = 'pytu vtny qjpk rcfv';
// const emailFrom = 'no-reply@ecofiltro.com';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: emailsend,
//     pass: passEmail
//   }
// });

// export const postSendEmail = async (registro) => {
//   const {
//     operario, trabajoRealizado, fecha, interesados, tabla, id, id_modelo, id_turno, id_horno,
//     codigoInicio, id_OTHH, codigoFin, horneado, mermasCrudas, librasBarro, librasAserrin,
//     fechaHorneado, fechaCC, turnoHorneado, aserradero, tipocernido1, tipocernido2, librasAserrin2,
//     ModeloEco, formula, Horno, Hornero, aprobados, altos, bajos, rajadosCC, crudoCC, quemados,
//     ahumados, mermas_hornos, total, EncargadoCC, porcentaje, idjefe, idJefe, NobreJefe, firmaJefe,
//     idEncargado, NombreEncargado, CabezaIz, PieIZ, cabezaDr, PieDr, promedioTMP
//   } = registro;

//   if (!ModeloEco || !Horno || !Hornero || !horneado || !aprobados || !EncargadoCC) {
//     return { success: false, error: 'Datos faltantes o nulos' };
//   }

//   const subject = `Reporte Control de Calidad ${porcentaje}: ${Horno} Fecha de Horneado: ${formatFecha(fechaHorneado)}`;
//   const text = `
//     Reporte de Control de Calidad

//     Detalles del Registro:
//     -----------------------------------------
    
//     - Modelo: ${ModeloEco}
//     - Código Inicio: ${codigoInicio}
//     - Código Fin: ${codigoFin}
//     - Turno: ${turnoHorneado}
//     - Horno: ${Horno}
//     - Hornero: ${Hornero}
//     - Horneado: ${horneado}
    
//     Datos de Temperatura:
    
//     -Temperatura Cabeza Derecha: ${cabezaDr}
//     -Temperatura Pie Derecho: ${PieDr}
//     -Temperatura Cabeza Izquierda: ${CabezaIz}
//     -Temperatura Pie Izquierda: ${PieIZ}
//     -Promedio Temperatura: ${promedioTMP}

//     Resultados:
//     - Aprobados: ${aprobados}
//     - Rajados CC: ${rajadosCC}
//     - Crudos CC: ${crudoCC}
//     - Altos: ${altos}
//     - Bajos: ${bajos}
//     - Quemados: ${quemados}
//     - Ahumados: ${ahumados}
//     - Mermas Hornos: ${mermas_hornos}
//     - Encargado de CC: ${EncargadoCC}
//     Porcentaje de Aprobación: ${porcentaje}

//     -----------------------------------------
//     Este es un mensaje automático, por favor no responder.
//   `;

//   const mailOptions = {
//     from: `"Ecofiltro" <${emailFrom}>`,
//     to: emailsend,
//     bcc: [
//       'codigos@ecofiltro.com',
//       'ddelacruz@ecofiltro.com',
//       'soporte.produccion@ecofiltro.com',
//       'smunoz@ecofiltro.com',
//       'gestion@ecofiltro.com',
//       'yriddle@ecofiltro.com',
//       'ngalicia@ecofiltro.com',
//       'jparagon@ecofiltrogt.onmicrosoft.com'
//     ],
//     subject,
//     text
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Correo enviado exitosamente:", info.response);
//     return { success: true, id };
//   } catch (error) {
//     console.error('Error al enviar correo:', error);
//     return { success: false, error };
//   }
// };

// setInterval(async () => {
//   console.log('Ejecutando el cronómetro...');

//   try {
//     const result = await pool.query(`
//         WITH MaxTemperaturas AS (
//     SELECT
//         dth.fecha_real,
//         dth.id_horno,
//         dth.id_modelo,
//         dth.id_turno,
//         MAX(dth.tempCabezaIZ) AS max_tempCabezaIZ,
//         MAX(dth.tempPieIZ) AS max_tempPieIZ,
//         MAX(dth.tempCabezaDR) AS max_tempCabezaDR,
//         MAX(dth.tempPieDR) AS max_tempPieDR
//     FROM
//         dth
//     GROUP BY
//         dth.fecha_real,
//         dth.id_horno,
//         dth.id_modelo,
//         dth.id_turno
// )
// SELECT 

//         'dtcc' as tabla,
//         d.id,
//         dtcc.id_dthh,
//         d.id_modelo,
//         d.id_turno,
//         d.id_horno,
//         d.codigoInicio,
//         d.id_OTHH,
//         d.codigoFin,
//         d.horneado,
//         d.mermasCrudas,
//         d.librasBarro,
//         d.librasAserrin,
//         d.fecha_creacion AS fechaHorneado,
//         dtcc.fecha_creacion AS fechaCC,
//         turno.turno AS turnoHorneado,
//         aserradero.nombre_aserradero AS aserradero,
//         tipocernido.tipoCernido AS tipocernido1,
//         tipocernido2.tipoCernido AS tipocernido2,
//         d.librasAserrin2,
//         ufmodelo.nombre_modelo AS ModeloEco,
//         COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0) AS formula,
//         enc_maq.nombre_maq AS Horno,
//         operarios.Nombre AS Hornero,
//         dtcc.aprobados,
//         dtcc.altos,
//         dtcc.bajos,
//         dtcc.rajadosCC,
//         dtcc.crudoCC,
//         dtcc.quemados,
//         dtcc.ahumados,
//         dtcc.mermas_hornos,
//         COALESCE(dtcc.aprobados+dtcc.altos+dtcc.bajos+dtcc.rajadosCC+dtcc.crudoCC+dtcc.quemados+dtcc.ahumados+dtcc.mermas_hornos) AS total,
//         operarios1.Nombre AS EncargadoCC,
//         CONCAT(ROUND((dtcc.aprobados / d.horneado * 100), 0), '%') AS porcentaje,
//         othh.id_creador AS idjefe,
//         user.nombre AS idJefe,
//         operarios2.Nombre AS NobreJefe,
//         userFEncargado.nombre AS idEncargado,
//         operariosFencargado.Nombre AS NombreEncargado,
//         tm.max_tempCabezaIZ AS CabezaIz,
//         tm.max_tempPieIZ AS PieIZ,
//         tm.max_tempCabezaDR  AS cabezaDr,
//          tm.max_tempPieDR AS PieDr,
//              ROUND((tm.max_tempCabezaIZ + tm.max_tempPieIZ + tm.max_tempCabezaDR + tm.max_tempPieDR) / 4) AS promedioTMP
//       FROM dthh d
//       LEFT JOIN turno ON d.id_turno = turno.id
//       LEFT JOIN aserradero ON d.id_aserradero = aserradero.id
//       LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
//       LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
//       LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
//       LEFT JOIN enc_maq ON d.id_horno = enc_maq.id_maq
//       LEFT JOIN operarios ON d.id_hornero = operarios.id
//       LEFT JOIN dtcc ON d.id = dtcc.id_dthh
//       LEFT JOIN operarios AS operarios1 ON dtcc.id_operarioCC=operarios1.id
//       LEFT JOIN othh ON d.id_OTHH= othh.id
//       LEFT JOIN user ON othh.id_creador=user.id
//       LEFT JOIN operarios AS operarios2 ON user.nombre = operarios2.id
//       LEFT JOIN user AS userFirma ON othh.id_creador=userFirma.id
//       LEFT JOIN user as userFEncargado ON d.id_creador= userFEncargado.id
//       LEFT JOIN operarios AS operariosFencargado ON userFEncargado.nombre= operariosFencargado.id
//       LEFT JOIN user AS userEfirma ON userFEncargado.nombre= userEfirma.nombre
//       LEFT JOIN MaxTemperaturas tm ON tm.id_turno=d.id_turno and tm.id_modelo=d.id_modelo AND tm.id_horno=d.id_horno AND tm.fecha_real=d.fecha_creacion
//       WHERE dtcc.enviado = 0
//     `);

//     const rows = result[0];

//     console.log('Registros obtenidos:', rows.length);

//     if (rows.length === 0) {
//       console.log('No hay registros nuevos para procesar.');
//     }

//     for (const registro of rows) {
//       try {
//         const result = await postSendEmail(registro);
//         if (result.success) {
//           await pool.query('UPDATE dtcc SET enviado = 1 WHERE id_dthh = ?', [registro.id]);
//           console.log(`Registro con ID ${registro.id} marcado como enviado.`);
//         }
//       } catch (error) {
//         console.error(`Error al enviar correo para el registro con ID ${registro.id}:`, error);
//       }
//     }
//   } catch (error) {
//     console.error('Error al monitorear la tabla de logs:', error);
//   }
// }, 30000);



console.log("Script iniciado");

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { pool } from "../src/db.js";
import { formatFecha } from './FormatearFecta.js';

dotenv.config();

// Configuración de correo
const emailsend = 'jumul@ecofiltro.com';
const passEmail = 'pytu vtny qjpk rcfv';
const emailFrom = 'no-reply@ecofiltro.com';

// Configuración de Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// Función para analizar el reporte usando Gemini
async function analizarConGemini(texto) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          { text: `Dame un analisis no tan grande de lo siguiente: Eres un experto en procesos de horneado del Ecofiltros. Analiza el siguiente reporte de calidad como si evaluaras una horneada donde se fabrican filtros a base de barro, aserrín.

          Considera que durante la cocción se debe formar una capa de carbón activado en el interior del filtro, como se muestra en la imagen, y que esto solo ocurre si el horneado es correcto. El rango óptimo de temperatura para modelos de 20 litros es entre 690°C y 730°C, y para Mini filtros es de 670°C a 730°C.
          
          Evalúa si las temperaturas alcanzadas, junto con los resultados (aprobados, rajados, crudos, Altos(Se refiere a fitros que tienden a filtrar muy rapido el agua lo ideal es de 700ml a 1600ml)Bajos quiere decir que filtraron muy poco de 600ml para abajo.), indican una cocción adecuada. Identifica posibles errores (como baja o alta temperatura, mala distribución del calor, fallos en la carga del horno, entre otros) y proporciona recomendaciones técnicas para mejorar la calidad.
          
          A continuación, analiza el siguiente reporte:\n\n${texto}` }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return output || 'No se pudo generar análisis.';
  } catch (error) {
    console.error('Error al analizar con Gemini:', error.response?.data || error.message);
    return 'Error al generar análisis.';
  }
}

// Función para enviar correo
export const postSendEmail = async (registro, analisisGemini) => {
  const {
    operario, trabajoRealizado, fecha, interesados, tabla, id, id_modelo, id_turno, id_horno,
    codigoInicio, id_OTHH, codigoFin, horneado, mermasCrudas, librasBarro, librasAserrin,
    fechaHorneado, fechaCC, turnoHorneado, aserradero, tipocernido1, tipocernido2, librasAserrin2,
    ModeloEco, formula, Horno, Hornero, aprobados, altos, bajos, rajadosCC, crudoCC, quemados,
    ahumados, mermas_hornos, total, EncargadoCC, porcentaje, idjefe, idJefe, NobreJefe, firmaJefe,
    idEncargado, NombreEncargado, CabezaIz, PieIZ, cabezaDr, PieDr, promedioTMP
  } = registro;

  if (!ModeloEco || !Horno || !Hornero || !horneado || !aprobados || !EncargadoCC) {
    return { success: false, error: 'Datos faltantes o nulos' };
  }

  const subject = `Reporte Control de Calidad ${porcentaje}: ${Horno} Fecha de Horneado: ${formatFecha(fechaHorneado)}`;
  const text = `
Reporte de Control de Calidad
-----------------------------------------

Modelo: ${ModeloEco}
Código Inicio: ${codigoInicio}
Código Fin: ${codigoFin}
Turno: ${turnoHorneado}
Horno: ${Horno}
Hornero: ${Hornero}
Horneado: ${horneado}

Temperaturas:
- Cabeza Derecha: ${cabezaDr}
- Pie Derecho: ${PieDr}
- Cabeza Izquierda: ${CabezaIz}
- Pie Izquierda: ${PieIZ}
- Promedio Temperatura: ${promedioTMP}

Resultados:
- Aprobados: ${aprobados}
- Rajados CC: ${rajadosCC}
- Crudos CC: ${crudoCC}
- Altos: ${altos}
- Bajos: ${bajos}
- Quemados: ${quemados}
- Ahumados: ${ahumados}
- Mermas Hornos: ${mermas_hornos}
- Total: ${total}
- Encargado CC: ${EncargadoCC}
- Porcentaje Aprobación: ${porcentaje}

-----------------------------------------
ANÁLISIS AUTOMÁTICO DEL REPORTE:
${analisisGemini}

-----------------------------------------
Este es un mensaje automático, por favor no responder.
`;

  const mailOptions = {
    from: `"Ecofiltro" <${emailFrom}>`,
    to: emailsend,
    bcc: [
            'codigos@ecofiltro.com',
            'ddelacruz@ecofiltro.com',
            'soporte.produccion@ecofiltro.com',
            'smunoz@ecofiltro.com',
            'gestion@ecofiltro.com',
            'yriddle@ecofiltro.com',
            'ngalicia@ecofiltro.com',
            'jparagon@ecofiltrogt.onmicrosoft.com'
          ],
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente:", info.response);
    return { success: true, id };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error };
  }
};

// Configurar transporter de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailsend,
    pass: passEmail
  }
});

// Monitoreo de la base de datos
setInterval(async () => {
  console.log('Ejecutando el cronómetro...');

  try {
    const result = await pool.query(`
        WITH MaxTemperaturas AS (
            SELECT
                dth.fecha_real,
                dth.id_horno,
                dth.id_modelo,
                dth.id_turno,
                MAX(dth.tempCabezaIZ) AS max_tempCabezaIZ,
                MAX(dth.tempPieIZ) AS max_tempPieIZ,
                MAX(dth.tempCabezaDR) AS max_tempCabezaDR,
                MAX(dth.tempPieDR) AS max_tempPieDR
            FROM dth
            GROUP BY dth.fecha_real, dth.id_horno, dth.id_modelo, dth.id_turno
        )
        SELECT 
            'dtcc' as tabla,
            d.id,
            dtcc.id_dthh,
            d.id_modelo,
            d.id_turno,
            d.id_horno,
            d.codigoInicio,
            d.id_OTHH,
            d.codigoFin,
            d.horneado,
            d.mermasCrudas,
            d.librasBarro,
            d.librasAserrin,
            d.fecha_creacion AS fechaHorneado,
            dtcc.fecha_creacion AS fechaCC,
            turno.turno AS turnoHorneado,
            aserradero.nombre_aserradero AS aserradero,
            tipocernido.tipoCernido AS tipocernido1,
            tipocernido2.tipoCernido AS tipocernido2,
            d.librasAserrin2,
            ufmodelo.nombre_modelo AS ModeloEco,
            COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0) AS formula,
            enc_maq.nombre_maq AS Horno,
            operarios.Nombre AS Hornero,
            dtcc.aprobados,
            dtcc.altos,
            dtcc.bajos,
            dtcc.rajadosCC,
            dtcc.crudoCC,
            dtcc.quemados,
            dtcc.ahumados,
            dtcc.mermas_hornos,
            COALESCE(dtcc.aprobados+dtcc.altos+dtcc.bajos+dtcc.rajadosCC+dtcc.crudoCC+dtcc.quemados+dtcc.ahumados+dtcc.mermas_hornos) AS total,
            operarios1.Nombre AS EncargadoCC,
            CONCAT(ROUND((dtcc.aprobados / d.horneado * 100), 0), '%') AS porcentaje,
            othh.id_creador AS idjefe,
            user.nombre AS idJefe,
            operarios2.Nombre AS NobreJefe,
            userFEncargado.nombre AS idEncargado,
            operariosFencargado.Nombre AS NombreEncargado,
            tm.max_tempCabezaIZ AS CabezaIz,
            tm.max_tempPieIZ AS PieIZ,
            tm.max_tempCabezaDR AS cabezaDr,
            tm.max_tempPieDR AS PieDr,
            ROUND((tm.max_tempCabezaIZ + tm.max_tempPieIZ + tm.max_tempCabezaDR + tm.max_tempPieDR) / 4) AS promedioTMP
        FROM dthh d
        LEFT JOIN turno ON d.id_turno = turno.id
        LEFT JOIN aserradero ON d.id_aserradero = aserradero.id
        LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
        LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
        LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
        LEFT JOIN enc_maq ON d.id_horno = enc_maq.id_maq
        LEFT JOIN operarios ON d.id_hornero = operarios.id
        LEFT JOIN dtcc ON d.id = dtcc.id_dthh
        LEFT JOIN operarios AS operarios1 ON dtcc.id_operarioCC = operarios1.id
        LEFT JOIN othh ON d.id_OTHH = othh.id
        LEFT JOIN user ON othh.id_creador = user.id
        LEFT JOIN operarios AS operarios2 ON user.nombre = operarios2.id
        LEFT JOIN user AS userFirma ON othh.id_creador = userFirma.id
        LEFT JOIN user AS userFEncargado ON d.id_creador = userFEncargado.id
        LEFT JOIN operarios AS operariosFencargado ON userFEncargado.nombre = operariosFencargado.id
        LEFT JOIN user AS userEfirma ON userFEncargado.nombre = userEfirma.nombre
        LEFT JOIN MaxTemperaturas tm ON tm.id_turno = d.id_turno AND tm.id_modelo = d.id_modelo AND tm.id_horno = d.id_horno AND tm.fecha_real = d.fecha_creacion
        WHERE dtcc.enviado = 0
    `);

    const rows = result[0];

    console.log('Registros obtenidos:', rows.length);

    if (rows.length === 0) {
      console.log('No hay registros nuevos para procesar.');
      return;
    }

    for (const registro of rows) {
      try {
        // Preparar texto del reporte para analizar
        const textoReporte = `
Modelo: ${registro.ModeloEco}
Turno: ${registro.turnoHorneado}
Horno: ${registro.Horno}
Hornero: ${registro.Hornero}
Aprobados: ${registro.aprobados}
Rajados CC: ${registro.rajadosCC}
Crudos CC: ${registro.crudoCC}
Altos: ${registro.altos}
Bajos: ${registro.bajos}
Quemados: ${registro.quemados}
Ahumados: ${registro.ahumados}
Mermas Hornos: ${registro.mermas_hornos}
Porcentaje Aprobación: ${registro.porcentaje}
Temperaturas (Cabeza DR/PIE DR/Cabeza IZ/PIE IZ): ${registro.cabezaDr} / ${registro.PieDr} / ${registro.CabezaIz} / ${registro.PieIZ}
`;

        // Analizar usando Gemini
        const analisis = await analizarConGemini(textoReporte);
        console.log('Análisis generado por Gemini:', analisis);

        // Enviar correo
        const result = await postSendEmail(registro, analisis);
        if (result.success) {
          await pool.query('UPDATE dtcc SET enviado = 1 WHERE id_dthh = ?', [registro.id]);
          console.log(`Registro con ID ${registro.id} marcado como enviado.`);
        }
      } catch (error) {
        console.error(`Error al enviar correo para el registro con ID ${registro.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error al monitorear la tabla de logs:', error);
  }
}, 30000);

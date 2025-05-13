// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';
// import axios from 'axios';
// import { pool } from "../src/db.js";
// import { formatFecha } from './FormatearFecta.js';

// dotenv.config();

// const emailsend = 'jumul@ecofiltro.com';
// const passEmail = 'pytu vtny qjpk rcfv';
// const emailFrom = 'no-reply@ecofiltro.com';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: emailsend,
//     pass: passEmail
//   }
// });

// function agruparPromedioCada30Min(temperaturas) {
//   if (!temperaturas || temperaturas.length === 0) return 'No hay datos de temperatura disponibles.';

//   const grupos = {};

//   temperaturas.forEach(t => {
//     const horaCompleta = new Date(t.fecha_creacion);
//     const hora = horaCompleta.getHours();
//     const minutos = horaCompleta.getMinutes();
//     const bloque = minutos < 30 ? `${hora}:00-${hora}:29` : `${hora}:30-${hora + 1}:00`;

//     if (!grupos[bloque]) grupos[bloque] = [];
//     grupos[bloque].push(t);
//   });

//   const tabla = [];
//   const sensores = Object.keys(temperaturas[0]).filter(k => k.startsWith('t'));
//   tabla.push(['Bloque', ...sensores].join('	'));

//   Object.entries(grupos).forEach(([bloque, registros]) => {
//     const fila = [bloque];
//     sensores.forEach(sensor => {
//       const promedio = Math.round(
//         registros.reduce((sum, r) => sum + (r[sensor] || 0), 0) / registros.length
//       );
//       fila.push(promedio);
//     });
//     tabla.push(fila.join('	'));
//   });

//   const anchoCol = 8;
// const cabecera = ['Bloque', ...sensores].map(h => h.padEnd(anchoCol)).join('│');
// const separador = '─'.repeat(cabecera.length);
// const filas = tabla.slice(1).map(linea => {
//   return linea.split('	').map(col => col.toString().padEnd(anchoCol)).join('│');
// });
// return [cabecera, separador, ...filas].join('');
// }

// async function analizarConGemini(texto, temperaturas = []) {
//   try {
//     const tempsResumen = agruparPromedioCada30Min(temperaturas);

//     const textoFinal = `Responde en idioma español. Sé breve. Muestra un cuadro de temperaturas y proporciona un análisis corto (máximo 3 oraciones).\n\n${texto}\n\nTemperaturas promedio cada 30 minutos:\n${tempsResumen}`;

//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
//     const body = {
//       contents: [{ parts: [{ text: textoFinal }] }]
//     };

//     const response = await axios.post(url, body, {
//       headers: { 'Content-Type': 'application/json' }
//     });

//     const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//     return output || 'No se pudo generar análisis con los datos proporcionados.';
//   } catch (error) {
//     console.error('Error al analizar con Gemini:', error.response?.data || error.message);
//     return 'Error al generar análisis con Gemini. Revisa la clave API o conexión a Internet.';
//   }
// }

// // ... El resto del código queda igual ...





// export const postSendEmail = async (registro, analisisGemini) => {
//   const {
//     ModeloEco, codigoInicio, codigoFin, turnoHorneado, Horno, Hornero,
//     horneado, cabezaDr, PieDr, CabezaIz, PieIZ, promedioTMP,
//     aprobados, rajadosCC, crudoCC, altos, bajos, quemados, ahumados,
//     mermas_hornos, total, EncargadoCC, porcentaje, fechaHorneado
//   } = registro;

//   if (!ModeloEco || !Horno || !Hornero || !horneado || !aprobados || !EncargadoCC) {
//     return { success: false, error: 'Datos faltantes o nulos' };
//   }

//   const subject = `Reporte Control de Calidad ${porcentaje}: ${Horno} Fecha de Horneado: ${formatFecha(fechaHorneado)}`;
//   const text = `
// Reporte de Control de Calidad
// -----------------------------------------

// Modelo: ${ModeloEco}
// Código Inicio: ${codigoInicio}
// Código Fin: ${codigoFin}
// Turno: ${turnoHorneado}
// Horno: ${Horno}
// Hornero: ${Hornero}
// Horneado: ${horneado}

// Temperaturas:
// - Cabeza Derecha: ${cabezaDr}
// - Pie Derecho: ${PieDr}
// - Cabeza Izquierda: ${CabezaIz}
// - Pie Izquierda: ${PieIZ}
// - Promedio Temperatura: ${promedioTMP}

// Resultados:
// - Aprobados: ${aprobados}
// - Rajados CC: ${rajadosCC}
// - Crudos CC: ${crudoCC}
// - Altos: ${altos}
// - Bajos: ${bajos}
// - Quemados: ${quemados}
// - Ahumados: ${ahumados}
// - Mermas Hornos: ${mermas_hornos}
// - Total: ${total}
// - Encargado CC: ${EncargadoCC}
// - Porcentaje Aprobación: ${porcentaje}

// -----------------------------------------
// ANÁLISIS AUTOMÁTICO DE GEMINI IA:
// ${analisisGemini}

// -----------------------------------------
// Este es un mensaje automático, por favor no responder.
// `;

//   const mailOptions = {
//     from: `"Hornos-Ecofiltro" <${emailFrom}>`,
//     to: emailsend,
//     bcc: ['jonatanumul@gmail.com'],
//     subject,
//     text
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Correo enviado exitosamente:", info.response);
//     return { success: true };
//   } catch (error) {
//     console.error('Error al enviar correo:', error);
//     return { success: false, error };
//   }
// };

// setInterval(async () => {
//   console.log('Ejecutando el cronómetro...');

//   try {
//     const result = await pool.query(`
//         SELECT 
//             dthh.id,
//             dthh.id_modelo,
//             dthh.id_turno,
//             dthh.id_horno,
//             dthh.codigoInicio,
//             dthh.id_OTHH,
//             dthh.codigoFin,
//             dthh.horneado,
//             dthh.mermasCrudas,
//             dthh.librasBarro,
//             dthh.librasAserrin,
//             dthh.fecha_creacion AS fechaHorneado,
//             turno.turno AS turnoHorneado,
//             ufmodelo.nombre_modelo AS ModeloEco,
//             enc_maq.nombre_maq AS Horno,
//             operarios.Nombre AS Hornero,
//             dtcc.aprobados,
//             dtcc.altos,
//             dtcc.bajos,
//             dtcc.rajadosCC,
//             dtcc.crudoCC,
//             dtcc.quemados,
//             dtcc.ahumados,
//             dtcc.mermas_hornos,
//             COALESCE(dtcc.aprobados+dtcc.altos+dtcc.bajos+dtcc.rajadosCC+dtcc.crudoCC+dtcc.quemados+dtcc.ahumados+dtcc.mermas_hornos) AS total,
//             operarios1.Nombre AS EncargadoCC,
//             CONCAT(ROUND((dtcc.aprobados / dthh.horneado * 100), 0), '%') AS porcentaje,
//             tm.max_tempCabezaIZ AS CabezaIz,
//             tm.max_tempPieIZ AS PieIZ,
//             tm.max_tempCabezaDR AS cabezaDr,
//             tm.max_tempPieDR AS PieDr,
//             ROUND((tm.max_tempCabezaIZ + tm.max_tempPieIZ + tm.max_tempCabezaDR + tm.max_tempPieDR) / 4) AS promedioTMP
//         FROM dthh
//         INNER JOIN dtcc ON dthh.id = dtcc.id_dthh
//         LEFT JOIN turno ON dthh.id_turno = turno.id
//         LEFT JOIN ufmodelo ON dthh.id_modelo = ufmodelo.id_mod
//         LEFT JOIN enc_maq ON dthh.id_horno = enc_maq.id_maq
//         LEFT JOIN operarios ON dthh.id_hornero = operarios.id
//         LEFT JOIN operarios AS operarios1 ON dtcc.id_operarioCC = operarios1.id
//         LEFT JOIN (
//             SELECT
//                 dth.fecha_real,
//                 dth.id_horno,
//                 dth.id_modelo,
//                 dth.id_turno,
//                 MAX(dth.tempCabezaIZ) AS max_tempCabezaIZ,
//                 MAX(dth.tempPieIZ) AS max_tempPieIZ,
//                 MAX(dth.tempCabezaDR) AS max_tempCabezaDR,
//                 MAX(dth.tempPieDR) AS max_tempPieDR
//             FROM dth
//             GROUP BY dth.fecha_real, dth.id_horno, dth.id_modelo, dth.id_turno
//         ) AS tm ON tm.id_turno = dthh.id_turno AND tm.id_modelo = dthh.id_modelo AND tm.id_horno = dthh.id_horno AND tm.fecha_real = dthh.fecha_creacion
//         WHERE dtcc.enviado = 2
//     `);

//     const rows = result[0];
//     console.log('Pruebas', rows);
//     console.log('Registros obtenidos:', rows.length);

//     if (rows.length === 0) {
//       console.log('No hay registros nuevos para procesar.');
//       return;
//     }

//     for (const registro of rows) {
//       try {
//         const fechaHorneado = registro.fechaHorneado;
//         const horno = registro.id_horno;
//         const turno = registro.id_turno;

//         const TempHornos = await pool.query(
//           `SELECT * FROM temphornossolantec WHERE fecha_creacion = ? AND id_horno = ? AND id_turno = ?`,
//           [fechaHorneado, horno, turno]
//         );

//         const temperaturas = TempHornos[0] || [];
//         console.log('Datos Hornos', temperaturas);

//         await pool.query('UPDATE dtcc SET enviado = 9 WHERE id_dthh = ?', [registro.id]);

//         let analisisGemini = registro.enviado;

//         if (!analisisGemini) {
//           const textoReporte = `
// Modelo: ${registro.ModeloEco}
// Turno: ${registro.turnoHorneado}
// Horno: ${registro.Horno}
// Hornero: ${registro.Hornero}
// Aprobados: ${registro.aprobados}
// Rajados CC: ${registro.rajadosCC}
// Crudos CC: ${registro.crudoCC}
// Altos: ${registro.altos}
// Bajos: ${registro.bajos}
// Quemados: ${registro.quemados}
// Ahumados: ${registro.ahumados}
// Mermas Hornos: ${registro.mermas_hornos}
// Porcentaje Aprobación: ${registro.porcentaje}
// Temperaturas (Cabeza DR/PIE DR/Cabeza IZ/PIE IZ): ${registro.cabezaDr} / ${registro.PieDr} / ${registro.CabezaIz} / ${registro.PieIZ}`;

//           analisisGemini = await analizarConGemini(textoReporte, temperaturas);
//         }

//         const result = await postSendEmail(registro, analisisGemini);

//         if (result.success) {
//           await pool.query('UPDATE dtcc SET enviado = 1 WHERE id_dthh = ?', [registro.id]);
//           console.log(`Registro ID ${registro.id} enviado y marcado como enviado.`);
//         } else {
//           await pool.query('UPDATE dtcc SET enviado = 2 WHERE id_dthh = ?', [registro.id]);
//           console.error(`Error enviando correo para ID ${registro.id}. Registro listo para reintentar.`);
//         }

//       } catch (error) {
//         console.error(`Error procesando ID ${registro.id}:`, error);
//         await pool.query('UPDATE dtcc SET enviado = 2 WHERE id_dthh = ?', [registro.id]);
//       }
//     }

//   } catch (error) {
//     console.error('Error al monitorear la tabla de logs:', error);
//   }
// }, 2000);

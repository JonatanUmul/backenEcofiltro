console.log("Script iniciado");
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { pool } from "../src/db.js";
import { formatFecha } from './FormatearFecta.js';
dotenv.config();

// // Verificar que las variables de entorno se carguen correctamente
// console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
// console.log("AWS_REGION:", process.env.AWS_REGION);
// console.log("AWS_SOURCE_EMAIL:", process.env.AWS_SOURCE_EMAIL);

// Configuración de AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES();

export const postSendEmail = async (registro) => {
  const {
    operario, trabajoRealizado, fecha, interesados, tabla, id, id_modelo, id_turno, id_horno,
    codigoInicio, id_OTHH, codigoFin, horneado, mermasCrudas, librasBarro, librasAserrin,
    fechaHorneado, fechaCC, turnoHorneado, aserradero, tipocernido1, tipocernido2, librasAserrin2,
    ModeloEco, formula, Horno, Hornero, aprobados, altos, bajos, rajadosCC, crudoCC, quemados,
    ahumados, mermas_hornos, total, EncargadoCC, porcentaje, idjefe, idJefe, NobreJefe, firmaJefe,
    idEncargado, NombreEncargado, FirmaEncargado
  } = registro;

  // Validación de los campos requeridos
  if (!ModeloEco || !Horno || !Hornero || !horneado || !aprobados  || !EncargadoCC) {
    // console.error(`Registro con ID ${id} tiene datos faltantes o nulos. Omitiendo el envío.`);
    return { success: false, error: 'Datos faltantes o nulos' };
  }

  const subject = `Reporte Control de Calidad ${porcentaje}: ${Horno} Fecha de Horneado: ${formatFecha(fechaHorneado)}`;
  const text = `
    Reporte de Control de Calidad

    Detalles del Registro:
    -----------------------------------------
    
    - Modelo: ${ModeloEco}
    - Código Inicio: ${codigoInicio}
    - Código Fin: ${codigoFin}
    - Turno: ${turnoHorneado}
    - Horno: ${Horno}
    - Hornero: ${Hornero}
    - Horneado: ${horneado}
    
    Resultados:
    - Aprobados: ${aprobados}
    - Rajados CC: ${rajadosCC}
    - Crudos CC: ${crudoCC}
    - Altos: ${altos}
    - Bajos: ${bajos}
    - Quemados: ${quemados}
    - Ahumados: ${ahumados}
    - Mermas Hornos: ${mermas_hornos}
     - Encargado de CC: ${EncargadoCC}
    Porcentaje de Aprobación: ${porcentaje}

    -----------------------------------------
    Este es un mensaje automático, por favor no responder.
  `;
  const params = {
    Source: process.env.AWS_SOURCE_EMAIL,
    Destination: {
      ToAddresses: [process.env.AWS_SOURCE_EMAIL], // El correo del remitente
      BccAddresses: ['jumul@ecofiltro.com',  'codigos@ecofiltro.com', 'ddelacruz@ecofiltro.com', 'soporte.produccion@ecofiltro.com','jfelipe@ecofiltro.com','smunoz@ecofiltro.com'] // Utiliza el array de direcciones de correo en BCC
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: text,
        },
      },
    },
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", data);
    return { success: true, id }; // Devuelve el ID del registro
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

setInterval(async () => {
  console.log('Ejecutando el cronómetro...'); // Mensaje de depuración

  try {
    const [rows] = await pool.query(`
      SELECT 
        'dtcc' as tabla,
        d.id,
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
        userFirma.firmaUsr AS firmaJefe,
        userFEncargado.nombre AS idEncargado,
        operariosFencargado.Nombre AS NombreEncargado,
        userEfirma.firmaUsr AS FirmaEncargado
      FROM dthh d
      LEFT JOIN turno ON d.id_turno = turno.id
      LEFT JOIN aserradero ON d.id_aserradero = aserradero.id
      LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
      LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
      LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
      LEFT JOIN enc_maq ON d.id_horno = enc_maq.id_maq
      LEFT JOIN operarios ON d.id_hornero = operarios.id
      LEFT JOIN dtcc ON d.id = dtcc.id_dthh
      LEFT JOIN operarios AS operarios1 ON dtcc.id_operarioCC=operarios1.id
      LEFT JOIN othh ON d.id_OTHH= othh.id
      LEFT JOIN user ON othh.id_creador=user.id
      LEFT JOIN operarios AS operarios2 ON user.nombre = operarios2.id
      LEFT JOIN user AS userFirma ON othh.id_creador=userFirma.id
      LEFT JOIN user as userFEncargado ON d.id_creador= userFEncargado.id
      LEFT JOIN operarios AS operariosFencargado ON userFEncargado.nombre= operariosFencargado.id
      LEFT JOIN user AS userEfirma ON userFEncargado.nombre= userEfirma.nombre
      
      WHERE dtcc.enviado = 0
    `);

    console.log('Registros obtenidos:', rows.length); // Mensaje de depuración

    if (rows.length === 0) {
      console.log('No hay registros nuevos para procesar.');
    }

    for (const registro of rows) {
      // console.log('Intentando enviar correo para el registro:', registro);

      try {
        const result = await postSendEmail(registro); // Llamar a la función con el registro completo

        if (result.success) {
          // Marcar el registro como enviado usando el ID del registro que se envió
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

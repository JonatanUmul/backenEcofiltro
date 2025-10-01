import { pool } from "../../../src/db.js";
import axios from "axios";

export const postOT_mezclado_aserrin = async (req, res) => {
  const estado = 2;
  const id_creador = req.body.id_creador;
  const correlativo = req.body.correlativo;

  try {
    if (estado === "") {
      console.log("Uno o varios datos estan vacios");
    } else {
      const consulta =
        "INSERT INTO ot_mezclado_aserrin(id_est, correlativo, id_creador)Values(?, ?, ?)";
      const [rows] = await pool.query(consulta, [
        estado,
        correlativo,
        id_creador,
      ]);
      res.send({ rows });
    }
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};

export const postDT_mezclado_aserrin = async (req, res) => {
  const datos = req.body;
  const libras_aserrin = datos.sacos * 60;

  try {
    const consulta2 = `
    UPDATE muestras m
JOIN (
  SELECT m.id
  FROM muestras m
  LEFT JOIN DT_mezclado_aserrin ma
    ON ma.id_camionada_aserrin = m.id
  WHERE m.estado = 2
  GROUP BY m.id, m.sacos
  HAVING (m.sacos - COALESCE(SUM(ma.sacos), 0)) = 0  
) s ON s.id = m.id
SET m.estado = 3;
    `;
    const consulta =
      "INSERT INTO dt_mezclado_aserrin(id_ot_mezclado_aserrin, sacos, libras_aserrin,  tiempo_mezclado, id_creador, id_camionada_aserrin )values(?, ?, ?, ?, ?, ?)";
    const [rows] = await pool.query(consulta, [
      datos.id_ot_mezclado_aserrin,
      datos.sacos,
      libras_aserrin,
      datos.tiempo_mezclado,
      datos.id_creador,
      datos.id_camionada_aserrin,
    ]);
    const [rows2] = await pool.query(consulta2);
    res.send({ rows });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const Get_OT_mezclado_aserrin = async (req, res) => {
  try {
    const consulta = `
     SELECT 'ot_mezclado_aserrin' AS encabezado, 
'Mezclado de Aserrín' AS EncName, 
os.id, 
os.fecha_creacion, 
os.id_creador, 
user.telefono, 
os.aprobado, 
os.correlativo
 FROM ot_mezclado_aserrin os
 left join user on os.id_creador= user.id
 WHERE os.id_est = 2
 
    `;

    const [rows] = await pool.query(consulta);

    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const Get_DT_mezclado_aserrin = async (req, res) => {
  const id_ot_mezclado_aserrin = req.query.id_ot_mezclado_aserrin;

  try {
    const consulta = `
   select 
da.id, 
da.id_ot_mezclado_aserrin, 
da.sacos, tiempo_mezclado, 
da.libras_aserrin,
da.fecha_creacion, 
da.hora_creacion,
op.nombre,
da.id_camionada_aserrin,
m.codigo_lote
from dt_mezclado_aserrin da
left join user on da.id_creador = user.id
left join operarios op on user.nombre=op.id
left join muestras m on da.id_camionada_aserrin=m.id
where da.id_ot_mezclado_aserrin=?
    `;

    const [rows] = await pool.query(consulta, [id_ot_mezclado_aserrin]);

    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const putOT_mezclado_aserrin = async (req, res) => {
  console.log('llego aca',req);
  const estado = req.body.id_est;
  const id = req.body.id;
  /*const fechaCierre = new Date().toISOString().split("T")[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
  const horaCierre = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // Hora actual del sistema en formato: HH:MM*/
  // const horaCierre = new Date().toTimeString().split(' ')[0]; // '10:23:00'
  try {
    const consulta = "UPDATE ot_mezclado_aserrin SET id_est = ? WHERE id = ?";
    const [rows] = await pool.query(consulta, [estado, id]);
    console.log(rows)
    res.send({ rows });
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};


export const putEstadoProcesoMezclaAserrin = async (req, res) => {
  const estado = String( req.body.id_est);
  const id = req.body.id;
  const correlativo = req.body.correlativo;
  const EncName = req.body.EncName;
  const telefono = req.body.telefono;

  try {
    const consulta = "UPDATE ot_mezclado_aserrin SET aprobado = ? WHERE id = ?";
    const [rows] = await pool.query(consulta, [estado, id]);
    res.send({ rows });

    const enviarWatsap = await axios.post(
      `${process.env.ServerEvolution}/message/sendText/${process.env.InstanciaEvolution}`,

      {
        number: `502${telefono}`,
        text:estado == 'No Cumple' ?
 `❌ *ATENCIÓN: Proceso NO CUMPLE*

📋 *Etapa:* ${EncName}  
🔖 *Orden:* ${correlativo}  
📊 *Estado:* ${estado} `

        :
        `✅ *Proceso aprobado*

📋 *Etapa:* ${EncName}  
🔖 *Orden:* ${correlativo}  
📊 *Estado:* ${estado}  
`
      },{
        headers: {
          apikey:  process.env.EvolutionApi,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};

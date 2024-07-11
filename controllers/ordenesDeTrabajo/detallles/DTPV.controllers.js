import { pool } from "../../../src/db.js";

export const postDTPV = async (req, res) => {

    const { id_OTPV, cantidad, humedad, id_creador, id_MP } = req.body;
    console.log(id_OTPV)
    try {
        if (id_OTPV === '' || cantidad === '' || humedad === '', id_MP==='' ) {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dtpv( id_OTPV, cantidad, humedad, id_creador, id_MP) VALUES (?, ?, ?, ?,?)';
            const [rows] = await pool.query(consulta, [ id_OTPV, cantidad, humedad, id_creador, id_MP]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const getDTPV = async (req, res) => {
    const id=req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      SELECT 
      d.id,
      d.cantidad,
      d.humedad,
      d.fecha_creacion,
      d.hora_creacion,
      otpv.id AS id_otpv,
      enc_matprima.nom_matPrima AS descripcion_matprima
  FROM 
      dtpv d
  LEFT JOIN
      otpv ON d.id_OTPV = otpv.id
  LEFT JOIN
      enc_matprima ON d.id_MP = enc_matprima.id_enc

    where otpv.id=?
  
  `;
      const [rows] = await pool.query(consulta, [id]);
  
      // Enviar los datos obtenidos al cliente
      res.status(200).json({ data: rows });
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
  };
  
  
  


  export const getDTPVS = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL
  
    try {
        let consulta = `
        SELECT 
        d.id,
        d.cantidad,
        d.humedad,
        d.fecha_creacion,
        d.hora_creacion,
        otpv.id AS id_otpv,
        enc_matprima.nom_matPrima AS descripcion_matprima
    FROM 
        dtpv d
    LEFT JOIN
        otpv ON d.id_OTPV = otpv.id
    LEFT JOIN
        enc_matprima ON d.id_MP = enc_matprima.id_enc
    WHERE 1=1`;
  
        const params = [];
  
        if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
            if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
                consulta += ' AND (d.fecha_creacion BETWEEN ? AND ?)';
                params.push(fecha_creacion_inicio, fecha_creacion_fin);
            } else if (fecha_creacion_inicio !== 'null') {
                consulta += ' AND d.fecha_creacion >= ?';
                params.push(fecha_creacion_inicio);
            } else {
                consulta += ' AND d.fecha_creacion <= ?';
                params.push(fecha_creacion_fin);
            }
        }
  
        const [rows] = await pool.query(consulta, params);
  
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };
  
  
  

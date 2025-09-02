import { pool } from "../../../src/db.js";

export const postDTPV = async (req, res) => {

  const {
    id_camionada,
    sacosBarro,
    humedadpromedio,
    peso_saco,
    creador,
    id_proceso,
    comentario,
  } = req.body;

  const peso_total_libras=peso_saco*sacosBarro
  console.log(req.body, peso_total_libras);
  try {
    const consulta = `
        INSERT INTO dtpv(id_camionada, cantidad, humedad, peso_sacos, peso_total_libras, id_creador, id_proceso, comentario)VALUES(?,?,?,?,?,?,?,?)
        `;
    const response = await pool.query(consulta, [
      id_camionada,
      sacosBarro,
      humedadpromedio,
      peso_saco,
      peso_total_libras,
      creador,
      id_proceso,
      comentario,
    ]);
    console.log("respuesta del servidor", response);
    res.status(201).json({ 
      mensaje: `La información se ha guardado correctamente. Cantidad de libras registradas: ${peso_total_libras} lb`
    });
    
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor"+' '+ error });
  }
};



export const getDTPV = async (req, res) => {
  const id = req.params.id;
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
        enc_matprima.nom_matPrima AS descripcion_matprima,
        user.firmaUsr AS FirmaEncargado,
        user2.firmaUsr AS FirmaJefe
        
    FROM 
        dtpv d
    LEFT JOIN
        otpv ON d.id_OTPV = otpv.id
    LEFT JOIN
        enc_matprima ON d.id_MP = enc_matprima.id_enc
   LEFT JOIN 
   		user ON d.id_creador= user.id
   LEFT JOIN 
   		user AS user2 ON otpv.id_creador= user2.id

    where otpv.id=?
  
  `;
    const [rows] = await pool.query(consulta, [id]);

    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });
  } catch (error) {
    // Manejar errores de manera adecuada
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la tabla dtp" });
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
        enc_matprima.nom_matPrima AS descripcion_matprima,
        user.firmaUsr AS FirmaEncargado,
        user2.firmaUsr AS FirmaJefe
        
    FROM 
        dtpv d
    LEFT JOIN
        otpv ON d.id_OTPV = otpv.id
    LEFT JOIN
        enc_matprima ON d.id_MP = enc_matprima.id_enc
   LEFT JOIN 
   		user ON d.id_creador= user.id
   LEFT JOIN 
   		user AS user2 ON otpv.id_creador= user2.id
    WHERE 1=1`;

    const params = [];

    if (fecha_creacion_inicio !== "null" && fecha_creacion_fin !== "null") {
      if (fecha_creacion_inicio !== "null" && fecha_creacion_fin !== "null") {
        consulta += " AND (d.fecha_creacion BETWEEN ? AND ?)";
        params.push(fecha_creacion_inicio, fecha_creacion_fin);
      } else if (fecha_creacion_inicio !== "null") {
        consulta += " AND d.fecha_creacion >= ?";
        params.push(fecha_creacion_inicio);
      } else {
        consulta += " AND d.fecha_creacion <= ?";
        params.push(fecha_creacion_fin);
      }
    }

    const [rows] = await pool.query(consulta, params);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dthp:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la tabla dthp" });
  }
};

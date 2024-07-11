import { pool } from "../../../src/db.js";


export const postDTIP = async (req, res) => {

    const { id_OTIP,TipoPlata,fecha_real, id_modelo,  codigoInicio, codigoFinal, impregnados, mermas, id_creador } = req.body;
   
    try {
        if (id_OTIP === '' ||TipoPlata===''|| id_modelo === '', codigoInicio==='' || codigoFinal === '' || impregnados === '' || mermas === '' ) {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dtip (id_OTIP,TipoPlata,fecha_real, id_modelo,  codigoInicio, codigoFinal, impregnados, mermas, id_creador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await pool.query(consulta, [id_OTIP, TipoPlata, fecha_real,id_modelo,  codigoInicio, codigoFinal, impregnados, mermas, id_creador]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const getDTIP = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      select 
      d.id,
      d.id_otip,
      d.codigoInicio,
      d.codigoFinal,
      d.impregnados,
      d.mermas,
      d.fechaCreacion,
      d.horaCreacion,
      insumos.insumo as TipoPlata,
      ufmodelo.nombre_modelo as modelo

  FROM 
      dtip d

  LEFT JOIN 
      ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN 
      insumos ON d.TipoPlata = insumos.id
      
      WHERE d.id_otip= ?
  `;
      const [rows] = await pool.query(consulta,[id]);
  
      // Enviar los datos obtenidos al cliente
      res.status(200).json({ data: rows });
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
  };


  export const getSDTIP = async (req, res) => {
    const { id_asrd, fecha_creacion, id_patio, id_enc } = req.params; // Obtener los parámetros de la URL

    try {
        let consulta = `
        SELECT 
                d.hora_creacion,
                d.esquinaSupIZ,
                d.esquinaSupDA,
                d.esquinaCentro,
                d.esquinaInfDR,
                d.esquinaInfIZ,
                d.fecha_creacion,
                othp.id AS id_OTHP,
                aserradero.nombre_aserradero AS aserradero,
                patios.nombrePatio AS patio,
                enc_matprima.nom_matPrima AS materiaPrima
            FROM 
                dthp d
            LEFT JOIN 
                othp ON d.id_othp = othp.id
            LEFT JOIN 
                aserradero ON d.id_asrd = aserradero.id
            LEFT JOIN 
                patios ON d.id_patio = patios.id
            LEFT JOIN 
                enc_matprima ON d.id_matPrima = enc_matprima.id_enc
    
            WHERE 1 = 1`;

        const params = [];

        if (id_patio !== 'null') {
            consulta += ' AND (d.id_patio IS NULL OR d.id_patio = ?)';
            params.push(id_patio);
        }

        if (id_asrd !== 'null') {
            consulta += ' AND (d.id_asrd IS NULL OR d.id_asrd = ?)';
            params.push(id_asrd);
        }

        if (fecha_creacion !== 'null') {
            consulta += ' AND (d.fecha_creacion IS NULL OR d.fecha_creacion = ?)';
            params.push(fecha_creacion);
        }

        if (id_enc !== 'null') {
            consulta += ' AND (d.id_matPrima IS NULL OR d.id_matPrima = ?)';
            params.push(id_enc);
        }


        const [rows] = await pool.query(consulta, params);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
};

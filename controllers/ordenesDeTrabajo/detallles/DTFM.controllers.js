import { pool } from "../../../src/db.js";

export const postDTFM = async (req, res) => {

    const { id_OTFM,id_modelo, id_Aserradero, id_cernidodetalle, id_cernidodetalle2, id_Aserradero2, cantidad, peso, peso2, humedad , humedad2, id_creador, id_matPrim, correlativo, cantidadLibras} = req.body;
    console.log(req)

    try {
        if (id_OTFM === '' || id_Aserradero === '' || cantidad === '' || peso === '' || humedad === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
    const { id_OTFM,id_modelo, id_Aserradero, id_cernidodetalle, id_cernidodetalle2, id_Aserradero2, cantidad, peso, peso2, humedad , humedad2, id_creador, id_matPrim, correlativo, cantidadLibras} = req.body;
            const consulta = 'INSERT INTO dtfm(id_OTFM,correlativo, id_modelo, id_Aserradero, id_cernidodetalle, id_cernidodetalle2, id_Aserradero2, cantidad, peso, peso_libras, peso2, humedad , humedad2, id_creador, id_matPrim) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?,?,?)';
            const [rows] = await pool.query(consulta, [id_OTFM, correlativo, id_modelo, id_Aserradero, id_cernidodetalle, id_cernidodetalle2, id_Aserradero2, cantidad, peso, cantidadLibras, peso2, humedad , humedad2, id_creador, id_matPrim]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};



export const getDTFM = async (req, res) => {
    const id= req.params.id;
   
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      SELECT 
        d.id,
        d.fecha_creacion,
         d.correlativo,
        d.hora_creacion,
        d.cantidad,
        d.peso, 
         d.peso2,
         d.peso_libras,
         COALESCE(d.peso, 0) + COALESCE(d.peso2, 0) AS pesoTotal, 
        d.humedad,
        d.humedad2,
        otfm.id AS id_otfm,
        enc_matprima.nom_matPrima AS descripcion_matprima,
        aserradero.nombre_aserradero AS aserradero,
        aserradero2.nombre_aserradero AS aserradero2,
        cernidodetalle.detalle AS detallecernido1,
        cernidodetalle2.detalle AS detallecernido2,
        ufmodelo.nombre_modelo AS modelo,
        
        otfm1.id_creador AS idJefe,
        user.firmaUsr AS FirmaJefe,
        operarios.Nombre AS nombreJefe,
        user2.nombre AS idEncargadofm,
        user1.firmaUsr AS FirmaEncargado,
        operarios1.Nombre AS EncargadoProcedo
    FROM 
        dtfm d
    LEFT JOIN
        otfm ON d.id_OTFM = otfm.id
    LEFT JOIN
        enc_matprima ON d.id_matPrim = enc_matprima.id_enc
    LEFT JOIN
        aserradero ON d.id_Aserradero = aserradero.id
    LEFT JOIN
        cernidodetalle AS cernidodetalle ON d.id_cernidodetalle = cernidodetalle.id
    LEFT JOIN
        aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id  
    LEFT JOIN
        cernidodetalle AS cernidodetalle2 ON d.id_cernidodetalle2 = cernidodetalle2.id
    LEFT JOIN 
        ufmodelo ON d.id_modelo=ufmodelo.id_mod
   
   LEFT join
   	otfm AS otfm1 ON d.id_OTFM= otfm1.id
	LEFT Join
		user ON otfm1.id_creador= user.id 
	LEFT Join
		operarios on user.nombre=operarios.id
	LEFT Join
		user as user2 ON d.id_creador=user2.id
	LEFT join
		user AS user1 ON  user2.nombre= user1.nombre
	LEFT join
		operarios as operarios1 ON user2.nombre =operarios1.id
	
		
where otfm.id=?
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


  
export const getDTFMM = async (req, res) => {
    const {fecha_creacion_inicio,fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL
  
    try {
        let consulta = `
        SELECT 
        d.id,
        d.fecha_creacion,
        d.hora_creacion,
        d.cantidad,
        d.peso, 
         d.peso2,
         COALESCE(d.peso, 0) + COALESCE(d.peso2, 0) AS pesoTotal, 
        d.humedad,
        d.humedad2,
        otfm.id AS id_otfm,
        enc_matprima.nom_matPrima AS descripcion_matprima,
        aserradero.nombre_aserradero AS aserradero,
        aserradero2.nombre_aserradero AS aserradero2,
        cernidodetalle.detalle AS detallecernido1,
        cernidodetalle2.detalle AS detallecernido2,
        ufmodelo.nombre_modelo AS modelo,
        
        otfm1.id_creador AS idJefe,
        user.firmaUsr AS FirmaJefe,
        operarios.Nombre AS nombreJefe,
        user2.nombre AS idEncargadofm,
        user1.firmaUsr AS FirmaEncargado,
        operarios1.Nombre AS EncargadoProcedo
    FROM 
        dtfm d
    LEFT JOIN
        otfm ON d.id_OTFM = otfm.id
    LEFT JOIN
        enc_matprima ON d.id_matPrim = enc_matprima.id_enc
    LEFT JOIN
        aserradero ON d.id_Aserradero = aserradero.id
    LEFT JOIN
        cernidodetalle AS cernidodetalle ON d.id_cernidodetalle = cernidodetalle.id
    LEFT JOIN
        aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id  
    LEFT JOIN
        cernidodetalle AS cernidodetalle2 ON d.id_cernidodetalle2 = cernidodetalle2.id
    LEFT JOIN 
        ufmodelo ON d.id_modelo=ufmodelo.id_mod
   
   LEFT join
   	otfm AS otfm1 ON d.id_OTFM= otfm1.id
	LEFT Join
		user ON otfm1.id_creador= user.id 
	LEFT Join
		operarios on user.nombre=operarios.id
	LEFT Join
		user as user2 ON d.id_creador=user2.id
	LEFT join
		user AS user1 ON  user2.nombre= user1.nombre
	LEFT join
		operarios as operarios1 ON user2.nombre =operarios1.id
	
		
  
    WHERE 1=1`;
  
        const params = [];
       
      if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
        consulta += ' AND (d.fecha_creacion BETWEEN ? AND ?)';
        params.push(fecha_creacion_inicio, fecha_creacion_fin);
    } else if (fecha_creacion_inicio !== 'null') {
        consulta += ' AND d.fecha_creacion >= ?';
        params.push(fecha_creacion_inicio);
    } else if (fecha_creacion_fin !== 'null') {
        consulta += ' AND d.fecha_creacion <= ?';
        params.push(fecha_creacion_fin);
    }
    else if (fecha_creacion_inicio !== 'null') {
      consulta += ' AND d.fecha_creacion = ?';
      params.push(fecha_creacion_inicio);
  }
   
      
  
        const [rows] = await pool.query(consulta, params);
  
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };

export const getLotesAserrinMezcladosAprobados = async (req, res) => {
  
    try {
        let consulta = `
       select 
om.id,
om.correlativo,
om.aprobado,
dm.id_ot_mezclado_aserrin,
dm.sacos,
dm.libras_aserrin
 from ot_mezclado_aserrin om
 left join dt_mezclado_aserrin dm on dm.id_ot_mezclado_aserrin=om.id
 where om.aprobado='Aprobado'
  group by om.id, om.correlativo, om.correlativo
        `;

        const [rows] = await pool.query(consulta);
        res.send({ rows })
        //res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };


  export const getDTFM_ABIERTOS = async (req, res) => {
  
    try {
        let consulta = `
 select 
id,
correlativo
from otfm
where estado_para_produccion=2 and id_est=3
        `;

        const [rows] = await pool.query(consulta);
        res.send({ rows })
        //res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };
  

  
  
  
  
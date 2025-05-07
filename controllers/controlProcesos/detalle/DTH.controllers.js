import { pool } from "../../../src/db.js";



export const postDTH = async (req, res) => {
  const { id_cth, fecha_real,id_turno ,id_modelo,id_modelo2, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR  } = req.body;
  console.log(id_cth, fecha_real,id_turno ,id_modelo,id_modelo2, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR )
  try {
    const consulta = 'INSERT INTO dth (id_cth,fecha_real, id_turno ,id_modelo,id_modelo2, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?,?)';
    const [rows] = await pool.query(consulta, [id_cth,fecha_real, id_turno ,id_modelo,id_modelo2, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR  ]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}



export const getDTH= async (req, res)=>{
let id= req.params.id;

try {
  let consulta= `
   SELECT 	
        d.id,
        d.fecha_creacion,
        d.fecha_real,
        d.id_creador,
        d.hora_creacion,
        d.tempCabezaIZ,
        d.tempCentroIZ,
        d.tempPieIZ,
        d.tempCabezaDR,
        d.tempCentroDR,
        d.tempPieDR,
        TIMEDIFF(d.hora_creacion, LAG(d.hora_creacion) OVER (ORDER BY hora_creacion)) AS tiempo_transcurrido,
        ROUND(((d.tempCabezaIZ + d.tempPieIZ + d.tempCabezaDR + d.tempPieDR) / 4)) AS promedio,
        cth.id AS id_cth,
        ufmodelo.nombre_modelo AS modelo,
        enc_maq.nombre_maq AS horno,
        turno.turno AS turno,
        user.nombre AS id_encargado,
        operarios.Nombre AS hornero,
        userF.firmaUsr AS firmaHornero
      FROM 
        dth d
      LEFT JOIN 
        cth ON d.id_cth = cth.id
      LEFT JOIN 
        ufmodelo ON d.id_modelo = ufmodelo.id_mod
      LEFT JOIN 
        enc_maq ON d.id_horno = enc_maq.id_maq
      LEFT JOIN 
        turno ON d.id_turno = turno.id
      LEFT join
      	user ON d.id_creador = user.id
      LEFT JOIN 
      	operarios ON  user.nombre = operarios.id
		LEFT Join
			user AS userF ON  d.id_creador= userF.id 
where d.id_cth=?

`

  const [rows]= await pool.query(consulta, [id])
  consulta += ' ORDER BY d.id ASC, tiempo_transcurrido ASC';
  res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}
export const getSDTHSOLANTEC = async (req, res) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn, horno } = req.params;
console.log('HORNO SELECCIONADO EN EL BCK',fecha_creacion_inicio,fecha_creacion_fin, modeloUF,turn,horno )
  try {
    let consulta =
    `
  SELECT 
d.id,
d.fecha_solantec,
d.hora_creacion,
d.t1,
d.t2,
d.t3,
d.t4,
d.t5,
d.t6,
d.t7,
d.t8,
d.t9,
d.t10,
d.t11,
d.t12,
ROUND((t1+t2+t3+t4+t5+t6+t7+t8+t9+t10+t11+t12)/12) promedio,
enc_maq.nombre_maq AS horno,
turno.turno AS turno,
dthh.id_creador,
dthh.id_modelo,
user.nombre,
operarios.Nombre,
ufmodelo.nombre_modelo,
d.est_horno

FROM TempHornosSolantec d

 LEFT JOIN 
        enc_maq ON d.id_horno = enc_maq.id_maq
 LEFT JOIN 
        turno ON d.id_turno = turno.id
LEFT JOIN 
			dthh ON d.fecha_creacion=dthh.fecha_creacion AND d.id_horno=dthh.id_horno AND d.id_turno=dthh.id_turno
LEFT JOIN 
			user ON dthh.id_creador=user.id
LEFT JOIN 
			operarios ON user.nombre=operarios.id
LEFT JOIN 
			ufmodelo ON dthh.id_modelo=ufmodelo.id_mod

WHERE 1 = 1
    `

    let params = [];

    if (modeloUF !== 'null') {
      consulta += ' AND (dthh.id_modelo IS NULL OR dthh.id_modelo = ?)';
      params.push(modeloUF);
    }

    if (horno !== 'null') {
      consulta += ' AND (d.id_horno IS NULL OR d.id_horno = ?)';
      params.push(horno);
    }

    if (turn !== 'null') {
      consulta += ' AND (d.id_turno IS NULL OR d.id_turno = ?)';
      params.push(turn);
    }
    
    if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
      consulta += ' AND (d.fecha_solantec BETWEEN ? AND ?)';
      params.push(fecha_creacion_inicio, fecha_creacion_fin);
    } else if (fecha_creacion_inicio !== 'null') {
      consulta += ' AND d.fecha_solantec >= ?';
      params.push(fecha_creacion_inicio);
    } else if (fecha_creacion_fin !== 'null') {
      consulta += ' AND d.fecha_solantec <= ?';
      params.push(fecha_creacion_fin);
    }
      // consulta += `AND (MINUTE(d.hora_creacion) % ${tiempo} = 0)`;
      consulta += ' ORDER BY d.id ASC';

    const [rows] = await pool.query(consulta, params);
    res.status(200).json({ data: rows });

  } catch (error) {
    console.error("Error al obtener los datos de la tabla dth:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dth" });
  }
};

export const getSDTH = async (req, res) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn, horno } = req.params;
console.log('HORNO SELECCIONADO EN EL BCK',fecha_creacion_inicio,fecha_creacion_fin, modeloUF,turn,horno )
  try {
    let consulta =
     ` 
    SELECT 	
        d.id,
        d.fecha_creacion,
        d.fecha_real,
        d.id_creador,
        d.hora_creacion,
        d.tempCabezaIZ,
        d.tempCentroIZ,
        d.tempPieIZ,
        d.tempCabezaDR,
        d.tempCentroDR,
        d.tempPieDR,
        TIMEDIFF(d.hora_creacion, LAG(d.hora_creacion) OVER (ORDER BY hora_creacion)) AS tiempo_transcurrido,
        ROUND(((d.tempCabezaIZ + d.tempPieIZ + d.tempCabezaDR + d.tempPieDR) / 4)) AS promedio,
        cth.id AS id_cth,
        ufmodelo.nombre_modelo AS modelo,
        enc_maq.nombre_maq AS horno,
        turno.turno AS turno,
        user.nombre AS id_encargado,
        operarios.Nombre AS hornero,
        userF.firmaUsr AS firmaHornero
      FROM 
        dth d
      LEFT JOIN 
        cth ON d.id_cth = cth.id
      LEFT JOIN 
        ufmodelo ON d.id_modelo = ufmodelo.id_mod
      LEFT JOIN 
        enc_maq ON d.id_horno = enc_maq.id_maq
      LEFT JOIN 
        turno ON d.id_turno = turno.id
      LEFT join
      	user ON d.id_creador = user.id
      LEFT JOIN 
      	operarios ON  user.nombre = operarios.id
		LEFT Join
			user AS userF ON  d.id_creador= userF.id
      WHERE 1 = 1`;


    let params = [];

    if (modeloUF !== 'null') {
      consulta += ' AND (dthh.id_modelo IS NULL OR dthh.id_modelo = ?)';
      params.push(modeloUF);
    }

    if (horno !== 'null') {
      consulta += ' AND (d.id_horno IS NULL OR d.id_horno = ?)';
      params.push(horno);
    }

    if (turn !== 'null') {
      consulta += ' AND (d.id_turno IS NULL OR d.id_turno = ?)';
      params.push(turn);
    }
    
    if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
      consulta += ' AND (d.fecha_real BETWEEN ? AND ?)';
      params.push(fecha_creacion_inicio, fecha_creacion_fin);
    } else if (fecha_creacion_inicio !== 'null') {
      consulta += ' AND d.fecha_real >= ?';
      params.push(fecha_creacion_inicio);
    } else if (fecha_creacion_fin !== 'null') {
      consulta += ' AND d.fecha_real <= ?';
      params.push(fecha_creacion_fin);
    }
      // consulta += `AND (MINUTE(d.hora_creacion) % ${tiempo} = 0)`;
      consulta += ' ORDER BY d.id ASC';

    const [rows] = await pool.query(consulta, params);
    res.status(200).json({ data: rows });

  } catch (error) {
    console.error("Error al obtener los datos de la tabla dth:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dth" });
  }
};


import { pool } from "../../../src/db.js";



export const postDCPCD = async (req, res) => {
  const { id_cpcd,id_turno,id_mod,barroLB,molde,diametro,pesouf,aserrinLB,alturaH1,alturaH2,grosor1,grosor2,grosorFondo, id_creador} = req.body;
 
  try {
    const consulta = 'INSERT INTO dcpcd (id_cpcd,id_turno,id_mod,barroLB,aserrinLB,molde,diametro,pesouf,alturaH1,alturaH2,grosor1,grosor2,grosorFondo, id_creador) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?,?,?,?,?)';
    const [rows] = await pool.query(consulta, [ id_cpcd,id_turno,id_mod,barroLB,aserrinLB,molde,diametro,pesouf,alturaH1,alturaH2,grosor1,grosor2,grosorFondo, id_creador]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}

export const getDCPCD= async (req, res)=>{
const id= req.params.id;

try {
  const consulta= `
  select 
d.id,
d.fecha_produccion,
d.hora_ceacrion,
d.barroLB,
d.aserrinLB,
d.diametro,
d.alturaH1,
d.alturaH2,
d.grosor1,
d.grosor2,
d.grosorFondo,
d.pesouf,
enc_maq.nombre_maq AS molde,
ufmodelo.nombre_modelo AS ufmodelo,
turno.turno AS turno

from dcpcd d

left join enc_maq on d.molde= enc_maq.id_maq
left join ufmodelo on d.id_mod= ufmodelo.id_mod
left join turno on d.id_turno= turno.id

WHERE d.id_cpcd=?
`

  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}

export const getDCPCDDiario = async (req, res) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, turnoProd } = req.params;

  try {
    let sql = `
      SELECT 
        d.id,
        d.fecha_produccion,
        d.hora_ceacrion,
        d.barroLB,
        d.aserrinLB,
        d.diametro,
        d.alturaH1,
        d.alturaH2,
        d.grosor1,
        d.grosor2,
        d.grosorFondo,
        d.pesouf,
        enc_maq.nombre_maq     AS molde,
        ufmodelo.nombre_modelo AS ufmodelo,
        turno.turno            AS turno
      FROM dcpcd d
      LEFT JOIN enc_maq  ON d.molde    = enc_maq.id_maq
      LEFT JOIN ufmodelo ON d.id_mod   = ufmodelo.id_mod
      LEFT JOIN turno    ON d.id_turno = turno.id
      WHERE 1=1
    `;

    const params = [];

    // Si quieres incluir registros con NULL cuando hay filtro, mantén estas condiciones.
    if (ufmodelo && ufmodelo !== 'null') {
      sql += ' AND (d.id_mod IS NULL OR d.id_mod = ?)';
      params.push(Number(ufmodelo));
    }

    if (turnoProd && turnoProd !== 'null') {
      sql += ' AND (d.id_turno IS NULL OR d.id_turno = ?)';
      params.push(Number(turnoProd));
    }

    if (fecha_creacion_inicio && fecha_creacion_inicio !== 'null' &&
        fecha_creacion_fin && fecha_creacion_fin !== 'null') {
      sql += ' AND d.fecha_produccion BETWEEN ? AND ?';
      params.push(fecha_creacion_inicio, fecha_creacion_fin);
    } else if (fecha_creacion_inicio && fecha_creacion_inicio !== 'null') {
      sql += ' AND d.fecha_produccion >= ?';
      params.push(fecha_creacion_inicio);
    } else if (fecha_creacion_fin && fecha_creacion_fin !== 'null') {
      sql += ' AND d.fecha_produccion <= ?';
      params.push(fecha_creacion_fin);
    }

    sql += ' ORDER BY d.fecha_produccion DESC, d.hora_ceacrion DESC';

    const [rows] = await pool.query(sql, params); // <-- sin corchetes extra
    console.log(rows)
    res.send(rows);
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dcpcd:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dcpcd" });
  }
};

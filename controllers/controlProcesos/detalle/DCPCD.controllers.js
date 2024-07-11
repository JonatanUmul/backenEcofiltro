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
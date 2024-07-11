import { pool } from "../../../src/db.js";



export const postDRM = async (req, res) => {
  const { id_CRM, codigo, id_modelo, id_motivo, id_creador } = req.body;
  
  try {
    const consulta = 'INSERT INTO drm (id_CRM, codigo, id_modelo, id_motivo, id_creador) VALUES (?, ?, ?, ?,?)';
    const [rows] = await pool.query(consulta, [id_CRM, codigo, id_modelo, id_motivo, id_creador]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}

export const getDRM= async(req, res) =>{
  const id= req.params.id;
  
  try {
    const consulta=
    `select 
    d.id,
    d.codigo,
    d.fecha_creacion,
    crm.id as id_crm,
    ufmodelo.nombre_modelo as modelo,
    tipomerma.tipo as merma
    
    from drm d
    
    left join crm on d.id_CRM= crm.id
    left join ufmodelo on d.id_modelo= ufmodelo.id_mod
    left join tipomerma on d.id_motivo= tipomerma.id
    where d.id_CRM=?`

    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
}
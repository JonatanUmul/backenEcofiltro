import { pool } from "../../../src/db.js";

      


export const postDMM2 = async(req, res)=>{
  const {
    id_MM2 ,
	id_estadomaq ,
	id_revision ,
	id_proveedor ,
	id_responsable ,
	detalle ,
  creador
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dmm2(
        id_MM2 ,
        id_estadomaq ,
        id_revision ,
        id_proveedor ,
        id_responsable ,
        detalle ,
        creador) Values(?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
            id_MM2 ,
            id_estadomaq ,
            id_revision ,
            id_proveedor ,
            id_responsable ,
            detalle ,
            creador
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDMM2= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    select 
    d.id_MM2,
    
    est_maq.estado as estadomaq,
    tipomantenimiento.tipo as tipoMantenimiento,
    revisionmaquinaria.tipo as revision,
    enc_prov.nombre as proveedor,
    operarios.Nombre as responsable,
    
    d.detalle,
    d.fechaCreacion,
    d.horaCreacion
    
    from dmm2 d
    
    left join est_maq on d.id_estadomaq = est_maq.id_est
    left join tipomantenimiento on d.id_tipoMantenimiento = tipomantenimiento.id
    left join revisionmaquinaria on d.id_revision = revisionmaquinaria.id
    left join enc_prov on d.id_proveedor = enc_prov.id_prov
    left join operarios on d.id_responsable = operarios.id
    where d.id_MM2=?;
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 
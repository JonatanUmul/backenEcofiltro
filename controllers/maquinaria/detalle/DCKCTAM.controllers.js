import { pool } from "../../../src/db.js";

      


export const postDCKCTAM = async(req, res)=>{
  const {
    id_CKTAM,
    id_grupoProduccion,
    id_visorNivelFuncionado,
    id_accionamieentoCorrectroLLaveDeAgua,
    id_creador,
    observacion1,
    observacion2
    }= req.body
   
    
    try{
      const camposVacios = [];
    
      if (id_grupoProduccion === '') camposVacios.push('Grupo de Producción');
      if (id_visorNivelFuncionado === '') camposVacios.push('Visor de Nivel Funcionando Funcionando');
      if (id_accionamieentoCorrectroLLaveDeAgua === '') camposVacios.push('Accionamiento Correcto Llave de Agua');
      
      if (camposVacios.length > 0) {
        const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
        console.log(mensaje);
        res.status(400).send({ error: mensaje });
      } else {
        const consulta=`INSERT INTO dcktam(
          id_grupoProduccion,
          id_CKTAM,
          id_visorNivelFuncionado,
          id_accionamieentoCorrectroLLaveDeAgua,
          id_creador,
          observacion1,
          observacion2
       ) Values(?,?,?,?,?,?,?)`;
          const [rows]= await pool.query(consulta,[
            id_grupoProduccion,
            id_CKTAM,
            id_visorNivelFuncionado,
            id_accionamieentoCorrectroLLaveDeAgua,
            id_creador,
            observacion1,
            observacion2
         
          ])
          res.status(200).send({ success: true, message: 'Datos guardados correctamente' });
        }
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDCKCTAM= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    select 
    d.fechaCreacion,
    d.horaCreacion,
    d.id_CKTAM,
    r1.respuesta AS 'id_visorNivelFuncionado',
    r2.respuesta AS 'id_accionamieentoCorrectroLLaveDeAgua',
    user.username AS 'creador',
    d.observacion1,
    d.observacion2

    
    FROM dcktam d
    
    left join respuestas r1 on d.id_visorNivelFuncionado = r1.id
    left join respuestas r2 on d.id_accionamieentoCorrectroLLaveDeAgua = r2.id
	left join user on d.id_creador= user.id
     where d.id_CKTAM =?;
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 


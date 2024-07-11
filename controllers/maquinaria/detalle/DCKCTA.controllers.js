import { pool } from "../../../src/db.js";

      


export const postDCKCTA = async(req, res)=>{
  const {
    id_grupoProduccion,
    id_CKCTA,
    id_verificarCableDeCorteEnBuenEstado,
    id_lubricarGuiasDelCortador,
    id_limpiezaGeneralDeCorrederasGuiasCortador,
    observacion1,
    observacion2,
    observacion3,
    id_creador
    }= req.body
   
   
    try{
      const camposVacios = [];
      if (id_grupoProduccion === '') camposVacios.push('Grupo de Producción');
      if (id_verificarCableDeCorteEnBuenEstado === '') camposVacios.push('Verificar Cable de Corte en Buen Estado');
      if (id_lubricarGuiasDelCortador === '') camposVacios.push('Lubricar Guias Del Cortador');
      if (id_limpiezaGeneralDeCorrederasGuiasCortador === '') camposVacios.push(' Limpieza General de Correderas, Guias y Cortador');
  
      if (camposVacios.length > 0) {
        const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
        console.log(mensaje);
        res.status(400).send({ error: mensaje });
      } else {
        
       const consulta=`INSERT INTO dckcta (
        id_grupoProduccion,
        id_CKCTA,
        id_verificarCableDeCorteEnBuenEstado,
        id_lubricarGuiasDelCortador,
        id_limpiezaGeneralDeCorrederasGuiasCortador,
        observacion1,
        observacion2,
        observacion3,
        id_creador) Values(?,?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_grupoProduccion,
          id_CKCTA,
          id_verificarCableDeCorteEnBuenEstado,
          id_lubricarGuiasDelCortador,
          id_limpiezaGeneralDeCorrederasGuiasCortador,
          observacion1,
          observacion2,
          observacion3,
          id_creador
        ])
        res.status(200).send({ success: true, message: 'Datos guardados correctamente' });
      }
    
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}



export const getDCKCTA= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    select 
    d.fechaCreacion,
    d.horaCreacion,
    d.id_CKCTA,
    r1.respuesta AS 'id_verificarCableDeCorteEnBuenEstado',
    r2.respuesta AS 'id_lubricarGuiasDelCortador',
    r3.respuesta AS 'id_limpiezaGeneralDeCorrederasGuiasCortador',
  
    
    d.observacion1,
    d.observacion2,
    d.observacion3
    
    FROM dckcta d
    
    left join respuestas r1 on d.id_verificarCableDeCorteEnBuenEstado = r1.id
    left join respuestas r2 on d.id_lubricarGuiasDelCortador = r2.id
    left join respuestas r3 on d.id_limpiezaGeneralDeCorrederasGuiasCortador = r3.id 
     where d.id_CKCTA =?
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 


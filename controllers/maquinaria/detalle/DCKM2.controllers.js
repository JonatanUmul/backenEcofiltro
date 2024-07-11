import { pool } from "../../../src/db.js";

      


export const postDCKM2 = async(req, res)=>{
  const {
    id_grupoProduccion,
    id_CKM2,
     id_limpiezaGeneral,
    id_accionamientoCorrectoTornillos,
    id_presionAire125PSI,
    id_vaciarAguaUnidadMantenimientio,
    id_accionamientoCompuertaPolvos,
    id_inspeccionTornillosObjetosExtraños,
    id_ajusteManuelChumaceras,
    id_inspeccionPaletaTornilloSeco,
    id_creador,
    observacion1,
    observacion2,
    observacion3,
    observacion4,
    observacion5,
    observacion6,
    observacion7,
    observacion8,
    

    }= req.body
   
   
    try{

      const camposVacios = [];
    
      if (id_grupoProduccion === '') camposVacios.push('Grupo de Producción');
   
      if (camposVacios.length > 0) {
        const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
        console.log(mensaje);
        res.status(400).send({ error: mensaje });
      } else {
        
       const consulta=`INSERT INTO dckm2 (
        id_grupoProduccion,
        id_CKM2,
        id_limpiezaGeneral,
       id_accionamientoCorrectoTornillos,
       id_presionAire125PSI,
       id_vaciarAguaUnidadMantenimientio,
       id_accionamientoCompuertaPolvos,
       id_inspeccionTornillosObjetosExtraños,
       id_ajusteManuelChumaceras,
       id_inspeccionPaletaTornilloSeco,
       id_creador,
       observacion1,
       observacion2,
       observacion3,
       observacion4,
       observacion5,
       observacion6,
       observacion7,
       observacion8
      ) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_grupoProduccion,
          id_CKM2,
     id_limpiezaGeneral,
    id_accionamientoCorrectoTornillos,
    id_presionAire125PSI,
    id_vaciarAguaUnidadMantenimientio,
    id_accionamientoCompuertaPolvos,
    id_inspeccionTornillosObjetosExtraños,
    id_ajusteManuelChumaceras,
    id_inspeccionPaletaTornilloSeco,
    id_creador,
    observacion1,
    observacion2,
    observacion3,
    observacion4,
    observacion5,
    observacion6,
    observacion7,
    observacion8,
    
        ])
        res.status(200).send({ success: true, message: 'Datos guardados correctamente' });
        
    
      }

        
    } catch (err) {
      console.error('Error al guardar los datos:', err);
      res.status(500).send({ error: 'Error al guardar los datos' });
    }
}




export const getDCKM2= async(req, res)=>{
const id= req.params.id;

try {
  const consulta= `
	select 
    d.fecha_creacion,
    d.hora_creacion,
    d.id_CKM2,
    r1.respuesta AS 'id_limpiezaGeneral',
    r2.respuesta AS 'id_accionamientoCorrectoTornillos',
    r3.respuesta AS 'id_presionAire125PSI',
    r4.respuesta AS 'id_vaciarAguaUnidadMantenimientio',
    r5.respuesta AS 'id_accionamientoCompuertaPolvos',
    r6.respuesta AS 'id_inspeccionTornillosObjetosExtraños',
    r7.respuesta AS 'id_ajusteManuelChumaceras',
    r8.respuesta AS 'id_inspeccionPaletaTornilloSeco',
    user.username AS 'creador',
    d.observacion1,
    d.observacion2,
    d.observacion3,
    d.observacion4,
    d.observacion5,
    d.observacion6,
    d.observacion7,
    d.observacion8

    
    FROM dckm2 d
    
    left join respuestas r1 on d.id_limpiezaGeneral = r1.id
    left join respuestas r2 on d.id_accionamientoCorrectoTornillos = r2.id
    left join respuestas r3 on d.id_presionAire125PSI = r3.id
    left join respuestas r4 on d.id_vaciarAguaUnidadMantenimientio = r4.id
    left join respuestas r5 on d.id_accionamientoCompuertaPolvos = r5.id
    left join respuestas r6 on d.id_inspeccionTornillosObjetosExtraños = r6.id
    left join respuestas r7 on d.id_ajusteManuelChumaceras = r7.id
    left join respuestas r8 on d.id_inspeccionPaletaTornilloSeco = r8.id
	left join user on d.id_creador= user.id
     where d.id_CKM2 =?;
  `
  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });
  
} catch (error) {
  console.error("Error al obtener los datos de la tabla dtp:", error);
  res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
}

} 
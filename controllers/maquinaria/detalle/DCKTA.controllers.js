import { pool } from "../../../src/db.js";

      


export const postDCKTA = async(req, res)=>{
  const {
    id_CKTA,
    id_grupoProduccion,
    id_visorFuncionandoNivelDeAguaVisible,
    id_accionamientoCorrectoSelenoideAlimentacion,
    id_accionamientoCorrectoSelenoideLlenado,
    observacion1,
    observacion2,
    observacion3,
    id_creador
    }= req.body
   
   
    try{
    
        const camposVacios = [];
    
    if (id_grupoProduccion === '') camposVacios.push('Grupo de Producción');
   
    if (camposVacios.length > 0) {
      const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
      console.log(mensaje);
      res.status(400).send({ error: mensaje });
    } else {
        const consulta=`INSERT INTO dckta (
            id_CKTA,
            id_grupoProduccion,
            id_visorFuncionandoNivelDeAguaVisible,
            id_accionamientoCorrectoSelenoideAlimentacion,
            id_accionamientoCorrectoSelenoideLlenado,
            observacion1,
            observacion2,
            observacion3,
            id_creador) Values(?,?,?,?,?,?,?,?,?)`;
            const [rows]= await pool.query(consulta,[
              id_CKTA,
              id_grupoProduccion,
              id_visorFuncionandoNivelDeAguaVisible,
              id_accionamientoCorrectoSelenoideAlimentacion,
              id_accionamientoCorrectoSelenoideLlenado,
              observacion1,
              observacion2,
              observacion3,
              id_creador
            ])
            res.status(200).send({ success: true, message: 'Datos guardados correctamente' });
            
          
    }
        
    }catch (err) {
        console.error('Error al guardar los datos:', err);
        res.status(500).send({ error: 'Error al guardar los datos' });
      }
}




export const getDCKCTA= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    SELECT 
    d.id_CKTA,
    d.fecha_creacion,
    r1.respuesta AS 'VisorNivel',
    r2.respuesta AS 'AccionamientoSelenoideAlimentaciónAgua',
    r3.respuesta AS 'AccionamientoSelenoideLlenadoTanque',
    CASE 
        WHEN d.observacion1 IS NOT NULL OR d.observacion1 != '' THEN d.observacion1
        ELSE NULL
    END AS observacion1,
    CASE 
        WHEN d.observacion2 IS NOT NULL OR d.observacion2 != '' THEN d.observacion2
        ELSE NULL
    END AS observacion2,
    CASE 
        WHEN d.observacion3 IS NOT NULL OR d.observacion3 != '' THEN d.observacion3
        ELSE NULL
    END AS observacion3
FROM 
    dckta d
left JOIN 
    respuestas r1 ON d.id_visorFuncionandoNivelDeAguaVisible = r1.id
left JOIN 
    respuestas r2 ON d.id_accionamientoCorrectoSelenoideAlimentacion = r2.id
left JOIN 
    respuestas r3 ON d.id_accionamientoCorrectoSelenoideAlimentacion = r3.id
WHERE 
    d.id_CKTA = ?;
    
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 
import { pool } from '../../src/db.js';

export const getCorrelativoMuestraBarro = async (req, res) => {
  const id_materia_prima=req.query.id_materia_prima
  try {
    // const consulta = 'SELECT MAX(id) AS ultimo FROM muestras';
    const consulta = 'SELECT id_materia_prima, MAX(id) AS ultimo FROM muestras where id_materia_prima=?';
    const [rows] = await pool.query(consulta,[id_materia_prima]);
    const ultimo = rows[0]?.ultimo || 0;
    let model=rows[0].id_materia_prima
    console.log('model', model)
    const Correlativo= ultimo+1;
    const correlativoFormateado = model===1 ? `B${Correlativo.toString().padStart(6, '0')}`: `A${Correlativo.toString().padStart(6, '0')}`;

    res.json({ correlativo: correlativoFormateado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la consulta', error: error.message });
  }
};


export const putCorrelativoMuestraBarro= async (req, res)=>{
  const datosApi= req.body.datosApi
  const lote=datosApi.codigo_lote
  const estado= parseInt(req.body.id_est)
  const muestra_id= datosApi.id
  const id_creador= req.body.id_creador
  const id_fase_aprobacion=req.body.materiaPrima=='Barro' ? 2 : 6
  const id_estado= 2
console.log('id_fase_aprobacion', req.body.materiaPrima)

  try {

    if(estado===2){
      const consulta= 'UPDATE muestras SET estado=? WHERE codigo_lote=?';
      const [UpdateRows] = await pool.query(consulta,[ estado, lote])
      console.log(UpdateRows)
      const consulta2= 'INSERT INTO etapas_barro(muestra_id, observaciones, id_creador, id_fase_aprobacion, id_estado) VALUE(?,?,?,?,?)'
      const [response]= await pool.query(consulta2,[muestra_id,'',id_creador,id_fase_aprobacion,id_estado])
      console.log(response)

      res.status(200).json({ 
        mensaje: ` El lote ${lote} fue aprobado correctamente y registrado en la tabla de Lotes Aprobados.` 
      });
    }
     else{
      const consulta= 'UPDATE muestras SET estado=? WHERE codigo_lote=?';
      await pool.query(consulta,[ estado, lote])
      res.status(200).json({mensaje: 
        `⚠️ El lote ${lote} ha sido rechazado y no continuará en el proceso de aprobación.`
        })
     }
  
     
    

  
  } catch (error) {
    res.status(201).json(error)
  }
  
}


export const GetLoteRegistroDeCamionadas = async (req, res) => {
  try {
    const consulta = 'SELECT MAX(id) AS ultimo FROM extracciones';
    const [rows] = await pool.query(consulta);
    const ultimo = rows[0]?.ultimo || 0;
    const Correlativo= ultimo+1;
    const correlativoFormateado = `CB${Correlativo.toString().padStart(6, '0')}`;

    res.json({ correlativo: correlativoFormateado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la consulta', error: error.message });
  }
};


export const postLoteRegistroDeCamionadas=async(req, res)=>{
  const payload=req.body
  const muestra_id=payload.muestra_id
  const lote=payload.codigo_lote
  const id_creador=parseInt(payload.id_creador)
  const observaciones=payload.observaciones

  try {
    if(!lote || isNaN(id_creador)){
      res.status(400).json({
        message:'Los datos son obligarotios',
        payload
      })
     }    

const consulta='insert into extracciones(muestra_id, correlativo_camionada, id_creador, comentario)values(?,?,?,?)'
     const rows= pool.query(consulta,[muestra_id, lote, id_creador, observaciones ])
     res.status(200).json({message:'Datos Guardados con exito', rows})
  } catch (error) {
    res.status(400).json({
      message:'error del seridor', error
    })
  }

     
    }
  
  





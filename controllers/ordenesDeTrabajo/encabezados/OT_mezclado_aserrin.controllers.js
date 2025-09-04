import { pool } from "../../../src/db.js";



export const postOT_mezclado_aserrin = async(req, res)=>{
    const estado= 2;
    const id_creador= req.body.id_creador;

    try{
        if(estado===''){
            console.log('Uno o varios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO ot_mezclado_aserrin(id_est,id_creador)Values(?, ?)';
        const [rows]= await pool.query(consulta,[ estado, id_creador])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const postDT_mezclado_aserrin = async(req, res)=>{
    const datos= req.body;
console.log(datos)

try{
             const consulta='INSERT INTO dt_mezclado_aserrin(id_ot_mezclado_aserrin, sacos, tiempo_mezclado, id_creador)values(?,?,?,?)';
        const [rows]= await pool.query(consulta,[ datos.id_ot_mezclado_aserrin,datos.sacos, datos.tiempo_mezclado, datos.id_creador])
        res.send({rows});

        console.log(rows)
    }catch(err){
        console.log(err)
    res.send(err)
    }}


export const Get_OT_mezclado_aserrin=async(req, res)=>{

   

 try {
     const consulta=
    `SELECT 'ot_mezclado_aserrin' AS encabezado, 'Mezclado de Aserrín' AS EncName, id, fecha_creacion, id_creador
 FROM ot_mezclado_aserrin 
 WHERE id_est = 2`

    const [rows]=await pool.query(consulta)
    console.log(rows)
     res.send(rows)  
 } catch (error) {
    res.status().json({error:'Error al obtener los datos, error del servidor'})
 }
}

export const Get_DT_mezclado_aserrin=async(req, res)=>{
   const id_ot_mezclado_aserrin=req.query.id_ot_mezclado_aserrin

 try {
     const consulta=
    `
    select 
da.id, 
da.id_ot_mezclado_aserrin, 
da.sacos, tiempo_mezclado, 
da.fecha_creacion, 
da.hora_creacion,
op.nombre
from dt_mezclado_aserrin da
left join user on da.id_creador = user.id
left join operarios op on user.nombre=op.id
where da.id_ot_mezclado_aserrin=?
    `

    const [rows]=await pool.query(consulta,[id_ot_mezclado_aserrin])
    console.log(rows)
     res.send(rows)  
 } catch (error) {
    res.status().json({error:'Error al obtener los datos, error del servidor'})
 }
}

export const putOT_mezclado_aserrin = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    // const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
    const horaCierre = new Date().toTimeString().split(' ')[0]; // '10:23:00'

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE ot_mezclado_aserrin SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};
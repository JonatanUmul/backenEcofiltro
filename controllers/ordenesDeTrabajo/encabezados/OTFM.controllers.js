import { pool } from "../../../src/db.js";



export const postOTFM = async(req, res)=>{
    const estado= 2;
    const id_creador=req.body.id_creador;
    const correlativo=req.body.correlativo;
    
    try{
        if(estado===''){
            console.log('Uno o varios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO otfm(id_est,id_creador, correlativo, estado_para_produccion)Values(?, ?, ?, ?)';
        const [rows]= await pool.query(consulta,[ estado, id_creador, correlativo, estado])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const putOTFM = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    // const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
    const horaCierre = new Date().toTimeString().split(' ')[0]; // '10:23:00'

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE otfm SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};
export const putOtfm_estado_para_produccion = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    console.log(estado, id)
    /*const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    // const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
    const horaCierre = new Date().toTimeString().split(' ')[0]; // '10:23:00'
*/
    try {
       
            const consulta = 'UPDATE otfm SET estado_para_produccion = ?  WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, id]);
            res.send({ rows });
 
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const GET_OTFM = async (req, res) => {

          const consulta='select MAX(id) as id from otfm'
        
 try {
    const [rows] = await pool.query(consulta);
   const id=parseInt(rows[0].id)+1
   const correlativo= `OTF${id.toString().padStart(6,'0')}`
   console.log(correlativo)
   res.send({ correlativo });
    
 } catch (error) {
    console.log(error)
 }
}

import { pool } from "../../../src/db.js";



export const postOTDMP = async(req, res)=>{
    const id_est= 2;
    const id_creador= req.body.id_creador;
   

    try{
    
       const consulta='INSERT INTO otdmp(id_creador, id_est)Values(?, ?)';
        const [rows]= await pool.query(consulta,[ id_creador, id_est])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const putOTDMP = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
console.log('estado de front',estado,id)
    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE otdmp SET id_est = ?, fecha_cierre = ?, hora_cierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};
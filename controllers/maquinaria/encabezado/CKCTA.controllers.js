import { pool } from "../../../src/db.js";



export const postCKCTA = async(req, res)=>{
    const id_estado= 2;
    const id_creador= req.body.id_creador;
    const id_maquina= req.body.id_maq
   

    try{
    
       const consulta='INSERT INTO ckcta (id_maquina, id_creador, id_estado)Values(?, ?, ?)';
        const [rows]= await pool.query(consulta,[id_maquina, id_creador, id_estado])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const putCKCTA = async (req, res) => {
    const estado = req.body.id_estado;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    // const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
    const horaCierre = new Date().toTimeString().split(' ')[0]; // '10:23:00'

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE ckcta SET id_estado = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};
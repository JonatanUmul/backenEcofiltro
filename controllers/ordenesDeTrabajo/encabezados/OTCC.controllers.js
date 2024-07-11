import { pool } from "../../../src/db.js";



export const postOTCC = async(req, res)=>{
    const estado= 2;
    const id_creador= req.body.id_creador;

    try{
        if(estado===''){
            console.log('Uno o svarios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO otcc(id_est,id_creador)Values(?, ?)';
        const [rows]= await pool.query(consulta,[estado, id_creador])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const putOTCC = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE otcc SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};

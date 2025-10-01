import {pool} from '../../src/db.js'


export const postregistroMuestra=async(req, res)=>{
    const datos= req.body
    const lote= datos.codigo_lote;
    const est= datos.estado;
    const ob= datos.observacion
    const enc_matprima=datos.enc_matprima
    const sacos=datos.sacos || 0


   

    try {
        const consulta =`INSERT INTO muestras(codigo_lote,estado,observaciones, id_materia_prima, sacos)VALUES(?,?,?, ?, ?)`

    const estado= datos.estado;
        const [rows]= await pool.query(consulta,[lote, est, ob, enc_matprima, sacos])

        res.send({rows})
    } catch (error) {
        console.log(error)
    }
}


export const putregistroMuestra= async(req, res)=>{
    console.log(req.body)
    const id_est= req.body.id_est
    const id= req.body.id
    const consulta='update muestras set estado=? where id=?'

    try {
        const [rows]= await pool.query(consulta, [id_est, id])
         res.send({ rows });
    } catch (error) {
        console.log(error)
        
    }
}
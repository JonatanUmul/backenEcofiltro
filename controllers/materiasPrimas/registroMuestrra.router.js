import {pool} from '../../src/db.js'


export const postregistroMuestra=async(req, res)=>{
    const datos= req.body
    const lote= datos.codigo_lote;
    const est= datos.estado;
    const ob= datos.observacion
    console.log(datos)

   

    try {
        const consulta =`INSERT INTO muestras(codigo_lote,estado,observaciones)VALUES(?,?,?)`

    const estado= datos.estado;
        const [rows]= await pool.query(consulta,[lote, est, ob])

        res.send({rows})
    } catch (error) {
        console.log(error)
    }
}
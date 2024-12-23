import { pool } from '../../src/db.js';

export const getTablaPorCodigos = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin, codigo, id } = req.params;
    console.log('Datos recibidos', fecha_creacion_inicio, fecha_creacion_fin, codigo, id);
    
    try {
        // Consulta SQL para seleccionar los estados
        let consulta = `
       WITH MaxTemperaturas AS (
    SELECT
        dth.fecha_real,
        dth.id_horno,
        dth.id_modelo,
        dth.id_turno,
        MAX(dth.tempCabezaIZ) AS max_tempCabezaIZ,
        MAX(dth.tempPieIZ) AS max_tempPieIZ,
        MAX(dth.tempCabezaDR) AS max_tempCabezaDR,
        MAX(dth.tempPieDR) AS max_tempPieDR
    FROM
        dth
    GROUP BY
        dth.fecha_real,
        dth.id_horno,
        dth.id_modelo,
        dth.id_turno
)
SELECT 

    CASE
        WHEN ufcrudos.codigo BETWEEN d.codigoInicio AND d.codigoFinal
        THEN ufcrudos.codigo
        ELSE 'Sin codigo'
    END AS codigos,
 
    ufcrudos.estadouf AS estadoCrudo,
    STR_TO_DATE(RIGHT(ufcrudos.codigo, 6), '%d%m%y') AS fecha_produccion,
    d.librasBarro,
    d.librasAserrin,
    d.librasAserrin2,
    (COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0)) AS formulatotal,
    d.id,
    aserradero.nombre_aserradero AS aserradero1,
    aserradero2.nombre_aserradero AS aserradero2,
    (aserradero1/aserradero2) as Aserraderos,
    tipocernido.tipoCernido AS tipocernido1,
    tipocernido2.tipoCernido AS tipocernido2,
    dotdmp.lbaserrin,
    dotdmp.lbaserrin2,
    tamañoAserrin.granulometria AS TamañoAserrin1,
    tamañoAserrin2.granulometria AS TamañoAserrin2,
    dotdmpb.iplastico,
    dotdmpb.lbbarro,
    dotdmpb.carcilla,
    dotdmpb.climo,
    dotdmpb.carena,
    dotdmpb.hbarro,
    enc_maq1.nombre_maq AS Mezcladora,
    codigosHornos.fecha_horneado AS fechaHorneado,
    codigosHornos.posicionHorno AS posicionHorno,
    codigosHornos.reduccionColor AS reduccionColor,
    codigosHornos.posicionHorno AS posicionHorno,
    codigosHornos.tasaFiltracion AS tasa,
    codigosHornos.estadouf AS estadouf,
    turno.turno AS turnoHorno,
    turno1.turno AS turnoCC,
    enc_maq.nombre_maq AS horno,
    ufmodelo.nombre_modelo AS ufmodelo,
    ROUND((mt.max_tempCabezaIZ + mt.max_tempPieIZ + mt.max_tempCabezaDR + mt.max_tempPieDR) / 4) AS promedio,
    impregnados.estado,
    insumos.insumo
FROM 
    dtp d
    LEFT JOIN ufcrudos ON ufcrudos.codigo BETWEEN d.codigoInicio AND d.codigoFinal
    LEFT JOIN aserradero ON d.id_Aserradero = aserradero.id
    LEFT JOIN aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id
    LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
    LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
    LEFT JOIN codigosHornos ON ufcrudos.codigo = codigosHornos.codigo
    LEFT JOIN enc_maq ON codigosHornos.horno = enc_maq.id_maq
    LEFT JOIN ufmodelo ON codigosHornos.modelo = ufmodelo.id_mod
    LEFT JOIN turno ON codigosHornos.turnohorneado = turno.id
    LEFT JOIN turno AS turno1 ON codigosHornos.turnocc = turno1.id
    LEFT JOIN dotdmp ON d.id =dotdmp.id_dtp
    LEFT JOIN tamañoAserrin ON dotdmp.id_granulometria=tamañoAserrin.id
    LEFT JOIN tamañoAserrin as tamañoAserrin2 ON  dotdmp.id_granulometria2=tamañoAserrin.id
    LEFT JOIN dotdmpb ON d.id=dotdmpb.id_dtp
	 LEFT JOIN enc_maq AS enc_maq1 ON d.id_mezcladora=enc_maq1.id_maq
    LEFT JOIN MaxTemperaturas mt 
        ON codigosHornos.fecha_horneado = mt.fecha_real
        AND codigosHornos.horno = mt.id_horno
        AND codigosHornos.modelo = mt.id_modelo
        AND codigosHornos.turnohorneado = mt.id_turno
    LEFT JOIN impregnados ON codigosHornos.codigo = impregnados.codigo
    LEFT JOIN insumos ON impregnados.tipodeplata = insumos.id
    
    
        WHERE 1=1`;

        const params = [];

        // Filtro de fechas
        if (fecha_creacion_inicio && fecha_creacion_inicio !== 'null') {
            if (fecha_creacion_fin && fecha_creacion_fin !== 'null') {
                consulta += ' AND codigosHornos.fecha_produccion BETWEEN ? AND ?';
                params.push(fecha_creacion_inicio, fecha_creacion_fin);
            } else {
                consulta += ' AND codigosHornos.fecha_produccion >= ?';
                params.push(fecha_creacion_inicio);
            }
        }

        if (fecha_creacion_fin && fecha_creacion_fin !== 'null' && (!fecha_creacion_inicio || fecha_creacion_inicio === 'null')) {
            consulta += ' AND codigosHornos.fecha_produccion <= ?';
            params.push(fecha_creacion_fin);
        }

        // Filtro de código
        if (codigo && codigo !== 'null') {
            consulta += ' AND codigosHornos.codigo = ?';
            params.push(codigo.toUpperCase());
        }

        // Filtro de id
        if ( id && id !== 'null') {
            consulta += ' AND d.id = ?';
            params.push(id);
        }

        console.log('Consulta generada:', consulta);
        console.log('Parámetros:', params);

        const [rows] = await pool.query(consulta, params);

        // Verifica si se encontraron resultados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }
    
        // Envía los resultados al cliente
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

import { pool } from '../../src/db.js';

export const getTablaPorCodigos = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin, codigo, id, id_modelo } = req.params;
    console.log('Datos recibidos', fecha_creacion_inicio, fecha_creacion_fin, codigo, id, id_modelo);
    
    try {
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
            FROM dth
            GROUP BY dth.fecha_real, dth.id_horno, dth.id_modelo, dth.id_turno
        )
        SELECT 
            CASE
                WHEN ufcrudos.codigo BETWEEN d.codigoInicio AND d.codigoFinal THEN ufcrudos.codigo
                ELSE 'Sin codigo'
            END AS codigos,
            CASE 
                WHEN d.id_cernidodetalle = 1 AND d.id_cernidodetalle2 = 1 THEN 'B'
                WHEN d.id_ufmodelo = 3 THEN 'A mini'
                when d.id_ufmodelo = 2 THEN 'A 18'
                ELSE 'A'
            END AS formulaTipo,
            ufcrudos.estadouf AS estadoCrudo,
            STR_TO_DATE(RIGHT(ufcrudos.codigo, 6), '%d%m%y') AS fecha_produccion,
            d.librasBarro,
            d.librasAserrin,
            d.librasAserrin2,
            (COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0)) AS formulatotal,
            d.id,
            aserradero.nombre_aserradero AS aserradero_principal,
            aserradero2.nombre_aserradero AS aserradero_secundario,
            tipocernido.tipoCernido AS tipocernido_principal,
            tipocernido2.tipoCernido AS tipocernido_secundario,
            dotdmp.lbaserrin,
            dotdmp.lbaserrin2,
            dotdmp.mayor_2mm,
            dotdmp.entre_2_y_05mm,
            dotdmp.menor_05mm,
            tamañoAserrin.granulometria AS tamañoAserrin_principal,
            tamañoAserrin2.granulometria AS tamañoAserrin_secundario,
            dotdmpb.iplastico,
            dotdmpb.lbbarro,
            dotdmpb.carcilla,
            dotdmpb.climo,
            dotdmpb.carena,
            dotdmpb.hbarro,
            limB.limite_liquido,
            limB.limite_plastico,
            limB.indice_plastico,
            enc_maq1.nombre_maq AS mezcladora,
            codigosHornos.fecha_horneado AS fechaHorneado,
            codigosHornos.fecha_creacion AS fechaCC,
            codigosHornos.posicionHorno AS posicionHorno,
            codigosHornos.reduccionColor AS reduccionColor,
            codigosHornos.tasaFiltracion AS tasa,
            codigosHornos.estadouf AS estadouf,
            turno.turno AS turnoHorno,
            turno1.turno AS turnoCC,
            enc_maq.nombre_maq AS horno,
            ufmodelo.nombre_modelo AS ufmodelo,
            ROUND((COALESCE(mt.max_tempCabezaIZ, 0) + COALESCE(mt.max_tempPieIZ, 0) + COALESCE(mt.max_tempCabezaDR, 0) + COALESCE(mt.max_tempPieDR, 0)) / 4) AS promedio,
            dtip.fecha_real AS fecha_impregnacion,
            dtip.id,
             impregnados.estado AS estadoImpregnado,
				insumos.insumo AS plata1,
            insumos2.insumo AS plata2
        FROM 
            dtp d
            LEFT JOIN ufcrudos ON ufcrudos.codigo BETWEEN d.codigoInicio AND d.codigoFinal 
                AND ufcrudos.modelo = d.id_ufmodelo 
                AND ufcrudos.fecha_produccion = d.fecha_real
         
            LEFT JOIN aserradero ON d.id_Aserradero = aserradero.id
            LEFT JOIN aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id
            LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
            LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
            LEFT JOIN codigosHornos ON ufcrudos.codigo = codigosHornos.codigo
            LEFT JOIN enc_maq ON codigosHornos.horno = enc_maq.id_maq
            LEFT JOIN ufmodelo ON ufcrudos.modelo = ufmodelo.id_mod
            LEFT JOIN turno ON codigosHornos.turnohorneado = turno.id
            LEFT JOIN turno AS turno1 ON codigosHornos.turnocc = turno1.id
            LEFT JOIN dotdmp ON d.id = dotdmp.id_dtp
            LEFT JOIN tamañoAserrin ON dotdmp.id_granulometria = tamañoAserrin.id
            LEFT JOIN tamañoAserrin AS tamañoAserrin2 ON dotdmp.id_granulometria2 = tamañoAserrin2.id
            LEFT JOIN dotdmpb ON d.id = dotdmpb.id_dtp
            LEFT JOIN Limites_Atterberg_Barro limB ON d.fecha_real = limB.fecha_produccion
            LEFT JOIN enc_maq AS enc_maq1 ON d.id_mezcladora = enc_maq1.id_maq
            LEFT JOIN MaxTemperaturas mt 
                ON codigosHornos.fecha_horneado = mt.fecha_real
                AND codigosHornos.horno = mt.id_horno
                AND codigosHornos.modelo = mt.id_modelo
                AND codigosHornos.turnohorneado = mt.id_turno
              LEFT JOIN impregnados ON codigosHornos.codigo = impregnados.codigo AND codigosHornos.modelo=impregnados.modelo
          LEFT JOIN dtip ON impregnados.codigo BETWEEN dtip.codigoInicio AND dtip.codigoFinal AND impregnados.modelo=dtip.id_modelo
          LEFT JOIN insumos ON 
			 CASE
                WHEN impregnados.codigo BETWEEN dtip.codigoInicio AND dtip.codigoFinal AND impregnados.modelo=dtip.id_modelo THEN dtip.TipoPlata
                ELSE ''
            END = insumos.id
         LEFT JOIN insumos AS insumos2 ON 
			 CASE
                WHEN impregnados.codigo BETWEEN dtip.codigoInicio AND dtip.codigoFinal AND impregnados.modelo=dtip.id_modelo THEN dtip.TipoPlata2
                ELSE ''
            END  = insumos2.id
            
        WHERE 1=1
        `;

        const params = [];

        if (fecha_creacion_inicio && fecha_creacion_inicio !== 'null') {
            if (fecha_creacion_fin && fecha_creacion_fin !== 'null') {
                consulta += ' AND ufcrudos.fecha_produccion BETWEEN ? AND ?';
                params.push(fecha_creacion_inicio, fecha_creacion_fin);
            }
                } else {
                consulta += ' AND ufcrudos.fecha_produccion >= ?';
                params.push(fecha_creacion_inicio);
            }
        

        if (codigo && codigo !== 'null') {
            consulta += ' AND ufcrudos.codigo = ?';
            params.push(codigo.toUpperCase());
        }

        if (id_modelo && id_modelo !== 'null') {
            consulta += ' AND ufcrudos.modelo = ?';
            params.push(id_modelo);
        }

        consulta += ' ORDER BY d.fecha_real ASC';
        
        console.log('Parámetros:', params);

        const [rows] = await pool.query(consulta, params);

        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }
    
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

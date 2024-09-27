import { pool } from "../../src/db.js";

export const postPlanMes = async (req, res) => {

    const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;

      const consulta =
        "INSERT INTO planificaciones_mensuales(fecha_inicio,fecha_fin, cantidad_planificada, proceso_id,id_creador) VALUES (?,?,?,?,?)";
      
      try {
        const [rows] = await pool.query(consulta, [
            fecha_inicio,
            fecha_fin,
            planificado,
            proceso_id,
            id_creador
          ]);
          res.send({ rows });
      } catch (error) {
        
        console.error(error)
      }
       
    }



    export const getPlanMes = async (req, res) => {

        // const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;
    
          const consulta =
            `SELECT 
                planM.fecha_inicio,
                planM.fecha_fin,
                planM.cantidad_planificada,
                procesos.proceso,
                operarios.Nombre AS CreadordePlan

                FROM planificaciones_mensuales planM

                left JOIN procesos ON planM.proceso_id= procesos.id
                left JOIN user ON planM.id_creador=user.id
                left JOIN operarios ON user.Nombre = operarios.id`          
          try {
            const [rows] = await pool.query(consulta);
              res.send({ rows });
          } catch (error) {
            
            console.error(error)
          }
           
        }
    
    





    export const postPlanDay = async (req, res) => {

        const {fecha, cantidad_planificada, proceso_id, id_creador}=req.body;
    
          const consulta =
            "INSERT INTO planificaciones_diarias(fecha, cantidad_planificada, proceso_id, id_creador) VALUES (?,?,?,?)";
          
          try {
            const [rows] = await pool.query(consulta, [
                fecha,
                cantidad_planificada,
                proceso_id,
                id_creador
              ]);
              res.send({ rows });
          } catch (error) {
            
            console.error(error)
          }
           
        }
    
    

        export const getPlanDay = async (req, res) => {

            // const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;
        
              const consulta =
                `
                SELECT 
                pland.fecha,
                pland.cantidad_planificada,
                procesos.proceso,
                operarios.Nombre AS CreadordePlan

                FROM planificaciones_diarias pland
 
                JOIN procesos ON pland.proceso_id= procesos.id
                JOIN user ON pland.id_creador=user.id
                JOIN operarios ON user.Nombre = operarios.id
                `          
              try {
                const [rows] = await pool.query(consulta);
                  res.send({ rows });
              } catch (error) {
                
                console.error(error)
              }
               
            }


            export const getPlanCumplido = async (req, res) => {
                const hoy = req.params.hoy;
            
                // Validar la fecha recibida
                if (!hoy) {
                    return res.status(400).send({ error: 'La fecha es requerida.' });
                }
            
                console.log(hoy);
            
                const consulta = `
             SELECT 
                        pland.fecha,
                        pland.cantidad_planificada,
                        procesos.proceso,
                        operarios.Nombre AS CreadordePlan,
                        COALESCE(Aserrin_seco, 0) AS Aserrin_seco,
                      	(Aserrin_seco / NULLIF(cantidad_planificada, 0)*100) AS "PromedioASerrinSeco",
                        COALESCE(CernidoAserrin, 0) AS CernidoAserrin,
                        (CernidoAserrin / NULLIF(cantidad_planificada, 0)*100) AS "PromedioCernido",
                        COALESCE(Barropulverizado, 0) AS Barropulverizado,
                        (Barropulverizado / NULLIF(cantidad_planificada, 0)*100) AS "PromedioBarropulverizado",
                        COALESCE(Produccion20lts, 0) AS Produccion20lts,
                        (Produccion20lts / NULLIF(cantidad_planificada, 0)*100) AS "PromedioProduccion20lts",
                        COALESCE(Produccion18lts, 0) AS Produccion18lts,
                        (Produccion18lts / NULLIF(cantidad_planificada, 0)*100) AS "PromedioProduccion18lts",
                        COALESCE(ProduccionMini, 0) AS ProduccionMini,
                        (ProduccionMini / NULLIF(cantidad_planificada, 0)*100) AS "PromedioProduccionMini",
                        COALESCE(pulidoBase, 0) AS pulidoBase,
                        (pulidoBase / NULLIF(cantidad_planificada, 0)*100) AS "PromediopulidoBase",
                        COALESCE(LlenadoCarros, 0) AS LlenadoCarros,
                        (LlenadoCarros / NULLIF(cantidad_planificada, 0)*100) AS "PromedioLlenadoCarros",
                        COALESCE(Horneado20LTS, 0) AS  Horneado20LTS,
                        (Horneado20LTS / NULLIF(cantidad_planificada, 0)*100) AS "PromedioHorneado20LTS",
                        COALESCE(Horneado18LTS, 0) AS Horneado18LTS,
                        (Horneado18LTS / NULLIF(cantidad_planificada, 0)*100) AS "PromedioHorneado18LTS",
                        COALESCE(HorneadoMini, 0) AS HorneadoMini,
                        (HorneadoMini / NULLIF(cantidad_planificada, 0)*100) AS "PromedioHorneadoMini",
                        COALESCE(Cc20Lts, 0) AS Cc20Lts,
                        (Cc20Lts / NULLIF(cantidad_planificada, 0)*100) AS "PromedioCc20Lts",
                        COALESCE(Cc18Lts, 0) AS Cc18Lts,
                        (Cc18Lts / NULLIF(cantidad_planificada, 0)*100) AS "PromedioCc18Lts",
                        COALESCE(CcMini, 0) AS CcMini,
                        (CcMini / NULLIF(cantidad_planificada, 0)*100) AS "PromedioCcMini",
                        COALESCE(Impregnados20LTS, 0) AS Impregnados20LTS,
                        (Impregnados20LTS / NULLIF(cantidad_planificada, 0)*100) AS "PromedioImpregnados20LTS",
                        COALESCE(Impregnados18LTS, 0) AS Impregnados18LTS,
                        (Impregnados18LTS / NULLIF(cantidad_planificada, 0)*100) AS "PromedioImpregnados18LTS",
                        COALESCE(ImpregnadosMini, 0) AS ImpregnadosMini,
                        (ImpregnadosMini / NULLIF(cantidad_planificada, 0)*100) AS "PromedioImpregnadosMini"
                        
                        
                    FROM planificaciones_diarias pland
                    JOIN procesos ON pland.proceso_id = procesos.id
                    JOIN user ON pland.id_creador = user.id
                    JOIN operarios ON user.Nombre = operarios.id 
                    LEFT JOIN (
                        SELECT fecha_creacion, SUM(cantidad_final) AS Aserrin_seco
                        FROM daserrin 
                        GROUP BY fecha_creacion
                    ) AS daserrin ON daserrin.fecha_creacion = pland.fecha AND procesos.proceso = 'Aserrin Seco' /*---------- ya*/
                    LEFT JOIN (
                        SELECT fecha_creacion, SUM(CantidadFinal) AS CernidoAserrin
                        FROM dtca1 
                        GROUP BY fecha_creacion
                    ) AS dtca1 ON dtca1.fecha_creacion = pland.fecha AND procesos.proceso = 'Cernido Aserrin'  /*---------- ya*/
                    LEFT JOIN (
                        SELECT fecha_creacion, SUM(cantidad) AS Barropulverizado
                        FROM dtpv 
                        GROUP BY fecha_creacion
                    ) AS dtpv ON dtpv.fecha_creacion = pland.fecha AND procesos.proceso = 'Barro pulverizado'
                    LEFT JOIN (
                        SELECT fecha_real, SUM(producido) AS Produccion20lts
                        FROM dtp
                        WHERE id_ufmodelo = 1
                        GROUP BY fecha_real
                    ) AS dtp20 ON dtp20.fecha_real = pland.fecha AND procesos.proceso = 'Produccion 20lts'
                    LEFT JOIN (
                        SELECT fecha_real, SUM(producido) AS Produccion18lts
                        FROM dtp
                        WHERE id_ufmodelo = 2
                        GROUP BY fecha_real
                    ) AS dtp18 ON dtp18.fecha_real = pland.fecha AND procesos.proceso = 'Produccion 18lts'
                    LEFT JOIN (
                        SELECT fecha_real, SUM(producido) AS ProduccionMini
                        FROM dtp
                        WHERE id_ufmodelo = 3
                        GROUP BY fecha_real
                    ) AS dtpMini ON dtpMini.fecha_real = pland.fecha AND procesos.proceso = 'Produccion Mini'
                    LEFT JOIN (
                        SELECT fecha_creacion, SUM(pulido) AS pulidoBase
                        FROM dcpb
                        GROUP BY fecha_creacion
                    ) AS dcpb ON dcpb.fecha_creacion = pland.fecha AND procesos.proceso = 'Pulido Base'
                    LEFT JOIN (
                        SELECT fecha_creacion, SUM(cantidad) AS LlenadoCarros
                        FROM ctt
                        GROUP BY fecha_creacion
                    ) AS ctt ON ctt.fecha_creacion = pland.fecha AND procesos.proceso = 'Llenado Carros UF Crudos'
                   
						  LEFT JOIN (
                        SELECT fecha_creacion, SUM(horneado) AS Horneado20LTS
                        FROM dthh
                        WHERE id_modelo = 1
                        GROUP BY fecha_creacion
                    ) AS dthh20 ON dthh20.fecha_creacion = pland.fecha  AND procesos.proceso = 'Horneados 20lts'
                    LEFT JOIN (
                        SELECT fecha_creacion, id_modelo, SUM(horneado) AS Horneado18LTS
                        FROM dthh
                        WHERE id_modelo = 2
                        GROUP BY fecha_creacion, id_modelo
                    ) AS dthh18 ON dthh18.fecha_creacion = pland.fecha AND procesos.proceso = 'Horneado 18lts'
                
                    LEFT JOIN (
                        SELECT fecha_creacion, id_modelo, SUM(horneado) AS HorneadoMini
                        FROM dthh
                        WHERE id_modelo = 3
                        GROUP BY fecha_creacion, id_modelo
                    ) AS dthhMini ON dthhMini.fecha_creacion = pland.fecha AND procesos.proceso = 'Horneados Mini'
                    LEFT JOIN (
                        SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc20Lts
                        FROM dtcc Cc
                        LEFT JOIN dthh ON Cc.id_dthh = dthh.id
                        WHERE dthh.id_modelo = 1
                        GROUP BY Cc.fecha_creacion, dthh.id_modelo
                    ) AS Cc20 ON Cc20.fecha_creacion = pland.fecha AND procesos.proceso = 'CC 20 litros'
                    LEFT JOIN (
                        SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc18Lts
                        FROM dtcc Cc
                        LEFT JOIN dthh ON Cc.id_dthh = dthh.id
                        WHERE dthh.id_modelo = 2
                        GROUP BY Cc.fecha_creacion, dthh.id_modelo
                    ) AS Cc18 ON Cc18.fecha_creacion = pland.fecha AND procesos.proceso = 'CC 18 litros'
                    LEFT JOIN (
                        SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS CcMini
                        FROM dtcc Cc
                        LEFT JOIN dthh ON Cc.id_dthh = dthh.id
                        WHERE dthh.id_modelo = 3
                        GROUP BY Cc.fecha_creacion, dthh.id_modelo
                    ) AS CcMini ON CcMini.fecha_creacion = pland.fecha AND procesos.proceso = 'CC Mini'
                    LEFT JOIN (
                        SELECT fechaCreacion, id_modelo, SUM(impregnados) AS Impregnados20LTS
                        FROM dtip
                        WHERE id_modelo = 1
                        GROUP BY fechaCreacion, id_modelo
                    ) AS dtip20 ON dtip20.fechaCreacion = pland.fecha AND procesos.proceso = 'Impregnados 20lts'
                    LEFT JOIN (
                        SELECT fechaCreacion, id_modelo, SUM(impregnados) AS Impregnados18LTS
                        FROM dtip
                        WHERE id_modelo = 2 
                        GROUP BY fechaCreacion, id_modelo
                    ) AS dtip18 ON dtip18.fechaCreacion = pland.fecha AND procesos.proceso = 'Impregnados 18lts'
                    LEFT JOIN (
                        SELECT fechaCreacion, id_modelo, SUM(impregnados) AS ImpregnadosMini
                        FROM dtip
                        WHERE id_modelo = 3
                        GROUP BY fechaCreacion, id_modelo
                    ) AS dtipMini ON dtipMini.fechaCreacion = pland.fecha AND procesos.proceso = 'Impregnados Mini'
                    WHERE pland.fecha = '${hoy}'
                    ORDER BY pland.id ASC
                `;
            
                try {
                    const [rows] = await pool.query(consulta);
                      res.send({ rows });
                      console.log(rows)
                  } catch (error) {
                    
                    console.error(error)
                  }
                   
                }
    
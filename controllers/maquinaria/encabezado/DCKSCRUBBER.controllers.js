import { pool } from "../../../src/db.js";

export const postDCKSCRUBBER = async (req, res) => {
  console.log(req);
  const {
    id_dckscrubber,
    id_creador,
    area_scrubber_despejada,
    nivel_agua_correcto,
    flote_buenas_condiciones,
    agua_limpia,
    llave_paso_abierta,
    existe_agua_soda,
    tablero_principal_libre,
    breaker_principal_on,
    observaciones,
    id_responsable_seguimiento_ckinicial
  } = req.body;

  try {
    const consulta = `
    insert into dckscrubber
    (
    id_dckscrubber,
    id_creador,
    area_scrubber_despejada,
    nivel_agua_correcto,
    flote_buenas_condiciones,
    agua_limpia,
    llave_paso_abierta,
    existe_agua_soda,
    tablero_principal_libre,
    breaker_principal_on,
    observaciones,
    id_responsable_seguimiento_ckinicial

    ) values(
    ?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    const [rows] = await pool.query(consulta, [
      id_dckscrubber,
      id_creador,
      area_scrubber_despejada,
      nivel_agua_correcto,
      flote_buenas_condiciones,
      agua_limpia,
      llave_paso_abierta,
      existe_agua_soda,
      tablero_principal_libre,
      breaker_principal_on,
      observaciones,
      id_responsable_seguimiento_ckinicial
    ]);
    res.send({ rows });
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};

export const putCKSCRUBBER = async (req, res) => {
  const estado = req.body.id_estado;
  const id = req.body.id;
  const fechaCierre = new Date().toISOString().split("T")[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
  // const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM
  const horaCierre = new Date().toTimeString().split(" ")[0]; // '10:23:00'

  try {
    if (estado === "" || id === "") {
      console.log("Uno o varios datos están vacíos");
    } else {
      const consulta =
        "UPDATE ckscrubber SET id_estado = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?";
      const [rows] = await pool.query(consulta, [
        estado,
        fechaCierre,
        horaCierre,
        id,
      ]);
      res.send({ rows });
    }
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};
export const putDCKSCRUBBER = async (req, res) => {
  const dateTime_arranque_motor = new Date();
  console.log(dateTime_arranque_motor);

  const {
    id_dckscrubber,
    breaker_qf1_on,
    breaker_qf2_on,
    breaker_qf3_on,
    breaker_qf4_on,
    hongo_emergencia_quitado,
    ventilador_qf1_on,
    bomba_recirculacion_qf2_on,
    dosificador_quimicos_on,
    id_responsable_seguimiento_ckmotores
  } = req.body;
console.log( id_responsable_seguimiento_ckmotores)
  const consulta = `
    UPDATE dckscrubber 
    SET 
      dateTime_arranque_motor = ?,
      breaker_qf1_on = ?,
      breaker_qf2_on = ?,
      breaker_qf3_on = ?,
      breaker_qf4_on = ?,
      hongo_emergencia_quitado = ?,
      ventilador_qf1_on = ?,
      bomba_recirculacion_qf2_on = ?,
      dosificador_quimicos_on= ?,
      id_responsable_seguimiento_ckmotores=?
    WHERE id_dckscrubber = ?
  `;

  try {
    const [resultado] = await pool.query(consulta, [
      dateTime_arranque_motor,
      breaker_qf1_on,
      breaker_qf2_on,
      breaker_qf3_on,
      breaker_qf4_on,
      hongo_emergencia_quitado,
      ventilador_qf1_on,
      bomba_recirculacion_qf2_on,
      dosificador_quimicos_on,
      id_responsable_seguimiento_ckmotores,
      id_dckscrubber
    ]);

    console.log("Respuesta del server:", resultado);
    res.json({ msg: "Registro actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar dckscrubber" });
  }
};

export const getDCKSCRUBBER= async(req, res)=>{

const id_dckscrubber=req.params.id
  const consulta =`
  SELECT
  sc.id,
  sc.id_dckscrubber,
  op.nombre as aquiensereportoInicial,
  op1.nombre as aquiensereportoMotores,
  sc.id_creador,
  sc.fecha,
  sc.hora_inicio,

  -- Checklist (1 = Sí, 2 = No, NULL = '')
  CASE sc.area_scrubber_despejada   WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS area_scrubber_despejada,
  CASE sc.nivel_agua_correcto       WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS nivel_agua_correcto,
  CASE sc.flote_buenas_condiciones  WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS flote_buenas_condiciones,
  CASE sc.agua_limpia               WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS agua_limpia,
  CASE sc.llave_paso_abierta        WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS llave_paso_abierta,
  CASE sc.existe_agua_soda          WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS existe_agua_soda,
  CASE sc.tablero_principal_libre   WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS tablero_principal_libre,
  CASE sc.breaker_principal_on      WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS breaker_principal_on,

  sc.observaciones,
  sc.dateTime_arranque_motor,

  CASE sc.breaker_qf1_on            WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS breaker_qf1_on,
  CASE sc.breaker_qf2_on            WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS breaker_qf2_on,
  CASE sc.breaker_qf3_on            WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS breaker_qf3_on,
  CASE sc.breaker_qf4_on            WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS breaker_qf4_on,
  CASE sc.hongo_emergencia_quitado  WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS hongo_emergencia_quitado,
  CASE sc.ventilador_qf1_on         WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS ventilador_qf1_on,
  CASE sc.bomba_recirculacion_qf2_on WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS bomba_recirculacion_qf2_on,
  CASE sc.dosificador_quimicos_on   WHEN 1 THEN 'Sí' WHEN 2 THEN 'No' ELSE '' END AS dosificador_quimicos_on


FROM dckscrubber sc
left join operarios op on sc.id_responsable_seguimiento_ckinicial=op.id
left join operarios op1 on sc.id_responsable_seguimiento_ckmotores=op1.id

where sc.id_dckscrubber=?
ORDER BY sc.fecha DESC, sc.hora_inicio DESC`

try {
  const [rows]= await pool.query(consulta,[id_dckscrubber]) 
  res.send({rows})
  console.log(rows)
} catch (error) {
  res.send().json({mensaje:'Error al obtener los datos'})
}
}
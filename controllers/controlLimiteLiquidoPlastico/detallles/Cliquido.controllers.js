import { pool } from "../../../src/db.js";

// id_CLP: id.toString(),
// id_creador:id_creador,
// PesoDeRecipiente:formData.PesoDeRecipiente,
// NoGolpes:formData.NoGolpes,
// PesoDeRecipienteYMaterialHumedo:
export const postcliquido = async (req, res) => {
  const { id_OTSaserrin, id_MP, id_asrd, id_patio, cantidad_inicial, cantidad_final, id_creador  }=req.body;
  console.log(id_OTSaserrin);
  try {
    if (
      id_OTSaserrin===""||
      id_MP===""||
      id_asrd === "" ||
      id_patio === "" ||
      cantidad_inicial === "" ||
      cantidad_final === ""
    ) {
      console.log("Uno o varios datos están vacíos");
    } else {
      const consulta =
        "INSERT INTO daserrin(id_OTSaserrin, id_MP, id_asrdSMP, id_patio, cantidad_inicial, cantidad_final, id_creador) VALUES (?, ?, ?, ?, ?,?, ?)";
      const [rows] = await pool.query(consulta, [
      id_OTSaserrin,
      id_MP,
      id_asrd,
      id_patio,
      cantidad_inicial,
      cantidad_final,
      id_creador
      ]);
      res.send({ rows });
    }
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};


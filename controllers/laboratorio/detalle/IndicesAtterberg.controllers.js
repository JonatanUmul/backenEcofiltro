import { pool } from "../../../src/db.js";

export const IndicesAtterberg = async (req, res) => {
  const datos= req.body.values;
  const codigoLote= req.body.codigoLote

  try {
    const consulta = `INSERT INTO Limites_Atterberg_Barro(
        codigo_lote,
      
    limite_liquido,
    limite_plastico,
    indice_plastico,
    arcilla,
    arena,
    limo
    ) Values(?,?,?,?,?,?,?)`;
    const [rows] = await pool.query(consulta, [
      codigoLote,
      // datos.id_creador,
      datos.LimiteLiquido,
      datos.LimitePlastico,
      datos.IndicePlastico,
      datos.arcilla,
      datos.arena,
      datos.limo,
    ]);
    res.send({ rows });
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};

export const GetIndicesAtterberg = async (req, res) => {
  const fecha = req.params.fecha;
  console.log("Fecha en el backend:", fecha);

  try {
    const consulta = `SELECT * FROM Limites_Atterberg_Barro WHERE DATE(fecha_produccion) = ?`;
    const [rows] = await pool.query(consulta, [fecha]);

    console.log("Filas encontradas:", rows);
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error("Error al obtener los datos de la tabla dtp:", err);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la tabla dtp" });
  }
};


export const IndicesAtterbergCod = async (req, res) => {
  try {
    const { codLote } = req.query;

console.log(codLote)
    const sql = `
      SELECT
        lb.fecha_creacion,
        lb.codigo_lote,
        lb.id_creador,
        lb.limite_liquido,
        lb.limite_plastico,
        lb.indice_plastico,
        lb.arcilla,
        lb.arena,
        lb.limo,
        op.Nombre AS responsable
      FROM limites_atterberg_barro lb
      LEFT JOIN user us ON lb.id_creador = us.id           
      LEFT JOIN operarios op ON op.id = lb.id_creador
      WHERE lb.codigo_lote = ?
    `;

    const [rows] = await pool.query(sql, [codLote]);

    if (!rows.length) {
      // 404 si no se encuentra el lote
      return res.status(404).json({ mensaje: 'Lote no encontrado' });
    }

    res.json({ datos: rows });
  } catch (error) {
    // 500 → error interno
    res.status(500).json({
      mensaje: 'Ocurrió un problema al procesar la solicitud',
      detalle: error.message,    
    });
  
  }
};



export const IndicesAtterbergAprobados = async (req, res) => {
  try {


    const sql =`SELECT
    mu.id, 
    mu.codigo_lote,
    mu.fecha,
    lt.limite_liquido,
    lt.limite_plastico,
    lt.indice_plastico,
    lt.arcilla,
    lt.arena,
    lt.limo,
    mu.observaciones
  FROM muestras mu 
  LEFT JOIN limites_atterberg_barro lt ON lt.codigo_lote = mu.codigo_lote
  WHERE mu.estado=2 `;

    const [result] = await pool.query(sql);
    res.send(result)
  } catch (error) {
    console.error('Error no se encontraron datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

import { Router } from "express";
import { getTablaLab, putTablaLab } from "../../../controllers/tablaLab/TablaLab.controller.js";
import { getTablaPorCodigos } from "../../../controllers/tablaLab/TablaPorCodigo.controller.js"

const router = Router();

router.get('/TablaLab', getTablaLab );
router.get('/TablaPorCodigos/:fecha_creacion_inicio/:fecha_creacion_fin/:codigo', getTablaPorCodigos );
router.put('/TablaLab', putTablaLab)
export default router;

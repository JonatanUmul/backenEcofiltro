import { Router } from "express";
import {
  getDTP,
  postDTP,
  getDTPPS,
  DtpUltimoCodigo,
  DTP_CodigosProduccion,
  DTP_MermasProduccion,
  DTP_CodigosProduccion_id_dtp,
  UPDATE_DTP_CodigosProduccion,
  UPDATE_CodigosProduccion,
  Update_SerieEcofiltroTasa,
  Update_SerieEcofiltroTasaPunto,
  DTP_CodigosAprobados
} from "../../../../controllers/ordenesDeTrabajo//detallles/DTP.controllers.js";

const router = Router();

router.post("/DTP", postDTP);

router.post("/DTP_CodigosProduccion", DTP_CodigosProduccion);
router.put("/DTP_CodigosProduccion", UPDATE_DTP_CodigosProduccion);
router.get("/DTP_MermasProduccion", DTP_MermasProduccion);
router.put("/Update_SerieEcofiltroTasa", Update_SerieEcofiltroTasa);
router.put("/Update_SerieEcofiltroTasaPunto", Update_SerieEcofiltroTasaPunto);
router.put("/UPDATE_CodigosProduccion", UPDATE_CodigosProduccion);
router.get("/DTP_CodigosProduccion/:id_dtp/:id_proceso", DTP_CodigosProduccion_id_dtp);
router.get("/DTP_CodigosAprobados/:id_proceso/:id_modelo", DTP_CodigosAprobados);
router.get("/DTP/:id", getDTP);
router.get("/DTPUltimoCodigo/:modelo", DtpUltimoCodigo);
router.get("/DTP/:fecha_creacion_inicio/:fecha_creacion_fin/:id_ufmodelo/:id_grupoproduccion",getDTPPS);

export default router;

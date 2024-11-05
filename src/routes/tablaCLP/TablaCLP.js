import { Router } from "express";
import { getTablaCLP, putTablaCLP } from "../../../controllers/tablaCLP/TablaCLP.controller.js";

const router = Router();

router.get('/TablaCLP', getTablaCLP );
router.put('/TablaCLP', putTablaCLP)
export default router;

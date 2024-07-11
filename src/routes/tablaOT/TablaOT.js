import { Router } from "express";
import { getTablaOT } from "../../../controllers/tablaOT/TablaOT.controller.js";


const router = Router();

router.get('/TablaOT', getTablaOT );

export default router;

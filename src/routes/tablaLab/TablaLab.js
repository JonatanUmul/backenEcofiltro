import { Router } from "express";
import { getTablaLab } from "../../../controllers/tablaLab/TablaLab.controller.js";


const router = Router();

router.get('/TablaLab', getTablaLab );

export default router;

import { Router } from "express";
import { getTablaCP } from "../../../controllers/tablaCP/TablaCP.controller.js";


const router = Router();

router.get('/TablaCP', getTablaCP );

export default router;

import { Router } from "express";
import { getMantenimientoMaq } from "../../../controllers/tablaMantenimientoMaq/TablaMantenimientoMaq.controller.js";


const router = Router();

router.get('/MantenimientoMaq', getMantenimientoMaq );

export default router;

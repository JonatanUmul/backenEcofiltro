import { Router } from "express";
import { getTablaMaquinaria } from "../../../controllers/tablaMaquinaria/TablaMaquinaria.controller.js";


const router = Router();

router.get('/TablaMaquinaria', getTablaMaquinaria );

export default router;

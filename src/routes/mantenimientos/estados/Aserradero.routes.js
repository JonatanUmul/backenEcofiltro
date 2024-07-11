import { Router } from "express";
import { getEstados } from "../../../../controllers/mantenimientos/estados/Estados.controller.js";
// import { postNewEstado } from "../../../controllers/estados/NewEstado.controller.js";


const router = Router();

router.get('/Estadosroutes', getEstados );
router.get('/NewEstadoroutes', postNewEstado );

export default router;

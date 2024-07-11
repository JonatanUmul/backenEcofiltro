import { Router } from "express";
import { getModelos,  } from "../../../../controllers/mantenimientos/modelosUF/Modelos.controller.js"


const router = Router();

router.get('/ModelosUF', getModelos );


export default router;

import { Router } from "express";
import { getAreas  } from '../../../../controllers/mantenimientos/Areas/Areas.controller.js';


const router = Router();

router.get('/Area', getAreas);



export default router;

import { Router } from "express";
import {  PostGranulometria, getGranulometria } from '../../../../controllers/mantenimientos/granulometria/Granulometria.controller.js';


const router = Router();

router.get('/granulometria', getGranulometria );
router.post('/granulometria', PostGranulometria );


export default router;

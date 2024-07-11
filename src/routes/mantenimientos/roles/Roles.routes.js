import { Router } from "express";
import { getRoles, postRoles } from "../../../../controllers/mantenimientos/roles/Roles.controller.js";


const router = Router();

router.get('/Rolrouter', getRoles );
router.post('/Rolrouter', postRoles );

export default router;

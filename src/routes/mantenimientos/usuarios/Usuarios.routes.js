import { postUsuarios, getUsuarios } from '../../../../controllers/mantenimientos/usuarios/Usuarios.controller.cjs';
import { Router } from 'express';

// Crea una instancia del enrutador
const router = Router();

router.post('/UsuariosR', postUsuarios);
router.get('/UsuariosR', getUsuarios);

export default router;

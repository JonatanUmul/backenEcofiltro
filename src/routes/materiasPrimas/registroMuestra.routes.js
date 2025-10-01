import {Router} from 'express'
import {postregistroMuestra, putregistroMuestra} from '../../../controllers/materiasPrimas/registroMuestrra.router.js'

const router=Router()

router.post('/registroMuestra', postregistroMuestra)
router.put('/registroMuestra', putregistroMuestra)

export default router
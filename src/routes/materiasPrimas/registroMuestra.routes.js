import {Router} from 'express'
import {postregistroMuestra} from '../../../controllers/materiasPrimas/registroMuestrra.router.js'

const router=Router()

router.post('/registroMuestra', postregistroMuestra)

export default router
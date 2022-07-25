import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as honeydo from '../controllers/honeydo.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, honeydo.index)         // Read all
router.post('/', checkAuth, honeydo.create)       // Create
router.get('/:id', checkAuth, honeydo.show)       // Read
router.put('/:id', checkAuth, honeydo.update)     // Update
router.delete('/:id', checkAuth, honeydo.delete)  // Delete

export {
  router
}
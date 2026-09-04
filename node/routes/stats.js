import { Router } from 'express'
import { clientsPerHour } from '../moks/stats.js'

const router = Router()

/** возвращает статистику использования точек доступа */
router.get('/stats', (req, res) => {
  res.json(clientsPerHour)
})

export default router
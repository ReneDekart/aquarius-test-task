import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'
import aps from '../moks/aps.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APS_FILE = path.join(__dirname, '..', 'moks', 'aps.js')

const router = Router()

/** функция сохранения точек */
async function saveAps() {
  await fs.writeFile(APS_FILE, `export default ${JSON.stringify(aps, null, 2)}\n`)
}

/** Получить массмив точек доступа */
router.get('/aps', (req, res) => {
  res.json(aps)
})

/** создать новую точку доступа */
router.post('/aps', async (req, res) => {
  /** Получение нового айдишника точки доступа */
  function newId() {
    const nums = aps.map(a => Number(a.id.replace('ap-', '')))
    return `ap-${String(Math.max(...nums) + 1).padStart(3, '0')}`
  }

  const { name, model, ip, band, channel, location } = req.body || {}
  /** Проверяем наличие необзходимых полей */
  if (!name || !model || !ip || !band || !channel || !location) {
    /** Возвращаем ошибку, если не все данные пришли */
    return res.status(400).json({ error: 'Ошибка заполнения обязательных полей: name, model, ip, band, channel, location' })
  }
  /** Создаём и пушим новую точку с дэфолтными параметрами */
  const ap = {
    id: newId(),
    name,
    model,
    status: 'online',
    ip,
    channel,
    band,
    location,
    group: 'grp-000',
    clients: 0,
    uptime: 0
  }
  aps.push(ap)
  try {
    await saveAps()
    res.status(201).json(ap)
  } catch(err) {
    console.log('Ошибка создания точки доступа: ', err)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
})

/** Удалить точку доступа */
router.delete('/aps/:id', async (req, res) => {
  const idx = aps.findIndex(a => a.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Точка доступа не найдена' })
  aps.splice(idx, 1)
  try {
    await saveAps()
    res.status(204).end()
  } catch (err) {
    console.log('Ошибка удаления точки доступа: ', err)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
})

export default router

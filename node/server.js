import 'dotenv/config'
import express from 'express'
import { apsRouter, statsRouter } from './routes/index.js'

/** Создаем экземпляр приложения */
const app = express()

/** читаем из переменных окружения порт для запуска */
const PORT = process.env.PORT || 3010


app.use((req, res, next) => {
  /** разрешаем запросы с любого домена */
  res.header('Access-Control-Allow-Origin', '*')
  /** указываем конкретные методы */
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  /** Разрешаем заголовок */
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  /* для предзапроса браузером */
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})
/** используем парсинг json */
app.use(express.json())
/** Регистрирцем маршгруты */
app.use('/api', apsRouter)
app.use('/api', statsRouter)

/** запускаем сервер и слушаем */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
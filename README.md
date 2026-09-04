# aquarius-test-task

## Установка зависимостей

В корне проекта (npm workspaces: `client` и `node`):

```bash
npm run install-all
```

## Запуск серверной части

```bash
npm run start-server
```

Сервер (Express) поднимается в воркспейсе `node`.

Базовый API_URL: ` http://localhost:3000/api/`

Порт указывается в переменной окружения в воркспейсе `node`

При смене порта необходимо поменять в переменных окружения воркспейса `client` параметр `VUE_APP_API_BASE_URL`

## Запуск клиентской части

```bash
npm run start-client
```

Vue CLI dev-сервер поднимается на `http://localhost:8080`.

## Запуск обеих частей одновременно

```bash
npm run env-up
```

Запускает сервер и клиент параллельно через `concurrently`.

## Если вдруг какой-то из портов занят

```bash
npx kill-port 3000
```

## Прочие команды

- Сборка клиента: `npm run build-client`
- Запуск клиента после сборки: `npm run preview-client`

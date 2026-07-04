import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

const app = new Elysia()
  .use(cors())
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'clipcraft-server',
  }))
  .get('/', () => ({
    name: 'ClipCraft API',
    version: '0.0.1',
    docs: '/api/docs',
  }))
  .listen(3000)

console.log(`🦊 ClipCraft server is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app

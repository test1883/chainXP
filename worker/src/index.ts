import { Router, createCors } from 'itty-router'

import { Env } from './env'
import { getCcipRead, getProfile, getGames, getQuests } from './handlers'

const { preflight, corsify } = createCors()
const router = Router()

router
  .all('*', preflight)
  .get('/lookup/*', (request, env) => getCcipRead(request, env))
  .get('/get/:owner', (request, env) => getProfile(request, env))
  .get('/games', (request, env) => getGames(env))
  .get('/quests/:gameId', (request, env) => getQuests(request, env))
  .all('*', () => new Response('Not found', { status: 404 }))

// Handle requests to the Worker
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router.handle(request, env).then(corsify)
  },
}

import type { IRequest } from 'itty-router'
import zod from 'zod'

import { Env } from '../../env'
import { get } from '../functions/games/get'

export async function getGame(request: IRequest, env: Env) {
  const schema = zod.object({
    owner: zod.string(),
  })
  const safeParse = schema.safeParse(request.params)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { owner } = safeParse.data
  const gameData = await get(owner, env)

  if (gameData === null) {
    return new Response('No Game found', { status: 404 })
  }

  return Response.json(gameData, {
    status: 200,
  })
}

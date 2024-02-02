import type { IRequest } from 'itty-router'
import zod from 'zod'

import { Env } from '../../env'
import { get } from '../functions/quests/get'

export async function getQuests(request: IRequest, env: Env) {
  const schema = zod.object({
    gameId: zod.number(),
  })
  const safeParse = schema.safeParse(request.params)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { gameId } = safeParse.data
  const questData = await get(gameId, env)

  if (questData === null) {
    return new Response('No Quests found', { status: 404 })
  }

  return Response.json(questData, {
    status: 200,
  })
}

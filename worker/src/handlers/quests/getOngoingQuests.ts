import { IRequest } from 'itty-router'
import zod from 'zod'

import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parseQuestFromDb } from '../functions/quests/utils'

export async function getOngoingQuests(request: IRequest, env: Env) {
  const schema = zod.object({
    ongoing: zod.array(zod.object({
      gameId: zod.number(),
      questId: zod.number()
    })),
  })
  const safeParse = schema.safeParse(request.body)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { ongoing } = safeParse.data
  const db = createKysely(env)
  const quests = await db.selectFrom('quests').selectAll().execute()
  const parsedQuests = parseQuestFromDb(quests)
  const ongoingQuests = parsedQuests.map(quest => {
    for (let i = 0; i < ongoing.length; i++) {
      if (ongoing[i].gameId == quest.game_id && ongoing[i].questId == quest.quest_id) {
        return quest
      }
    }
  })

  return Response.json(ongoingQuests, {
    status: 200,
  })
}

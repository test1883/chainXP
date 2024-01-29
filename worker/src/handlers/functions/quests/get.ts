import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Quest } from '../../../models'
import { parseQuestFromDb } from './utils'

export async function get(gameId: number, questId: number, env: Env): Promise<Quest | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('quests')
    .selectAll()
    .where('gameId', '=', gameId)
    .where('questId', '=', questId)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parseQuestFromDb(record)
}

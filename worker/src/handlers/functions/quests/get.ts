import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Quest } from '../../../models'
import { parseQuestFromDb } from './utils'

export async function get(gameId: number, env: Env): Promise<Quest | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('quests')
    .selectAll()
    .where('gameId', '=', gameId)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parseQuestFromDb(record)
}

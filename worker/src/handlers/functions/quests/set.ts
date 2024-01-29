import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Quest } from '../../../models'
import { stringifyQuestForDb } from './utils'

export async function set(questData: Quest, env: Env) {
  const db = createKysely(env)
  const body = stringifyQuestForDb(questData)

  await db
    .insertInto('quests')
    .values(body)
    .onConflict((oc) => oc.column('questId').where('gameId', '=', body.gameId).doUpdateSet(body))
    .execute()
}

import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Game } from '../../../models'
import { stringifyGameForDb } from './utils'

export async function set(gameData: Game, env: Env) {
  const db = createKysely(env)
  const body = stringifyGameForDb(gameData)

  await db
    .insertInto('games')
    .values(body)
    .onConflict((oc) => oc.column('owner').doUpdateSet(body))
    .execute()
}

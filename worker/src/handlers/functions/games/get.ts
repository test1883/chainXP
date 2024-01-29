import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Game } from '../../../models'
import { parseGameFromDb } from './utils'

export async function get(owner: string, env: Env): Promise<Game | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('games')
    .selectAll()
    .where('owner', '=', owner)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parseGameFromDb(record)
}

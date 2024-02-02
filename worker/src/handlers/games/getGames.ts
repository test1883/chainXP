import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parseGameFromDb } from '../functions/games/utils'

export async function getGames(env: Env) {
  const db = createKysely(env)
  const games = await db.selectFrom('games').selectAll().execute()
  const parsedGames = parseGameFromDb(games)

  return Response.json(parsedGames, {
    status: 200,
  })
}

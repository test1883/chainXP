import { CamelCasePlugin, Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'

import { Env } from '../env'
import { ProfileInKysely, GameInKysely, QuestInKysely } from '../models'

export interface Database {
  profiles: ProfileInKysely,
  games: GameInKysely,
  quests: QuestInKysely,
}

export function createKysely(env: Env): Kysely<Database> {
  return new Kysely<Database>({
    dialect: new D1Dialect({ database: env.DB }),
    plugins: [new CamelCasePlugin()],
  })
}

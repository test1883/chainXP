import { Insertable, Selectable } from 'kysely'

import { Game, GameInKysely } from '../../../models'

type SelectableKysely = Selectable<GameInKysely>
type InsertableKysely = Insertable<GameInKysely>

export function parseGameFromDb(flatGame: SelectableKysely): Game
export function parseGameFromDb(flatGame: SelectableKysely[]): Game[]
export function parseGameFromDb(
  flatGame: SelectableKysely | SelectableKysely[]
): Game | Game[] {
  if (Array.isArray(flatGame)) {
    return flatGame.map(parseGame)
  }

  return parseGame(flatGame)

  function parseGame(game: SelectableKysely) {
    return {
      game_id: game.gameId,
      contract: game.contract,
      owner: game.owner,
      description: game.description,
      logo: game.logo,
      install: game.install,
      name: game.name
    }
  }
}

export function stringifyGameForDb(game: Game): InsertableKysely
export function stringifyGameForDb(game: Game[]): InsertableKysely[]
export function stringifyGameForDb(
  game: Game | Game[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(game)) {
    return game.map(stringifyGame)
  }

  return stringifyGame(game)

  function stringifyGame(game: Game) {
    return {
        gameId: game.game_id,
        contract: game.contract,
        owner: game.owner,
        description: game.description,
        logo: game.logo,
        install: game.install,
        name: game.name
    }
  }
}

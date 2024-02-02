import { Insertable, Selectable } from 'kysely'

import { Quest, QuestInKysely } from '../../../models'

type SelectableKysely = Selectable<QuestInKysely>
type InsertableKysely = Insertable<QuestInKysely>

export function parseQuestFromDb(flatQuest: SelectableKysely): Quest
export function parseQuestFromDb(flatQuest: SelectableKysely[]): Quest[]
export function parseQuestFromDb(
  flatQuest: SelectableKysely | SelectableKysely[]
): Quest | Quest[] {
  if (Array.isArray(flatQuest)) {
    return flatQuest.map(parseQuest)
  }

  return parseQuest(flatQuest)

  function parseQuest(quest: SelectableKysely) {
    return {
      title: quest.title,
      description: quest.description,
      game_id: quest.gameId,
      quest_id: quest.questId,
      n_tries: quest.nTries
    }
  }
}

export function stringifyQuestForDb(quest: Quest): InsertableKysely
export function stringifyQuestForDb(quest: Quest[]): InsertableKysely[]
export function stringifyQuestForDb(
  quest: Quest | Quest[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(quest)) {
    return quest.map(stringifyQuest)
  }

  return stringifyQuest(quest)

  function stringifyQuest(quest: Quest) {
    return {
      title: quest.title,
      description: quest.description,
      gameId: quest.game_id,
      questId: quest.quest_id,
      nTries: quest.n_tries
    }
  }
}

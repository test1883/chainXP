import z from 'zod'

export const ZodProfile = z.object({
  user_id: z.number(),
	profile: z.string(),
	owner: z.string(),
	name: z.string(),
	bio: z.string(),
	country: z.string(),
	socials: z.record(z.string()).optional(),
	links: z.record(z.string()).optional()
})

export const ZodProfileWithSignature = ZodProfile.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export const ZodGame = z.object({
  game_id: z.number(),
	name: z.string(),
	owner: z.string(),
	contract: z.string(),
	description: z.string(),
	install: z.string(),
	logo: z.string()
})

export const ZodGameWithSignature = ZodGame.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export const ZodQuest = z.object({
  game_id: z.number(),
	quest_id: z.number(),
	title: z.string(),
	description: z.string(),
  n_tries: z.number()
})

export const ZodQuestWithSignature = ZodQuest.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export type Profile = z.infer<typeof ZodProfile>
export type ProfileWithSignature = z.infer<typeof ZodProfileWithSignature>
export type Game = z.infer<typeof ZodGame>
export type GameWithSignature = z.infer<typeof ZodGameWithSignature>
export type Quest = z.infer<typeof ZodQuest>
export type QuestWithSignature = z.infer<typeof ZodQuestWithSignature>

export interface ProfileInKysely {
  userId: number,
	profile: string,
	owner: string,
	name: string,
	bio: string,
	country: string,
	socials: string | null,
	links: string | null
}

export interface GameInKysely {
  gameId: number,
	name: string,
	owner: string,
	contract: string,
	description: string,
	install: string,
	logo: string
}

export interface QuestInKysely {
  gameId: number,
	questId: number,
	title: string,
	description: string, 
  nTries: number
}
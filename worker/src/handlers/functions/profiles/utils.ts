import { Insertable, Selectable } from 'kysely'

import { Profile, ProfileInKysely } from '../../../models'

type SelectableKysely = Selectable<ProfileInKysely>
type InsertableKysely = Insertable<ProfileInKysely>

export function parseProfileFromDb(flatProfile: SelectableKysely): Profile
export function parseProfileFromDb(flatProfile: SelectableKysely[]): Profile[]
export function parseProfileFromDb(
  flatProfile: SelectableKysely | SelectableKysely[]
): Profile | Profile[] {
  if (Array.isArray(flatProfile)) {
    return flatProfile.map(parseProfile)
  }

  return parseProfile(flatProfile)

  function parseProfile(profile: SelectableKysely) {
    return {
      name: profile.name,
      owner: profile.owner,
      bio: profile.bio,
      country: profile.country,
      user_id: profile.userId,
      profile: profile.profile,
    }
  }
}

export function stringifyProfileForDb(profile: Profile): InsertableKysely
export function stringifyProfileForDb(profile: Profile[]): InsertableKysely[]
export function stringifyProfileForDb(
  profile: Profile | Profile[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(profile)) {
    return profile.map(stringifyProfile)
  }

  return stringifyProfile(profile)

  function stringifyProfile(profile: Profile) {
    return {
      name: profile.name,
      owner: profile.owner,
      bio: profile.bio,
      country: profile.country,
      userId: profile.user_id,
      profile: profile.profile
      }
  }
}

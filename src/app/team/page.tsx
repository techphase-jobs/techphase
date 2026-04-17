import { getTeamMembers, seedIfEmpty } from '@/lib/json-store'
import TeamClient from './team-client'

export default async function TeamPage() {
  seedIfEmpty()
  const team = getTeamMembers()

  return <TeamClient team={team} />
}

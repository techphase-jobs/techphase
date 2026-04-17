import { getTeamMembers, seedIfEmpty } from '@/lib/json-store'
import TeamClient from './team-client'

export default async function TeamPage() {
  await seedIfEmpty()
  const team = await getTeamMembers()

  return <TeamClient team={team} />
}

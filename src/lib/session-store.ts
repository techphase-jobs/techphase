// Simple in-memory session store
// In production, use Redis or a database-backed session store
export const activeSessions = new Map<string, { id: string; email: string; name: string | null }>()

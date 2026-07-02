/**
 * POST /api/login  { password }
 * Verifies against ADMIN_PASSWORD env var; returns a signed session token (24 h).
 * Env vars required: ADMIN_PASSWORD, SESSION_SECRET
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && timingSafeEqual(ba, bb);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  const { ADMIN_PASSWORD, SESSION_SECRET } = process.env;
  if (!ADMIN_PASSWORD || !SESSION_SECRET) {
    return res.status(500).json({ success: false, message: 'Server not configured' });
  }

  const password = String(req.body?.password ?? '');
  if (!password || !safeEqual(password, ADMIN_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 600)); // slow brute-force attempts
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }

  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const sig = createHmac('sha256', SESSION_SECRET).update(String(expires)).digest('hex');
  return res.status(200).json({ success: true, token: `${expires}.${sig}`, expires });
}

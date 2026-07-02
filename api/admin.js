/**
 * /api/admin — authenticated content management.
 *   GET  ?action=content                          → latest content.json from GitHub
 *   POST { action:'save', content }               → commit content.json
 *   POST { action:'upload', filename, mime, data }→ commit image to images/, returns path
 *
 * Auth: Authorization: Bearer <token from /api/login>
 * Env vars: SESSION_SECRET, GITHUB_TOKEN (repo contents read/write),
 *           GITHUB_REPO (e.g. "techphase-jobs/techphase"), GITHUB_BRANCH (default "main")
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const GH_API = 'https://api.github.com';

function verifyToken(req, secret) {
  const auth = req.headers.authorization ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const [expStr, sig] = token.split('.');
  if (!expStr || !sig) return false;
  const expected = createHmac('sha256', secret).update(expStr).digest('hex');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(expStr) > Date.now();
}

async function gh(path, token, options = {}) {
  const res = await fetch(`${GH_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'techphase-admin',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

/** Get the current SHA of a file (null if it doesn't exist). */
async function getSha(repo, branch, filePath, token) {
  const r = await gh(`/repos/${repo}/contents/${filePath}?ref=${branch}`, token);
  return r.ok ? r.json.sha : null;
}

/** Create or update a file via the GitHub Contents API. */
async function commitFile(repo, branch, filePath, base64Content, message, token) {
  const sha = await getSha(repo, branch, filePath, token);
  const r = await gh(`/repos/${repo}/contents/${filePath}`, token, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: base64Content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  return r;
}

const SAFE_NAME = /^[a-zA-Z0-9._-]{1,80}$/;
const ALLOWED_MIME = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/svg+xml', 'svg'],
]);
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB after client-side compression

export default async function handler(req, res) {
  const { SESSION_SECRET, GITHUB_TOKEN, GITHUB_REPO } = process.env;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!SESSION_SECRET || !GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).json({ success: false, message: 'Server not configured (env vars missing)' });
  }
  if (!verifyToken(req, SESSION_SECRET)) {
    return res.status(401).json({ success: false, message: 'Not authorised — please log in again' });
  }

  try {
    // ---- READ latest content ----
    if (req.method === 'GET' && req.query?.action === 'content') {
      const r = await gh(`/repos/${GITHUB_REPO}/contents/content.json?ref=${branch}`, GITHUB_TOKEN);
      if (!r.ok) return res.status(502).json({ success: false, message: 'Could not read content from GitHub' });
      const decoded = Buffer.from(r.json.content, 'base64').toString('utf8');
      return res.status(200).json({ success: true, content: JSON.parse(decoded) });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { action } = req.body ?? {};

    // ---- SAVE content.json ----
    if (action === 'save') {
      const content = req.body.content;
      if (!content || typeof content !== 'object') {
        return res.status(400).json({ success: false, message: 'No content supplied' });
      }
      const pretty = JSON.stringify(content, null, 2) + '\n';
      if (pretty.length > 900_000) {
        return res.status(400).json({ success: false, message: 'Content too large' });
      }
      const b64 = Buffer.from(pretty, 'utf8').toString('base64');
      const r = await commitFile(GITHUB_REPO, branch, 'content.json', b64,
        `Admin: update site content (${new Date().toISOString()})`, GITHUB_TOKEN);
      if (!r.ok) {
        console.error('GitHub save failed:', r.status, r.json?.message);
        return res.status(502).json({ success: false, message: `GitHub error: ${r.json?.message ?? r.status}` });
      }
      return res.status(200).json({ success: true, message: 'Saved — site will update in about a minute' });
    }

    // ---- UPLOAD image ----
    if (action === 'upload') {
      const { filename, mime, data } = req.body ?? {};
      if (!ALLOWED_MIME.has(mime)) {
        return res.status(400).json({ success: false, message: 'Only JPEG, PNG, WebP or SVG images are allowed' });
      }
      if (!SAFE_NAME.test(String(filename ?? ''))) {
        return res.status(400).json({ success: false, message: 'Invalid file name' });
      }
      const bytes = Buffer.from(String(data ?? ''), 'base64');
      if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) {
        return res.status(400).json({ success: false, message: 'Image missing or larger than 4 MB' });
      }
      const stamp = Date.now().toString(36);
      const ext = ALLOWED_MIME.get(mime);
      const base = String(filename).replace(/\.[a-zA-Z0-9]+$/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').slice(0, 40) || 'image';
      const path = `images/${base}-${stamp}.${ext}`;
      const r = await commitFile(GITHUB_REPO, branch, path, bytes.toString('base64'),
        `Admin: upload ${path}`, GITHUB_TOKEN);
      if (!r.ok) {
        console.error('GitHub upload failed:', r.status, r.json?.message);
        return res.status(502).json({ success: false, message: `GitHub error: ${r.json?.message ?? r.status}` });
      }
      return res.status(200).json({ success: true, path: `/${path}` });
    }

    return res.status(400).json({ success: false, message: 'Unknown action' });
  } catch (err) {
    console.error('Admin API error:', err?.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

/**
 * /api/post/[slug] — server-rendered individual News & Updates post page.
 *
 * Static HTML (index.html) is a client-rendered SPA, so it can't give each blog post
 * its own <title>/og:image the way Facebook's link-preview scraper needs (it doesn't
 * run JavaScript). This function reads the same public content.json the rest of the
 * site uses and renders one plain HTML page per post with the correct per-post meta
 * tags, so a link pasted into Facebook (or anywhere else) shows the post's own title,
 * excerpt and image instead of the homepage's.
 *
 * Routing: vercel.json rewrites the pretty URL /news/:slug to /api/post/:slug.
 * No auth, no env vars, no write access — this only reads the public content.json.
 */

const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

function renderParagraphs(body) {
  return String(body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

function excerptOf(post) {
  if (post.excerpt) return post.excerpt;
  const text = String(post.body ?? '').replace(/\s+/g, ' ').trim();
  return text.length > 200 ? text.slice(0, 197) + '…' : text;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return dateStr; }
}

function page({ title, body, statusMeta = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
${statusMeta}
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230a2540'/%3E%3Cpath d='M14 20h36v8H37v24h-10V28H14z' fill='%23ff8c00'/%3E%3C/svg%3E">
<style>
  :root{ --primary:#0a2540; --primary-light:#0e3460; --accent:#ff8c00; --gray-600:#475569; --gray-200:#e2e8f0; }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;color:#1e293b;line-height:1.75;background:#fff}
  h1,h2{font-family:'Syne',sans-serif;line-height:1.25}
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}
  img{max-width:100%;height:auto;display:block}
  header{background:linear-gradient(135deg,var(--primary),var(--primary-light));padding:18px 24px}
  header .logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#fff}
  header .logo span{color:var(--accent)}
  main{max-width:720px;margin:0 auto;padding:0 24px 64px}
  .back{display:inline-block;margin:28px 0 18px;font-size:.88rem;font-weight:600;color:var(--accent)}
  .cover{width:100%;max-height:400px;object-fit:cover;border-radius:14px;margin-bottom:28px}
  .meta{font-size:.82rem;color:var(--gray-600);text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:10px}
  h1{font-size:clamp(1.6rem,4vw,2.3rem);color:var(--primary);margin-bottom:22px}
  .content p{margin-bottom:1.3em;color:#334155}
  .not-found{padding:120px 24px;text-align:center}
  .not-found h1{margin-bottom:12px}
  footer{border-top:1px solid var(--gray-200);padding:26px 24px;text-align:center;font-size:.82rem;color:var(--gray-600)}
</style>
</head>
<body>
<header><a class="logo" href="/">TechPhase<span>Solutions</span></a></header>
${body}
<footer>&copy; ${new Date().getFullYear()} TechPhase Solutions. All Rights Reserved.</footer>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  const slug = String(req.query?.slug ?? '').trim();
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const base = `${proto}://${req.headers.host}`;

  let content;
  try {
    const r = await fetch(`${base}/content.json`);
    if (!r.ok) throw new Error('content.json fetch failed: ' + r.status);
    content = await r.json();
  } catch (err) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(502).send(page({
      title: 'Temporarily unavailable | TechPhase Solutions',
      statusMeta: '<meta name="robots" content="noindex,nofollow">',
      body: `<main class="not-found"><h1>Temporarily unavailable</h1><p>Please try again in a moment.</p><a class="back" href="/">&larr; Back to TechPhase Solutions</a></main>`,
    }));
  }

  const post = (content.posts || []).find((p) => p.slug === slug && p.published !== false);

  if (!post) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(page({
      title: 'Post not found | TechPhase Solutions',
      statusMeta: '<meta name="robots" content="noindex,nofollow">',
      body: `<main class="not-found"><h1>Post not found</h1><p>This story may have been unpublished or moved.</p><a class="back" href="/">&larr; Back to TechPhase Solutions</a></main>`,
    }));
  }

  const url = `${base}/news/${encodeURIComponent(post.slug)}`;
  const desc = excerptOf(post);
  const imageUrl = post.image ? (post.image.startsWith('http') ? post.image : `${base}${post.image}`) : `${base}/images/unnamed-mtujdh8m.jpg`;
  const dateLabel = formatDate(post.date);

  const statusMeta = `
<meta name="description" content="${escHtml(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${escHtml(url)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escHtml(post.title)}">
<meta property="og:description" content="${escHtml(desc)}">
<meta property="og:url" content="${escHtml(url)}">
<meta property="og:image" content="${escHtml(imageUrl)}">
<meta property="og:site_name" content="TechPhase Solutions">
${post.date ? `<meta property="article:published_time" content="${escHtml(post.date)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escHtml(post.title)}">
<meta name="twitter:description" content="${escHtml(desc)}">
<meta name="twitter:image" content="${escHtml(imageUrl)}">`;

  const body = `<main>
  <a class="back" href="/#news">&larr; Back to News &amp; Updates</a>
  ${post.image ? `<img class="cover" src="${escHtml(post.image)}" alt="${escHtml(post.title)}">` : ''}
  ${dateLabel ? `<div class="meta">${escHtml(dateLabel)}</div>` : ''}
  <h1>${escHtml(post.title)}</h1>
  <div class="content">${renderParagraphs(post.body || post.excerpt)}</div>
</main>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
  return res.status(200).send(page({ title: `${post.title} | TechPhase Solutions`, statusMeta, body }));
}

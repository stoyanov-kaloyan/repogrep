const GITHUB_API = 'https://api.github.com';

// Use global fetch (Node 18+). If unavailable, fall back to node-fetch when installed.
const nativeFetch = (typeof fetch !== 'undefined') ? fetch : undefined;

async function searchRepos(query, per_page=10, token, fetchImpl) {
  const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${per_page}`;
  const f = fetchImpl || nativeFetch || (await import('node-fetch')).default;
  const res = await f(url, { headers: { 'User-Agent': 'repogrep' } });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  const data = await res.json();
  return data.items || [];
}

function summarizeRepo(r) {
  return {
    name: r.full_name,
    description: r.description,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updated_at: r.updated_at,
    url: r.html_url
  };
}

async function run(opts = {}) {
  const q = opts.query || 'web3';
  const per_page = opts.per_page || 10;
  const token = opts.token || process.env.GITHUB_TOKEN;
  const fetchImpl = opts.fetch;
  const repos = await searchRepos(q, per_page, token, fetchImpl);
  return repos.map(summarizeRepo);
}

module.exports = { run };

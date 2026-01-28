const assert = require('assert');
const repogrep = require('../repogrep');

(async () => {
  console.log('Running repogrep smoke test...');
  try {
    const results = await repogrep.run({ query: 'uniswap v4', per_page: 2 });
    assert(Array.isArray(results), 'results should be an array');
    assert(results.length > 0, 'expected at least one result');

    for (const r of results) {
      assert(r.name && typeof r.name === 'string', 'repo must have a name');
      assert('stars' in r, 'repo must have stars count');
      assert(r.url && r.url.startsWith('https://github.com'), 'repo must have a github url');
    }

    console.log('✔ repogrep smoke test passed');
    process.exit(0);
  } catch (err) {
    console.error('✖ repogrep smoke test failed:', err.message);
    process.exit(2);
  }
})();
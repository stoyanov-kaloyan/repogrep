const assert = require('assert');
const nock = require('nock');
const repogrep = require('../repogrep');

(async () => {
  console.log('Running repogrep mocked test...');
  const api = 'https://api.github.com';
  const query = 'uniswap v4';
  const per_page = 2;

  const fakeResponse = {
    total_count: 2,
    incomplete_results: false,
    items: [
      {
        full_name: 'Uniswap/v4-core',
        description: 'Core smart contracts of Uniswap v4',
        stargazers_count: 2425,
        forks_count: 1251,
        updated_at: '2026-01-28T11:19:48Z',
        html_url: 'https://github.com/Uniswap/v4-core'
      },
      {
        full_name: 'uniswapfoundation/v4-template',
        description: 'Template repo for writing Uniswap v4 Hooks',
        stargazers_count: 317,
        forks_count: 119,
        updated_at: '2026-01-21T17:45:41Z',
        html_url: 'https://github.com/uniswapfoundation/v4-template'
      }
    ]
  };

  // Intercept the GitHub search API
  nock(api)
    .get('/search/repositories')
    .query(true)
    .reply(200, fakeResponse);

  try {
    const results = await repogrep.run({ query, per_page });
    assert(Array.isArray(results), 'results should be an array');
    assert(results.length === 2, 'expected two results');
    assert(results[0].name === 'Uniswap/v4-core');
    assert(results[1].name === 'uniswapfoundation/v4-template');

    console.log('✔ repogrep mocked test passed');
    process.exit(0);
  } catch (err) {
    console.error('✖ repogrep mocked test failed:', err.message);
    process.exit(2);
  }
})();
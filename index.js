#!/usr/bin/env node
const minimist = require('minimist');
const repogrep = require('./repogrep');

const argv = minimist(process.argv.slice(2));
const q = argv.q || argv.query || 'uniswap v4';
const per_page = argv.p || argv.per_page || 10;

repogrep.run({query: q, per_page}).then(res => {
  console.log(JSON.stringify(res, null, 2));
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

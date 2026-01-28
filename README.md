# repogrep

Lightweight GitHub repository grepping tool. Starts with a simple search-to-summary flow; designed to expand with issue/PR scanning, activity signals, and alerts.

Usage:

    npm install
    node index.js --query "uniswap v4" --per_page 10

Next steps:
- Add GitHub token support for higher rate limits
- Implement issue/PR scanning
- Store results to JSONL and track first-seen timestamps
- Add CLI flags for keyword lists and alert thresholds

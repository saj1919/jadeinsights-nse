# JADE Insights · NSE Equity Rankings

[![Live Site](https://img.shields.io/badge/site-live-brightgreen)](https://saj1919.github.io/jadeinsights-nse/)
[![License](https://img.shields.io/badge/license-CC%20BY--NC--ND%204.0-lightgrey)](LICENSE)
[![Universe](https://img.shields.io/badge/universe-1%2C250%2B%20NSE%20equities-blue)](https://saj1919.github.io/jadeinsights-nse/methodology.html)
[![Updates](https://img.shields.io/badge/updates-daily%20after%20market%20close-success)](https://saj1919.github.io/jadeinsights-nse/)

**Daily competitive ratings for NSE-listed equities.**
Live site → **<https://saj1919.github.io/jadeinsights-nse/>**

---

## What is JADE

**JADE** (*Jadhav Adaptive Daily Equity rating*) is a proprietary competitive
rating system for Indian equities. Every trading day, every NSE-listed stock
in the eligible universe competes against the rest in **three parallel
categories** — each measuring a different time horizon. A stock's JADE rating
rises when it consistently outperforms its peers and falls when it falls
behind. After years of daily competition, the resulting rating captures
**accumulated competitive evidence**, not just yesterday's price move.

The three categories:

| Category   | What it measures                              | Horizon          |
| ---------- | --------------------------------------------- | ---------------- |
| Compounder | Sustained multi-year performance              | 1y / 2y / 3y / 5y |
| Momentum   | Medium-term performance and active trends    | 3m – 2y          |
| Breakout   | Recent short-term strength                    | 1w – 3m          |

A **Combined JADE** rating is a weighted blend across all three.

---

## What the site offers

| Page             | Content                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Home             | Daily brief — today's category leaders, weekly movers, featured portfolio bundles                          |
| Leaderboard      | Every eligible stock, ranked by JADE per category. Sortable on any column (1y return · 3y/5y CAGR · **1y Sharpe** · JADE), filterable by sector / cap / vol |
| Hall of Fame     | Today's #1 per category. Cumulative leaders, longest streaks, World Cup standings, Monthly Trophy roll      |
| Bundles          | All backtest-validated portfolios — every one above 15% CAGR over 3 years (range +52% to +413%)             |
| Backtest         | 2-year P&L vs NIFTY 50 for the full bundle set + **year-on-year trend** view (Y1/Y2/Y3 returns, accelerating bundles)|
| Sectors          | Sectors ranked by median JADE. Best stock per sector                                                       |
| Trending         | 1-week / 1-month / 3-month JADE movers. Fallen Kings and Rising Stars                                       |
| Stock detail     | Per-stock deep-dive: JADE ratings + returns at every horizon + CAGR + **1y/3y Sharpe** + peak/drawdown + awards earned         |
| Methodology      | How JADE works (vague-but-credible), universe funnel, filters, what JADE is *not*                          |

---

## Universe

Out of the ~2,400 equity tickers on NSE, JADE filters down to **~1,250 high-quality, tradeable stocks** by removing:

- ETFs and index funds
- Suspended / no-current-price stocks
- Penny stocks below ₹50
- Illiquid names with under ₹1Cr daily turnover

The methodology page explains the full filter funnel with current counts.

---

## Updates

The site is rebuilt **once per day** after NSE publishes the day's bhavcopy
(approximately 7 PM IST). The snapshot date is shown in the hero block of
every page.

---

## Trophies and Cups

The daily ratings produce three layers of achievement, visible on the Hall of
Fame and per-stock pages:

1. **Monthly Trophy** — the stock with the most days at #1 in a category that
   calendar month.
2. **Yearly Cup** — the stock with the most Monthly Trophies in a category
   that calendar year.
3. **World Cup** *(rare)* — a stock that wins the Yearly Cup in **all three**
   base categories the same year. The most demanding achievement in the system.

---

## License

JADE Insights is © **Bolee Innovation Labs** and is licensed under the
**Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International**
license ([CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)).

| Use case                                                        | Allowed       |
| --------------------------------------------------------------- | ------------- |
| Personal research and exploration                                | ✅ Free, with attribution |
| Academic citation, classroom use, student projects               | ✅ Free, with attribution |
| Embedding screenshots in a non-commercial blog post              | ✅ Free, with attribution |
| Sharing the URL freely                                           | ✅ Always free |
| Use in any commercial product, paid service, or company workflow | ❌ Requires commercial license |
| Distributing modified versions                                   | ❌ No derivatives permitted |
| Re-publishing the rankings on an ads-supported site              | ❌ Requires commercial license |

See [LICENSE](LICENSE) for the full terms.

---

## Trademark

**JADE**, **JADE Insights**, and the JADE logo are trademarks of
Bolee Innovation Labs. Use of these marks in any commercial context — even
for content not derived from this work — requires explicit written
permission.

The CC license grants no rights in the trademarks.

---

## Commercial licensing

For any of the following, please contact us before use:

- Incorporating JADE rankings into a paid product or subscription service
- Using JADE in an internal corporate workflow (research, allocation, screening)
- Building a derivative product on JADE methodology or data
- Reselling, syndicating, or sub-licensing the content
- Using the JADE name or marks commercially

Commercial licenses are granted on a case-by-case basis and may include
licensing fees, attribution requirements, and other terms.

**Contact:** [boleeinnovationlabs@gmail.com](mailto:boleeinnovationlabs@gmail.com)

---

## Disclaimer

JADE Insights is a **quantitative signal-generation tool, not investment
advice**. All rankings are derived purely from historical NSE price data. The
JADE rating reflects competitive performance against the universe — not a
forecast of future returns.

- Past performance does not predict future results.
- The site ignores fundamentals, valuations, governance, news, and macro context.
- Position sizing, diversification, and risk management remain the sole
  responsibility of the investor.

Treat any signal from this site as one input among many in your own
investment process.

---

## Repository structure

```
jadeinsights-nse/
├── index.html            Homepage
├── leaderboard.html      All eligible stocks, filterable
├── hall_of_fame.html     Champions, trophies, World Cup
├── bundles.html          Backtest-validated portfolio bundles
├── sectors.html          Sector rankings
├── trending.html         Movers, Fallen Kings, Rising Stars
├── stock.html            Per-stock detail template (reads ?t=TICKER)
├── methodology.html      How JADE works
├── data.js               All site data (regenerated daily)
├── css/site.css          Shared styling
├── js/site.js            Search, sortable tables
├── LICENSE               CC BY-NC-ND 4.0 + commercial / trademark terms
└── README.md             This file
```

The site is fully static — no backend, no database, no server-side code.
Open `index.html` from disk and the entire experience works offline.

---

## About

Built by Bolee Innovation Labs. Methodology and implementation: proprietary.
The published site is the open, public deliverable. Inquiries, licensing
requests, and bug reports welcome at the email above.

Copyright © 2026 Bolee Innovation Labs · All rights reserved.

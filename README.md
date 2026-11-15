# Market Lab

[Open the live website](https://jz-harv.github.io/market-lab/)

An interactive microeconomics study website for exploring how market decisions change prices, quantities, profits, and welfare.

## Simulators

- **Supply and demand:** elasticity, taxes, subsidies, price floors and ceilings, surplus, shortages, and deadweight loss.
- **Competitive firm:** ATC, AVC, AFC, MC, market price, profit maximization, shutdown, and break-even decisions.
- **Monopoly:** demand, marginal revenue, optimal output and price, profit, and the efficient-output benchmark.
- **Price discrimination:** first-degree extraction, second-degree quantity menus and information rent, and third-degree group pricing.

Includes worked calculations, scenario links, practice questions, and downloadable market and firm diagrams.

## Run locally

No dependencies or build step are required. With Python 3:

```sh
python3 -m http.server 4173 --directory docs
```

Open http://localhost:4173.

## Verify calculations

With a current Node.js version:

```sh
npm test
```

The 26 tests check known outcomes, welfare identities, global profit maximization, shutdown and break-even rules, and incentive-compatible pricing menus.

## Project structure

- `docs/`: static website ready for GitHub Pages.
- `docs/model.js`: market and policy calculations.
- `docs/firm-model.js`: costs, competition, and monopoly calculations.
- `docs/discrimination-model.js`: two-type price discrimination calculations.
- `tests/`: model checks using Node’s built-in test runner.

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, then the default branch and `/docs`. Save to publish.

## Model assumptions

Stylized teaching models with continuous output, no externalities, and no transaction costs. Fixed costs are sunk in the short run. Price controls assume efficient rationing and no government purchases. Discrimination examples use two equally numerous buyer types, constant marginal cost, no resale, and, for second degree, one package per buyer. Assumptions and formulas are explained beside the diagrams.

An independent student project covering introductory microeconomics topics, including U of T ECO101. Not affiliated with or endorsed by the University of Toronto. Further-reading references are linked within the website.

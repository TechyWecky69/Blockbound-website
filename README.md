# BlockBound Website + Store

This repository contains the existing static BlockBound documentation site plus the new Store/account frontend.

## Store

- `/store` contains VIP, MVP and MVP+.
- MVP+ has 1 week, 1 month, 3 months, 6 months and 1 year options.
- Purchases require a logged-in account with a linked Minecraft account.
- The server checks the `ranks` list in IslandCore `playerdata.yml`, not the `rank` field.
- VIP/MVP cannot be repurchased or bought after a higher rank is present.
- MVP+ requires MVP.
- Minecraft linking generates a six-character code; run `/linkstore <code>` in-game.
- Account/session state is kept server-side with an HttpOnly cookie; Remember me keeps the session for 30 days.

## Run the website and API

```bash
cd server
node server.js
```

By default it serves the website and Store API on port 5001. See `server/README.md` for configuration and payment webhook setup.

For a separately hosted static site, set `storeApi` in `config.js` to the Store API URL and configure that API's CORS policy appropriately.

## Important

A payment provider is intentionally not hard-coded. `/api/purchase` creates a pending order; only the authenticated payment webhook endpoint can mark an order paid and grant the rank. This prevents the browser from granting paid ranks itself.

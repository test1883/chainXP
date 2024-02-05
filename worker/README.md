# ChainXP - CCIP Read Gateway

[Cloudflare Worker](https://developers.cloudflare.com/workers/) is used as the [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) gateway. [Cloudflare D1](https://developers.cloudflare.com/d1/) is used to store data.

## API Routes
- `/get/:owner` - GET - Returns the profile details of a particular address
- `/games` - GET - Returns all the games
- `/game/:owner` - GET - Returns the game associated with a particular address
- `/quests/:gameId` - GET - Returns the quests under a game
- `/lookup/{sender}/{data}.json` - GET - CCIP Read lookup
- `/ongoing` - POST - Returns the ongoing challenges of a user

## Run Locally

1. Navigate to this directory: `cd worker`
2. Login to Cloudflare: `npx wrangler login`
3. Create a D1 instance: `npx wrangler d1 create <DATABASE_NAME>` and update the `[[d1_databases]]` section of `wrangler.toml` with the returned info
4. Create the default table in the local database: `yarn run dev:create-tables`
5. Set your environment variables: `cp .dev.vars.example .dev.vars` (this is the private key for one of the addresses listed as a signer on your resolver contract)
6. Install dependencies: `yarn install`
7. Start the dev server: `yarn dev`

## Deploy to Cloudflare

1. Navigate to this directory: `cd worker`
2. Login to Cloudflare: `npx wrangler login`
3. Deploy the Worker: `yarn deploy`
4. Create the default table in the prod database: `yarn run prod:create-tables`
5. Set your environment variable: `echo <PRIVATE_KEY> | npx wrangler secret put PRIVATE_KEY` (this is the private key for one of the addresses listed as a signer on your resolver contract)

# Netlify deployment fix

This patch keeps the existing Express server for local development and adds Netlify Functions for production.

## Added
- `netlify.toml`
- `netlify/functions/grab-url-assets.mjs`
- `netlify/functions/health.mjs`
- `npm run build:client`

## API
- `POST /api/grab-url-assets` -> asset extraction function
- `GET /api/health` -> health function

The existing `/api/ai/page1-seo` redirect is included, but this bundle does not yet contain a Netlify Function implementation for it. The existing Express `server.ts` remains available for local `npm run dev` / `npm start`.

## Netlify settings
Use the repository root as the base directory. Build command:

`npm run build:client`

Publish directory:

`dist`

Do not set the publish directory to the deployment bundle of generated HTML files if you want the React application and Netlify Functions together.

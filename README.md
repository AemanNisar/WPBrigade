# WPBrigade

Small Express (ESM) app that serves a static site from `public/` and exposes a couple of JSON endpoints.

## Setup

```bash
npm install
```

Optional environment variables (create a local `.env`):

- `PORT` (defaults to `3000`)

## Run

```bash
node server.js
```

Then open:

- Static site: `http://localhost:3000/`

## API

### `GET /states?country=<country>`

There is dummy data stored in `data/states.json` which can easily be replaced by the database later.
Returns the list of states for a country key found in `data/states.json`.

Example:

```bash
curl "http://localhost:3000/states?country=Pakistan"
```

### `POST /contact`

Accepts JSON:

```json
{ "name": "", "email": "", "country": "", "state": "", "message": "" }
```

Messages are appended to `data/messages.json` .

Example:

```bash
Invoke-RestMethod -Method Post "http://localhost:3000/contact" `
  -ContentType "application/json" `
  -Body '{"name":"A","email":"a@example.com","country":"india","state":"ka","message":"hello"}'
```

Data is saved in the file for demonstration purpose it can be easily be replaced with database .
#`Search`
Search functionality has been implemented
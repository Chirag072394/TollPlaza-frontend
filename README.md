# Toll Plaza Management — Frontend

A lightweight operations dashboard for recording toll entries and reviewing plaza activity. Built with React, TypeScript, and Vite.

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| HTTP | Axios |
| Forms | React Hook Form |

## Features

- **Dashboard** — header, search/filter controls, entry form, and logs table
- **Toll entry form** — license plate, vehicle type, official/government vehicle flag (React Hook Form validation)
- **Toll logs table** — plate, vehicle type, timestamp, fee, status badge, detection source
- **Client-side filtering** — search by license plate, filter by vehicle type
- **Toll fee schedule** — Car $5, Motorcycle $2, Truck $10, Official/Government $0 (with live selection preview)
- **Loading & error states** — spinners, retry on fetch failure, form submit errors
- **Responsive layout** — mobile-friendly; table scrolls horizontally on small screens

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- [Toll Plaza Backend](../TollPlaza-Backend) API running locally

## Quick start

```bash
# From TollPlaza-Frontend/
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Start the backend with the **https** profile (default API URL in `.env`):

```bash
# From TollPlaza-Backend/TollPlaza/
dotnet run --project TollSystem.Api --launch-profile https
```

API base: `https://localhost:7007`  
Swagger: `https://localhost:7007/swagger`

On first run, accept the dev HTTPS certificate in the browser (visit Swagger once if API calls fail).

## Environment variables

Create or edit `.env` in the project root:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Axios base URL for API requests | `https://localhost:7007/api` |
| `VITE_API_PROXY_TARGET` | Backend origin for Vite dev proxy | `https://localhost:7007` |

### API connection modes

**Direct (default)** — frontend calls the API with CORS:

```env
VITE_API_BASE_URL=https://localhost:7007/api
```

Backend must allow `http://localhost:5173` (configured in `appsettings.Development.json`).

**Proxy (optional)** — avoid CORS and dev certificate issues:

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=https://localhost:7007
```

Requests go to `http://localhost:5173/api/*` and Vite proxies to the backend.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Type-check and production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── api/
│   └── axios.ts              # Axios instance & error helpers
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── VehicleFilter.tsx
│   ├── TollEntryForm.tsx
│   ├── TollFeeSchedule.tsx
│   ├── TollLogsTable.tsx
│   └── StatusBadge.tsx
├── hooks/
│   └── useTollLogs.ts        # Fetch, create, loading/error state
├── pages/
│   └── Dashboard.tsx
├── services/
│   └── tollService.ts        # getLogs(), createLog()
├── types/
│   └── toll.ts               # Interfaces, enums, fee constants
├── utils/
│   └── format.ts             # Currency (USD), dates, status mapping
├── App.tsx
└── main.tsx
```

## Backend API

Base path: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/logs` | List toll logs |
| `POST` | `/logs` | Create toll entry |

Responses are wrapped:

```json
{
  "success": true,
  "data": [ ... ],
  "message": null,
  "errors": null
}
```

### Create toll log (POST body)

```json
{
  "licensePlate": "UP14AB1234",
  "vehicleType": 1,
  "isOfficialVehicle": false
}
```

`vehicleType`: `1` = Car, `2` = Motorcycle, `3` = Truck.

Toll plaza scope is resolved on the **backend** (tenant provider); the frontend does not send `tollPlazaId`.

### Toll fees (USD)

| Vehicle | Fee |
|---------|-----|
| Car | $5.00 |
| Motorcycle | $2.00 |
| Truck | $10.00 |
| Official / Government | $0.00 |

## Architecture notes

- **Service layer** — all HTTP calls live in `services/tollService.ts`; components do not call Axios directly.
- **Custom hook** — `useTollLogs` owns fetch/create state and refreshes the table after a successful entry.
- **Strict TypeScript** — shared types in `types/toll.ts`; no `any`.
- **No global state library** — local React state and hooks only.

## Status display

API statuses are mapped for the UI:

| API (`camelCase`) | Badge |
|-------------------|-------|
| `completed` | Paid (green) |
| `pending` | Pending (yellow) |
| `voided` | Violation (red) |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **502** on `/api/logs` via Vite | Wrong proxy target — set `VITE_API_PROXY_TARGET` to your backend URL/port. |
| **CORS error** | Run API with CORS enabled; ensure origin `http://localhost:5173` is allowed, or use proxy mode (`VITE_API_BASE_URL=/api`). |
| **Network / SSL error** | Trust dev cert: open `https://localhost:7007/swagger` once. |
| **Empty table** | Confirm backend is running and seeded; check browser Network tab for `GET /api/logs`. |

## License

Private — assignment / internal use.

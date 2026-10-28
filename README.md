# Innovation Hub

A web platform for a university innovation and entrepreneurship club, with a Windows desktop wrapper. The repository is organized as a workspace containing the main React/Vite site, an API server, shared libraries, and an Electron desktop application.

## Highlights

- React + Vite web application
- Express API server
- Electron desktop wrapper for Windows
- Shared API specification and type/schema libraries
- Database schema and Drizzle configuration
- A mockup sandbox for experimenting with UI ideas

## Repository layout

| Path | Purpose |
|---|---|
| artifacts/innovation-club/ | Main React/Vite website |
| artifacts/mockup-sandbox/ | UI and prototype experiments |
| artifacts/api-server/ | Express API server |
| desktop/innovation-club/ | Electron desktop application |
| lib/api-client-react/ | React API client |
| lib/api-spec/ | OpenAPI specification and generated API definitions |
| lib/api-zod/ | Zod schemas and type definitions |
| lib/db/ | Database schema and Drizzle configuration |
| screenshots/ | Reference screenshots |

## Tech stack

**Frontend:** React, Vite  
**Backend:** Node.js, Express  
**Desktop:** Electron  
**API & validation:** OpenAPI, Zod  
**Database tooling:** Drizzle  
**Package management:** pnpm workspace

## Getting started

### Prerequisites

Install Node.js and pnpm. Use the versions supported by the project configuration.

### Install dependencies

From the repository root:

    pnpm install

### Run the website

    pnpm --filter @workspace/innovation-club dev

The development server usually runs at http://localhost:5173; check the terminal output for the actual URL.

### Type-check and build

    pnpm typecheck
    pnpm --filter @workspace/innovation-club build

### Run or package the Windows desktop app

    pnpm --filter @workspace/innovation-club-desktop dev
    pnpm --filter @workspace/innovation-club-desktop dist:win

## Development notes

- The main shared website UI lives in artifacts/innovation-club/src/.
- Keep secrets and local environment files out of version control.
- Before submitting changes, run the relevant type-check/build commands and describe any required environment variables.

## Project status

This README documents the repository structure and available scripts. Add screenshots, a live demo link, deployment details, and a concise list of implemented user-facing features when those are ready to share.

## Author

**Layan** — [GitHub profile](https://github.com/Layanvii)

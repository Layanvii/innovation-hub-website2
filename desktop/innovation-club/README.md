# Innovation Club Windows app

This package wraps the shared `innovation-club` React/Vite website in Electron for Windows. The browser website and desktop app use the same source and production build.

## Commands

- `pnpm --filter @workspace/innovation-club-desktop run dev` — run the website and open it in an Electron development window
- `pnpm --filter @workspace/innovation-club-desktop run build` — build the website and copy it into the desktop package
- `pnpm --filter @workspace/innovation-club-desktop run dist:win` — create a Windows x64 NSIS installer in `desktop/innovation-club/release`

The Windows installer is intentionally unsigned. Windows SmartScreen may show a warning until the installer is signed with the organization’s code-signing certificate.
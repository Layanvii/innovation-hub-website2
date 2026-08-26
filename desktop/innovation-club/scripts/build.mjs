import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const desktopRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(desktopRoot, '..', '..', 'artifacts', 'innovation-club', 'dist', 'public');
const destination = path.join(desktopRoot, 'web');

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

console.log(`Copied website build to ${path.relative(process.cwd(), destination)}`);
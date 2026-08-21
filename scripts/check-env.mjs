import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import semver from 'semver';

import { logger } from './logger.mjs';

const log = logger.withTag('check-env');

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.join(SCRIPT_DIR, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const { engines } = pkg;

if (!engines?.node || typeof engines.node !== 'string') {
  log.error('package.json → engines.node is missing or invalid');
  process.exit(1);
}
if (!engines?.pnpm || typeof engines.pnpm !== 'string') {
  log.error('package.json → engines.pnpm is missing or invalid');
  process.exit(1);
}

log.start('Checking Node and pnpm against package.json → engines');

if (!semver.satisfies(process.version, engines.node)) {
  log.error(
    `Node.js: required \`${engines.node}\`; current: \`${process.version}\``
  );
  process.exit(1);
}

let pnpmVersion;
try {
  pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
} catch {
  log.error('pnpm not found on PATH (required for this repository)');
  process.exit(1);
}

if (!semver.satisfies(pnpmVersion, engines.pnpm)) {
  log.error(
    `pnpm: required \`${engines.pnpm}\`; current: \`${pnpmVersion}\``
  );
  process.exit(1);
}

log.box(
  [`Node.js  ${process.version}`, `pnpm     v${pnpmVersion}`].join('\n')
);
log.success('Environment matches package.json → engines');

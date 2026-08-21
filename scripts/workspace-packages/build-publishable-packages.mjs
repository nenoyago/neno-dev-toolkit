import { spawnSync } from 'child_process';

import { logger } from '../logger.mjs';
import {
  REPO_ROOT,
  listNgPackagrProjectKeys,
  listPublishableNgPackagrProjects,
  listPublishableNonNgProjects,
  listPublishableProjectDirs,
  readProjectPackageJson
} from './publishable-workspace-packages.mjs';

const log = logger.withTag('build-packages');

const LARGE_HEAP = '4096';

/**
 * Node maps exit codes mod 256; values like 256 become 0 (false success). Coerce failures to 1–255.
 *
 * @param {number | null} status
 */
function safeExitCode(status) {
  if (status === null || typeof status !== 'number' || Number.isNaN(status)) {
    return 1;
  }
  const mod = ((status % 256) + 256) % 256;
  return mod === 0 ? 1 : mod;
}

/**
 * Builds a short, scannable summary after a failed `spawnSync` (stdio was inherited, so logs are above).
 *
 * @param {import('child_process').SpawnSyncReturns<Buffer>} result
 * @param {string} commandLine Command that was run (shown verbatim for copy/paste).
 */
function formatSpawnFailureDetail(result, commandLine) {
  const lines = [`Command: ${commandLine}`];

  if (result.error) {
    lines.push(`Spawn failed: ${result.error.message}`);
  }
  if (result.signal) {
    lines.push(`Signal: ${result.signal}`);
  }
  if (result.status === null) {
    lines.push('Exit code: unknown (no status reported — process may have been interrupted)');
  } else {
    lines.push(`Exit code: ${result.status}`);
  }

  lines.push(
    'Logs: child stdio was inherited; scroll up for the full Angular / ng-packagr or pnpm output.'
  );
  return lines.join('\n');
}

/**
 * @param {import('child_process').SpawnSyncReturns<Buffer>} result
 * @param {string} title One-line summary (which step or library failed).
 * @param {string} commandLine
 */
function exitAfterSpawnFailure(result, title, commandLine) {
  log.error(`${title}\n\n${formatSpawnFailureDetail(result, commandLine)}`);
  process.exit(safeExitCode(result.status));
}

/** @param {string} project */
function needsLargeHeap(project) {
  return project === 'design-system' || project === 'shared-utilities';
}

/**
 * @param {string} project
 * @returns {import('child_process').SpawnSyncReturns<Buffer>}
 */
function runNgBuild(project) {
  const env = { ...process.env };
  if (needsLargeHeap(project)) {
    const extra = `--max-old-space-size=${LARGE_HEAP}`;
    env.NODE_OPTIONS = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ${extra}` : extra;
  }
  // `pnpm run ng -- build X` faz o CLI receber `--` em duplicado e quebra o build (ex.: projeto `i18n`).
  // Single command string (not an args array) with shell:true — avoids Node's DEP0190
  // (unescaped-args) warning; `project` is one of our own directory names, never external input.
  return spawnSync(`pnpm exec ng build ${project}`, {
    cwd: REPO_ROOT,
    env,
    stdio: 'inherit',
    shell: true
  });
}

const projects = listPublishableNgPackagrProjects();

const skipped = listPublishableNonNgProjects();
if (skipped.length > 0) {
  log.info(
    `Publishable without ng-packagr here (skipped): ${skipped.join(', ')}`
  );
}

const ngKeys = new Set(listNgPackagrProjectKeys());
const skippedDeprecatedNg = listPublishableProjectDirs().filter(
  (dir) =>
    ngKeys.has(dir) &&
    readProjectPackageJson(dir)?.deprecated &&
    !projects.includes(dir)
);
if (skippedDeprecatedNg.length > 0) {
  log.info(
    `Skipped ng build (package.json deprecated): ${skippedDeprecatedNg.join(', ')}`
  );
}

if (projects.length === 0) {
  log.warn('No publishable Angular libraries to build.');
  process.exit(0);
}

log.start(`Building ${projects.length} library(ies): ${projects.join(', ')}`);

for (const project of projects) {
  if (project === 'design-system') {
    log.start('design-system: CSS (prebuild)');
    const css = spawnSync('pnpm run build:design-system:css', {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      shell: true
    });
    if (css.status !== 0) {
      exitAfterSpawnFailure(
        css,
        'design-system CSS prebuild failed (`pnpm run build:design-system:css`).',
        'pnpm run build:design-system:css'
      );
    }
  }

  log.start(`ng build ${project}`);
  const result = runNgBuild(project);
  if (result.status !== 0) {
    exitAfterSpawnFailure(
      result,
      `Angular library build failed: \`${project}\` (\`ng build ${project}\`).`,
      `pnpm exec ng build ${project}`
    );
  }
  log.success(`${project} OK`);
}

log.success(`All done (${projects.length})`);

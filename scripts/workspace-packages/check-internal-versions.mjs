import { logger } from '../logger.mjs';
import { listPublishablePackagesForDisplay } from './publishable-workspace-packages.mjs';

/**
 * Lista pacotes publicáveis em `projects/` (`publishConfig.registry`, não `private`).
 * Saída via {@link https://github.com/unjs/consola Consola}.
 */
const log = logger.withTag('check-versions');

/** @param {unknown} value */
function deprecatedDetail(value) {
  if (value === undefined || value === null || value === false || value === '') {
    return '';
  }
  if (value === true) {
    return 'deprecated (no message in package.json)';
  }
  if (typeof value === 'string') {
    const max = 100;
    return value.length > max ? `${value.slice(0, max - 1)}…` : value;
  }
  return String(value);
}

const rows = listPublishablePackagesForDisplay().map((p) => {
  const detail = deprecatedDetail(p.deprecated);
  return {
    package: p.name,
    version: p.version,
    deprecated: Boolean(detail),
    detail
  };
});

rows.sort((a, b) => a.package.localeCompare(b.package));

const colW = Math.max(...rows.map((r) => r.package.length), 10);

log.start('Publishable workspace packages');

const lines = rows.map((r) => {
  const mark = r.deprecated ? '  deprecated' : '';
  return `${r.package.padEnd(colW)}  ${r.version}${mark}`;
});

log.box(lines.join('\n'));

const withDetail = rows.filter((r) => r.deprecated && r.detail);
if (withDetail.length > 0) {
  const dep = log.withTag('deprecated');
  dep.info('Migration hints');
  for (const r of withDetail) {
    dep.log(`  ${r.package}\n  ${r.detail}`);
  }
}

log.success('Done');

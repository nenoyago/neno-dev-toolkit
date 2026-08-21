import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(SCRIPT_DIR, '..', '..');
const PROJECTS_ROOT = path.join(REPO_ROOT, 'projects');

/**
 * @param {unknown} pkg
 * @returns {pkg is { name: string; version: string; publishConfig: { registry: string } }}
 */
export function isPublishablePackage(pkg) {
  if (!pkg || typeof pkg !== 'object') {
    return false;
  }
  const p = /** @type {{ private?: boolean; publishConfig?: { registry?: string }; name?: unknown; version?: unknown }} */ (
    pkg
  );
  if (p.private === true) {
    return false;
  }
  if (!p.publishConfig || typeof p.publishConfig.registry !== 'string') {
    return false;
  }
  if (typeof p.name !== 'string' || typeof p.version !== 'string') {
    return false;
  }
  return true;
}

/**
 * @param {string} dirName
 * @returns {Record<string, unknown> | null}
 */
export function readProjectPackageJson(dirName) {
  const pkgPath = path.join(PROJECTS_ROOT, dirName, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch {
    return null;
  }
}

/** Pastas em `projects/` com `package.json` publicável (registry, não private). */
export function listPublishableProjectDirs() {
  return fs
    .readdirSync(PROJECTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => isPublishablePackage(readProjectPackageJson(name)))
    .sort();
}

/** Chaves em `angular.json` com target `build` ng-packagr e `ng-package.json` no `root`. */
export function listNgPackagrProjectKeys() {
  const BUILDER_KEY = '@angular-devkit/build-angular:ng-packagr';

  const angularPath = path.join(REPO_ROOT, 'angular.json');
  const raw = fs.readFileSync(angularPath, 'utf8');
  const angular = JSON.parse(raw);
  const projects = angular.projects ?? {};

  return Object.keys(projects).filter((key) => {
    const proj = projects[key];
    const build = proj?.architect?.build;
    if (!build || build.builder !== BUILDER_KEY) {
      return false;
    }
    const root = proj.root;
    if (typeof root !== 'string') {
      return false;
    }
    const ngPkg = path.join(REPO_ROOT, root, 'ng-package.json');
    return fs.existsSync(ngPkg);
  });
}

/**
 * Ordem estável para `ng build` (memória / CSS onde já era usado no monorepo).
 * Projetos novos: não listados aqui vão ao fim, ordenados alfabeticamente.
 */
const NG_BUILD_ORDER_HINT = [
  'analytics',
  'common-utilities',
  'shared-utilities',
  'design-system',
  'http-connect',
  'i18n'
];

/** @param {string[]} keys */
export function sortNgBuildOrder(keys) {
  const unique = [...new Set(keys)];
  return unique.sort((a, b) => {
    const ia = NG_BUILD_ORDER_HINT.indexOf(a);
    const ib = NG_BUILD_ORDER_HINT.indexOf(b);
    const oa = ia === -1 ? 1000 : ia;
    const ob = ib === -1 ? 1000 : ib;
    if (oa !== ob) {
      return oa - ob;
    }
    return a.localeCompare(b);
  });
}

/**
 * Pastas publicáveis que também são libs Angular (ng-packagr). Exclui ex.: configs-model.
 * @param {{ skipDeprecated?: boolean }} [options] — `skipDeprecated` default `true` (alinhado ao pipeline antigo: não buildar pacotes só deprecated).
 */
export function listPublishableNgPackagrProjects(options = {}) {
  const skipDeprecated = options.skipDeprecated !== false;
  const publishable = new Set(listPublishableProjectDirs());
  const ngKeys = listNgPackagrProjectKeys();
  let eligible = ngKeys.filter((k) => publishable.has(k));
  if (skipDeprecated) {
    eligible = eligible.filter((k) => {
      const pkg = readProjectPackageJson(k);
      return pkg && !pkg.deprecated;
    });
  }
  return sortNgBuildOrder(eligible);
}

/** Publicável mas sem `ng-packagr` neste workspace (só informativo). */
export function listPublishableNonNgProjects() {
  const publishable = new Set(listPublishableProjectDirs());
  const ngKeys = new Set(listNgPackagrProjectKeys());
  return [...publishable].filter((d) => !ngKeys.has(d)).sort();
}

/** @returns {{ dir: string; name: string; version: string; deprecated: unknown }[]} */
export function listPublishablePackagesForDisplay() {
  return listPublishableProjectDirs().map((dir) => {
    const pkg = /** @type {{ name: string; version: string; deprecated?: unknown }} */ (
      readProjectPackageJson(dir)
    );
    return { dir, name: pkg.name, version: pkg.version, deprecated: pkg.deprecated };
  });
}

export { PROJECTS_ROOT, REPO_ROOT };

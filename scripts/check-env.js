const semver = require("semver");
const { engines } = require("../package.json");

if (!semver.satisfies(process.version, engines.node)) {
  console.error(`Required Node.js version: ${engines.node}. You are using ${process.version}.`);
  process.exit(1);
}

const execSync = require("child_process").execSync;
const pnpmVersion = execSync("pnpm --version").toString().trim();

if (!semver.satisfies(pnpmVersion, engines.pnpm)) {
  console.error(`Required pnpm version: ${engines.pnpm}. You are using ${pnpmVersion}.`);
  process.exit(1);
}

console.table({
  "Node Version": `${process.version} ✅`,
  "pnpm Version": `${pnpmVersion} ✅`
})
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking internal package versions...\n');

const packages = ['common-utilities', 'shared-utilities', 'design-system', 'configs-model'];
const versions = {};

packages.forEach(pkg => {
  const pkgPath = path.join(__dirname, '../projects', pkg, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const { name, version } = require(pkgPath);
    versions[name] = version;
  }
});

console.table(versions);
console.log('✅ Package versions checked\n');

# @nenoyago/configs-model

Configurações compartilhadas para ESLint, Prettier, Commitlint e Changelog para garantir a consistência de código e padronização de commits em projetos do monorepo.

## Sumário

- [Instalação](#instalação)
- [Uso](#uso)
- [Dependências Recomendadas](#dependências-recomendadas)

## Instalação

```bash
pnpm add @nenoyago/configs-model -D
```

## Uso

Crie arquivos de configuração na raiz do seu projeto e importe as configurações deste pacote.

### ESLint

```javascript
// eslint.config.cjs
module.exports = require('@nenoyago/configs-model/eslint.config.cjs');
```

### Prettier

```javascript
// prettier.config.cjs
module.exports = require('@nenoyago/configs-model/prettier.config.cjs');
```

### Commitlint

```javascript
// commitlint.config.cjs
module.exports = require('@nenoyago/configs-model/commitlint.config.cjs');
```

### Changelog

```javascript
// changelog.config.cjs
module.exports = require('@nenoyago/configs-model/changelog.config.cjs');
```

## Dependências Recomendadas

Para que as configurações funcionem corretamente, instale as seguintes dependências de desenvolvimento no seu projeto:

```bash
pnpm add eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser eslint-plugin-unused-imports eslint-plugin-prettier eslint-plugin-import eslint-config-prettier -D
```

---

Este pacote é publicado automaticamente via Changesets.

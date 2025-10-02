# neno-packages-workspace

Monorepo para projetos Angular e configs compartilhadas (Design System, ESLint, Prettier, Changelog, Commitlint).

## Sumário
- [Visão geral](#visão-geral)
- [Primeiros passos](#primeiros-passos)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Estrutura do monorepo](#estrutura-do-monorepo)
- [Configs compartilhados](#configs-compartilhados)
- [Scripts de atalho](#scripts-de-atalho)
- [Changelog e versionamento](#changelog-e-versionamento)
- [Commitlint e Conventional Commits](#commitlint-e-conventional-commits)
- [Validação de Changeset no MR](#validação-de-changeset-no-mr)
- [Fluxo de contribuição](#fluxo-de-contribuição)
- [Links úteis](#links-úteis)
- [Boas práticas](#boas-práticas)

---

## Visão geral
Este monorepo centraliza o desenvolvimento de múltiplos projetos Angular e configurações compartilhadas para padronizar e acelerar o desenvolvimento.

Principais pacotes:
- `design-system`: biblioteca Angular de componentes reutilizáveis.
- `configs-model`: configs compartilhadas (ESLint, Prettier, Changelog, Commitlint, etc).

## Requisitos
- Node.js 22.14+
- pnpm 10.6.x

### Configuração do ambiente
Certifique-se de ter o Node e o pnpm instalados. Recomenda-se usar as versões especificadas acima. Caso haja variáveis de ambiente necessárias, consulte o arquivo `scripts/check-env.js`.

## Instalação
Clone o repositório e instale as dependências:
```bash
pnpm install
```

## Estrutura do monorepo
```
projects/
  design-system/      # Biblioteca de componentes Angular
  configs-model/      # Configs compartilhadas (lint, prettier, changelog, etc)
```

## Configs compartilhados
O pacote `configs-model` exporta arquivos de configuração para lint, prettier, changelog e commitlint. Para usar em outro projeto:

Instale o pacote:
```bash
pnpm add @nenoyago/configs-model -D
```

No seu projeto, crie arquivos que importam as configs:
- ESLint:
  ```js
  // eslint.config.cjs
  module.exports = require('@nenoyago/configs-model/eslint.config.cjs');
  ```
- Prettier:
  ```js
  // prettier.config.cjs
  module.exports = require('@nenoyago/configs-model/prettier.config.cjs');
  ```
- Commitlint:
  ```js
  // commitlint.config.cjs
  module.exports = require('@nenoyago/configs-model/commitlint.config.cjs');
  ```
- Changelog:
  ```js
  // changelog.config.cjs
  module.exports = require('@nenoyago/configs-model/changelog.config.cjs');
  ```

## Scripts de atalho
Scripts úteis definidos no package root:

- `pnpm build:packages` — Build do design system (inclui build de CSS).
- `pnpm storybook` — Inicia o Storybook do design system.
- `pnpm build:storybook` — Gera o build estático do Storybook.
- `pnpm lint` — Roda o lint nos projetos.
- `pnpm lint:fix` — Roda o lint e tenta corrigir automaticamente.
- `pnpm format` — Formata arquivos `.ts` e `.html` com Prettier.
- `pnpm changeset:empty` — Cria um changeset vazio (útil para versionamento manual).
- `pnpm changeset:bump` — Aplica todos os changesets pendentes e faz o bump de versão.

## Changelog e versionamento
O changelog é gerenciado via [Changesets](https://github.com/changesets/changesets):

> **O que é um changeset?**
> Um changeset é um arquivo que descreve as mudanças feitas em um pacote, permitindo o controle de versão e geração automática do changelog. Ele é obrigatório para aprovar MRs.

1. Para criar um novo changeset:
   ```bash
   pnpm changeset
   ```
2. Para criar um changeset vazio:
   ```bash
   pnpm changeset:empty
   ```
3. Para aplicar os changesets e atualizar a versão:
   ```bash
   pnpm changeset:bump
   ```

O arquivo `CHANGELOG.md` será atualizado automaticamente após o bump.

## Commitlint e Conventional Commits
Os commits são validados pelo commitlint usando os tipos definidos em `changelog.config.cjs`.

Exemplo de commit válido:
```
feat(button): ✨ add new button
fix(core): 🐛 fix navigation bug
```

Use os tipos sugeridos para garantir padronização e integração com o changelog. Ao executar `git commit`, o Husky irá validar automaticamente sua mensagem de commit usando o commitlint. Opcionalmente, você pode usar o [Commitizen](https://github.com/commitizen/cz-cli) para uma experiência de commit interativa:
```bash
pnpm cz
```

## Validação de Changeset no MR
Todo Merge Request (MR) só será aprovado e passará pela validação automática do GitHub Actions se houver pelo menos um arquivo de changeset presente em `.changeset/`.

Se não houver changeset, o workflow irá falhar e o MR não poderá ser aprovado. Para garantir que sua alteração seja válida, sempre crie um changeset:
```bash
pnpm changeset
```

Branches de release ou chore são exceção e não exigem changeset.

## Fluxo de contribuição
1. Faça um fork do repositório (se externo) ou crie uma branch a partir da `main`.
2. Use um prefixo válido para a branch (ex: `feat/`, `fix/`, `docs/`, etc).
3. Realize suas alterações e crie um changeset.
4. Rode os scripts de lint e format antes de commitar.
5. Abra um Pull Request (MR) e aguarde a revisão.
6. O workflow irá validar a presença do changeset e o padrão dos commits.
7. Após aprovação, o merge será realizado automaticamente pelo mantenedor.

## Links úteis
- [Documentação Angular](https://angular.dev/)
- [Storybook](https://storybook.js.org/)
- [Changesets](https://github.com/changesets/changesets)
- [Commitlint](https://commitlint.js.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [pnpm](https://pnpm.io/)

## Boas práticas
- Sempre rode o lint e o prettier antes de commitar (`pnpm lint`, `pnpm format`).
- Use Conventional Commits para facilitar o versionamento e changelog.
- Prefira criar changesets para cada alteração relevante.
- Consulte o Storybook para visualizar componentes do design system.
- Mantenha as dependências atualizadas com `pnpm update`.

---

Dúvidas ou sugestões? Fale com o mantenedor: Yago Neno <developer.neno@gmail.com>

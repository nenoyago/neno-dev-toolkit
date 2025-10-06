<div align="center">
  <h1>liv-dev-toolkit</h1>
  <p><strong>Monorepo para projetos Angular, Design System e configurações compartilhadas.</strong></p>

![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Node.js](https://img.shields.io/badge/node-22.14%2B-green.svg)
![pnpm](https://img.shields.io/badge/pnpm-10.6.x-orange.svg)
![Commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)

</div>

---

## 🚀 Visão Geral

Este monorepo centraliza o desenvolvimento de múltiplas bibliotecas Angular e configurações compartilhadas para padronizar e acelerar o processo de desenvolvimento, garantindo consistência e qualidade em todos os projetos.

### ✨ Principais Tecnologias

- **[Angular](https://angular.dev/)**: Framework principal para o desenvolvimento das bibliotecas.
- **[pnpm](https://pnpm.io/)**: Gerenciador de pacotes rápido e eficiente, ideal para monorepos.
- **[Storybook](https://storybook.js.org/)**: Ferramenta para desenvolver e documentar componentes de UI de forma isolada.
- **[Changesets](https://github.com/changesets/changesets)**: Para versionamento e geração de changelogs de forma automatizada.
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)**: Para garantir a qualidade e a padronização do código.

---

## 📦 Pacotes no Monorepo

| Pacote                                                              | Descrição                                                | Instalação                            |
| ------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------- |
| [`@nenoyago/design-system`](projects/design-system/README.md)       | Biblioteca de componentes Angular e sistema de temas.    | `pnpm add @nenoyago/design-system`    |
| [`@nenoyago/shared-utilities`](projects/shared-utilities/README.md) | Coleção de diretivas, pipes e serviços para Angular.     | `pnpm add @nenoyago/shared-utilities` |
| [`@nenoyago/http-connect`](projects/http-connect/README.md)         | Cliente HTTP para Angular com configuração simplificada. | `pnpm add @nenoyago/http-connect`     |
| [`@nenoyago/configs-model`](projects/configs-model/README.md)       | Configurações compartilhadas para ESLint, Prettier, etc. | `pnpm add @nenoyago/configs-model -D` |
| `@nenoyago/common-utilities`                                        | Funções utilitárias puras (JS/TS).                       | `pnpm add @nenoyago/common-utilities` |

---

## 🏁 Começando

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Requisitos

- **Node.js**: `22.14+`
- **pnpm**: `10.6.x`

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/nenoyago/neno-packages-workspace.git
cd neno-packages-workspace
pnpm install
```

### 3. Scripts Essenciais

- **`pnpm storybook`**: Inicia o Storybook para visualizar e desenvolver os componentes do Design System.
- **`pnpm build:packages`**: Compila todas as bibliotecas do monorepo.
- **`pnpm lint`**: Executa o linter em todos os projetos para verificar a qualidade do código.
- **`pnpm cz`**: Inicia o Commitizen para criar commits padronizados.

---

## 🤝 Fluxo de Contribuição

1.  **Crie uma Branch**: A partir da `main`, crie uma nova branch (ex: `feat/nova-feature`).
2.  **Desenvolva**: Realize suas alterações no código.
3.  **Crie um Changeset**: Documente suas mudanças executando `pnpm changeset`.
4.  **Faça o Commit**: Use `pnpm cz` para criar um commit seguindo o padrão de [Conventional Commits](https://www.conventionalcommits.org/).
5.  **Abra um Pull Request**: Envie suas alterações para revisão. O workflow validará a presença do changeset e o formato do commit.

> O versionamento e a geração de `CHANGELOG.md` são automatizados pelo **Changesets**. É obrigatório criar um changeset para que um Pull Request seja aprovado.

---

<div align="center">
  <p>Dúvidas ou sugestões? Fale com o mantenedor: <strong>Yago Neno</strong> &lt;developer.neno@gmail.com&gt;</p>
</div>

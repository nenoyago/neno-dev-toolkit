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

## 📁 Estrutura do Projeto

```
liv-dev-toolkit/
├── projects/
│   ├── design-system/       # Componentes UI e sistema de temas
│   ├── shared-utilities/    # Diretivas, pipes e serviços
│   ├── http-connect/        # Cliente HTTP
│   ├── configs-model/       # Configurações compartilhadas
│   └── common-utilities/    # Utilitários JS/TS puros
├── scripts/                 # Scripts auxiliares
├── .changeset/             # Changesets para versionamento
└── storybook-static/       # Build estático do Storybook
```

---

## ⚡ Quick Start

Se você quer apenas **usar** as bibliotecas em seu projeto Angular:

### 1. Configurar Acesso aos Pacotes Privados

Como os pacotes são privados, você precisa configurar o acesso ao registry. Crie ou edite o arquivo `.npmrc` na raiz do seu projeto:

```ini
# .npmrc
@NOME_DA_ORG:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> **Nota**: Substitua `@NOME_DA_ORG` pelo scope da organização no GitHub (ex: `@sua-empresa`).

**Importante**: Você precisa de um **Personal Access Token (PAT)** do GitHub com permissão `read:packages`.

#### Como gerar o PAT:

1. Acesse: [GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Clique em "Generate new token (classic)"
3. Dê um nome descritivo (ex: "NPM Packages - Projeto X")
4. Selecione o scope: `read:packages`
5. Clique em "Generate token"
6. Copie o token gerado

#### Configurar o Token:

```bash
# Opção 1: Variável de ambiente (recomendado para CI/CD)
export GITHUB_TOKEN=seu_token_aqui

# Opção 2: Substituir diretamente no .npmrc (NÃO commitar)
# //npm.pkg.github.com/:_authToken=seu_token_aqui
```

### 2. Instalar os Pacotes

```bash
# Instale os pacotes necessários
pnpm add @nenoyago/design-system
pnpm add @nenoyago/shared-utilities
pnpm add @nenoyago/http-connect

# Configurações (opcional)
pnpm add @nenoyago/configs-model -D
```

Consulte a documentação de cada pacote para instruções específicas de configuração e uso.

---

## 🏁 Começando (Desenvolvimento)

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Requisitos

- **Node.js**: `22.14+`
- **pnpm**: `10.6.x`

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório (substitua pela URL correta)
git clone <URL_DO_REPOSITORIO>
cd liv-dev-toolkit

# Instale as dependências
pnpm install
```

### 3. Scripts Essenciais

- **`pnpm storybook`**: Inicia o Storybook para visualizar e desenvolver os componentes do Design System.
- **`pnpm build:packages`**: Compila todas as bibliotecas do monorepo.
- **`pnpm lint`**: Executa o linter em todos os projetos para verificar a qualidade do código.
- **`pnpm format`**: Formata o código usando Prettier.
- **`pnpm typecheck`**: Verifica a tipagem TypeScript sem compilar.
- **`pnpm cz`**: Inicia o Commitizen para criar commits padronizados.

---

## 💻 Desenvolvimento

### Trabalhando com Pacotes Localmente

Para desenvolver e testar um pacote localmente:

```bash
# 1. Faça o build do pacote que você está modificando
pnpm build:design-system
# ou
pnpm build:shared-utilities
# ou
pnpm build:http-connect

# 2. Em outro projeto Angular, use o link local (opcional)
cd seu-projeto-angular
pnpm link ../liv-dev-toolkit/dist/design-system
```

### Visualizando Componentes

O Storybook permite visualizar e testar componentes isoladamente:

```bash
pnpm storybook
# Acesse http://localhost:6006
```

### Verificando Qualidade do Código

```bash
# Verificar erros de linting
pnpm lint

# Corrigir erros automaticamente
pnpm lint:fix

# Formatar código
pnpm format

# Verificar tipagem
pnpm typecheck
```

---

## 📤 Publicação de Pacotes

Os pacotes são publicados automaticamente usando **Changesets**. O processo é:

1. **Durante o desenvolvimento**: Crie um changeset para cada alteração relevante:

   ```bash
   pnpm changeset
   ```

2. **Ao fazer merge na `main`**: O workflow automaticamente:
   - Lê todos os changesets pendentes
   - Atualiza as versões dos pacotes
   - Gera/atualiza os `CHANGELOG.md`
   - Publica os pacotes (se configurado)

### Tipos de Mudança

- **Patch** (`0.0.x`): Correções de bugs
- **Minor** (`0.x.0`): Novas funcionalidades compatíveis
- **Major** (`x.0.0`): Mudanças que quebram compatibilidade

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

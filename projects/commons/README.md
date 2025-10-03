# Commons (Código Interno)

Código compartilhado interno do monorepo - **não publicável**.

## 📂 Estrutura

```
projects/commons/
└── utils/          # Utilidades TypeScript com suporte Angular
```

## 🎯 Propósito

Esta pasta contém código que é:
- ✅ **Compartilhado** entre múltiplos pacotes publicáveis
- ✅ **Interno** ao monorepo (marcado como `private: true`)
- ✅ **Reutilizável** mas não destinado a consumo externo
- ✅ **Configurável** com eslint/prettier como os outros projetos

## 🔄 vs Pacotes Publicáveis

| Aspecto | `projects/commons/` | `projects/{outros}` |
|---------|---------------------|---------------------|
| **Publicação** | ❌ Privado (`private: true`) | ✅ Publicado no GitHub Packages |
| **Propósito** | Código base compartilhado | Pacotes consumíveis |
| **Versionamento** | Interno, não versionado | Versionado com changesets |
| **Dependências** | Usado pelos outros pacotes | Independentes |

## 📦 Pacotes

### `utils/`
Utilidades TypeScript puras com suporte opcional ao Angular.
- **Build**: `tsc`
- **Usado por**: `shared-utilities`, `design-system`
- **Importado via**: `@common-utilities`
- **Privado**: ✅ Sim

## 🚀 Build

Buildado automaticamente antes dos pacotes publicáveis:

```bash
pnpm run build:packages
```

## 🔧 Configuração

Cada pacote em `commons/` pode ter suas próprias configurações de:
- ESLint (`.eslintrc` ou `eslint.config.js`)
- Prettier (`.prettierrc` ou `prettier.config.js`)
- TypeScript (`tsconfig.json`)

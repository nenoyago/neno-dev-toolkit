# Commons

Código interno compartilhado entre os pacotes do monorepo.

## 📂 Estrutura

```
commons/
└── utils/          # Utilidades TypeScript com suporte Angular
```

## 🎯 Propósito

Esta pasta contém código que é:
- ✅ **Compartilhado** entre múltiplos pacotes
- ✅ **Interno** ao monorepo (não publicado)
- ✅ **Reutilizável** mas não destinado a consumo externo

## 🔄 Diferença entre `commons/` e `projects/`

| Aspecto | `commons/` | `projects/` |
|---------|-----------|-------------|
| **Publicação** | ❌ Não publicado | ✅ Publicado no GitHub Packages |
| **Propósito** | Código interno compartilhado | Pacotes consumíveis |
| **Build** | Ferramentas variadas (tsc, etc) | ng-packagr (Angular) |
| **Versionamento** | Não versionado separadamente | Versionado com changesets |

## 📦 Pacotes

### `commons/utils`
Utilidades TypeScript puras com suporte opcional ao Angular.
- Build: `tsc`
- Usado por: `shared-utilities`, `design-system`
- Importado via: `@common-utils`

## 🚀 Build

Os pacotes em `commons/` são buildados automaticamente durante o `prebuild:packages`:

```bash
pnpm run build:packages
```

Ou individualmente:

```bash
cd commons/utils
pnpm run build
```

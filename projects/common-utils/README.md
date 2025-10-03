# @nenoyago/common-utils

Utilities comuns em TypeScript com suporte ao Angular.

## 📦 Sobre

Este pacote contém funções utilitárias reutilizáveis que são compartilhadas entre os pacotes do monorepo. 
Ele é buildado com TypeScript puro usando `tsc` e é **interno** - não deve ser publicado separadamente.

## 🏗️ Arquitetura

- **Localização**: `projects/common-utils`
- **Build**: TypeScript Compiler (`tsc`)
- **Output**: `dist/common-utils`
- **Uso**: Importado via alias `@common-utils` nos outros pacotes

## 🚀 Build

```bash
cd projects/common-utils
pnpm run build
```

## 📝 Funções Disponíveis

### `formatBytes(bytes: number): string`
Formata bytes em formato legível (KB, MB, GB, etc.)

### `getRemoteErrorMessage(error: unknown, defaultMessage?: string): string`
Extrai mensagens de erro de respostas HTTP do Angular

### `generateSlug(text: string): string`
Gera slug a partir de texto

### `convertHexToRGBA(hex: string, opacity: number): string`
Converte cor hexadecimal para RGBA

### `areObjectsEqual(obj1: object, obj2: object): boolean`
Compara objetos profundamente

### `isHTMLString(str: string): boolean`
Verifica se uma string contém HTML

## 🔗 Uso nos Pacotes

Os pacotes Angular (`shared-utilities`, `design-system`) importam estas utilidades via alias:

```typescript
import { formatBytes, getRemoteErrorMessage } from '@common-utils';
```

## ⚠️ Importante

- Este pacote é **privado** e não deve ser publicado
- É buildado **antes** dos outros pacotes no processo de build
- Suporta Angular (HttpErrorResponse) mas não requer que seja usado apenas com Angular

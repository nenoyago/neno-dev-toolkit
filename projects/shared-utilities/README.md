# @nenoyago/shared-utilities

Utilitários Angular compartilhados incluindo diretivas, pipes e serviços para projetos Eleva.

## Estrutura

- `directives/` — Diretivas reutilizáveis
- `pipes/` — Pipes customizados
- `services/` — Serviços compartilhados

## Recursos Disponíveis

### Diretivas
- `drag-and-drop-file-upload` — Upload de arquivos com drag & drop
- `image-preload` — Pré-carregamento de imagens
- `overlay` — Sistema de overlay
- `route-transform` — Transformação de rotas

### Pipes
- `file-size` — Formatação de tamanho de arquivos
- `obs-with-status` — Observables com status
- `safe-transform` — Transformações seguras (sanitização)

### Serviços
- `copy-clipboard` — Cópia para área de transferência
- `platform` — Detecção de plataforma
- `screen` — Detecção de tamanho de tela
- `share` — Compartilhamento de conteúdo

## Uso

Instale no seu projeto:

```bash
pnpm add @nenoyago/shared-utilities
```

Importe os recursos desejados no seu projeto Angular:

```typescript
// Diretivas
import { DragAndDropFileUploadDirective } from '@nenoyago/shared-utilities/directives';

// Pipes
import { FileSizePipe } from '@nenoyago/shared-utilities/pipes';

// Serviços
import { CopyClipboardService } from '@nenoyago/shared-utilities/services';
```

---

Este pacote é publicado automaticamente pelo Changeset.

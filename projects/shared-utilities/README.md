# @nenoyago/shared-utilities

Coleção de diretivas, pipes e serviços utilitários para Angular, construídos para acelerar o desenvolvimento de aplicações.

## Sumário

- [Instalação](#instalação)
- [Recursos Disponíveis](#recursos-disponíveis)
- [Uso](#uso)

## Instalação

```bash
pnpm add @nenoyago/shared-utilities
```

## Recursos Disponíveis

### Diretivas

- `DragAndDropFileUploadDirective`: Habilita upload de arquivos via arrastar e soltar.
- `ImagePreloadDirective`: Pré-carrega imagens para melhorar a performance percebida.
- `OverlayDirective`: Facilita a criação de overlays e modais.
- `RouteTransformDirective`: Transforma links de rotas dinamicamente.

### Pipes

- `FileSizePipe`: Formata bytes em unidades legíveis (KB, MB, GB).
- `ObsWithStatusPipe`: Transforma um Observable em um objeto com status (carregando, sucesso, erro).
- `SafeTransformPipe`: Sanitiza URLs, HTML e outros recursos para uso seguro no template.

### Serviços

- `BroadcastService`: Comunicação entre componentes via eventos.
- `CopyClipboardService`: Copia texto para a área de transferência.
- `CookieService`: Gerencia cookies do navegador.
- `ScreenService`: Detecta o tamanho da tela e mudanças de orientação.
- `ShareService`: Acessa a API de compartilhamento nativa do navegador.

## Uso

Importe os módulos `standalone` (diretivas, pipes) ou injete os serviços onde forem necessários.

```typescript
// Exemplo de uso de um Pipe
import { Component } from '@angular/core';
import { FileSizePipe } from '@nenoyago/shared-utilities/pipes';

@Component({
  standalone: true,
  imports: [FileSizePipe],
  template: `<span>Tamanho: {{ 2048 | fileSize }}</span>` // Exibirá "2.0 KB"
})
export class MyComponent {}
```

```typescript
// Exemplo de uso de um Serviço
import { Component } from '@angular/core';
import { CopyClipboardService } from '@nenoyago/shared-utilities/services';

@Component({
  standalone: true,
  providers: [CopyClipboardService] // Forneça o serviço se não for 'root'
})
export class MyOtherComponent {
  constructor(private copyService: CopyClipboardService) {}

  copyLink() {
    this.copyService.copy('https://example.com').subscribe();
  }
}
```

---

Este pacote é publicado automaticamente via Changesets.

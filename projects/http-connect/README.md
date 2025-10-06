# @nenoyago/http-connect

Um cliente HTTP poderoso e flexível para Angular, construído sobre o `HttpClient`. Ele simplifica as interações com APIs através de recursos como criação de instâncias, gerenciamento de `baseUrl` e configuração simplificada.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso Básico](#uso-básico)
- [Recursos Avançados](#recursos-avançados)

## Instalação

```bash
pnpm add @nenoyago/http-connect
```

## Configuração

Forneça o `HttpConnectService` na raiz da sua aplicação usando `provideHttpConnect`, especificando a `baseUrl` da sua API.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpConnect } from '@nenoyago/http-connect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Necessário para o HttpClient do Angular
    provideHttpConnect({
      baseUrl: 'https://api.example.com'
    })
  ]
};
```

## Uso Básico

Injete o `HttpConnectService` em seus componentes ou serviços para fazer requisições HTTP.

```typescript
// user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpConnectService } from '@nenoyago/http-connect';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpConnectService);

  getUsers() {
    // Faz uma requisição GET para https://api.example.com/users
    return this.http.get('/users');
  }
}
```

## Recursos Avançados

### Criando um Recurso (`createHttpResource`)

Use `createHttpResource` para criar uma instância de serviço para um endpoint específico, herdando ou não a `baseUrl` principal.

```typescript
import { createHttpResource } from '@nenoyago/http-connect';

// Cria um recurso que estende a baseUrl principal.
// Todas as chamadas serão relativas a 'https://api.example.com/posts'
const postsApi = createHttpResource('posts', { extend: true });

postsApi.get('/'); // GET -> https://api.example.com/posts/
postsApi.get('/1'); // GET -> https://api.example.com/posts/1

// Cria um recurso para uma API externa, ignorando a baseUrl principal.
const externalApi = createHttpResource('https://api.external.com/v2');

externalApi.get('/data'); // GET -> https://api.external.com/v2/data
```

---

Este pacote é publicado automaticamente via Changesets.

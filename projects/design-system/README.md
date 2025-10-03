# @nenoyago/design-system

Design System Angular para projetos Eleva.

## Estrutura

- `components/` — Componentes reutilizáveis (ex: Button, Input)
- `core/` — Utilitários, temas e providers
- `src/styles/` — Estilos base (Tailwind + Tema)
- `.storybook/` — Configuração do Storybook

## Instalação

```bash
pnpm add @nenoyago/design-system
```

## Configuração

### 1. Importar Estilos

Você tem 3 opções para importar os estilos:

#### Opção A: Tudo junto (Recomendado) ✨

Importa Tailwind minificado + tema completo:

```typescript
// styles.css ou global styles
@import '@nenoyago/design-system/styles';
```

#### Opção B: Tailwind + Tema separados 🔧

Útil se você quiser controlar a ordem de importação:

```typescript
// styles.css
@import '@nenoyago/design-system/styles/tailwind'; // Tailwind minificado
@import '@nenoyago/design-system/styles/theme';    // Variáveis do tema
```

#### Opção C: Apenas Tailwind 🎯

Se você vai definir seu próprio tema via CSS ou `provideTheme`:

```typescript
// styles.css
@import '@nenoyago/design-system/styles/tailwind';
```

### 2. Configurar o Tema

Você tem 3 formas de configurar o tema:

#### Opção 1: Usar o tema padrão (Sem configuração)

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideTheme } from '@nenoyago/design-system/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme() // Usa o tema padrão
  ]
};
```

#### Opção 2: Customizar via TypeScript (Type-safe) ✅

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideTheme } from '@nenoyago/design-system/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme({
      colors: {
        'main-primary-50': '#eff6ff',
        'main-primary-100': '#dbeafe',
        'main-primary-200': '#bfdbfe',
        'main-primary-300': '#93c5fd',
        'main-primary-400': '#60a5fa',
        'main-primary-500': '#3b82f6', // Cor primária customizada
        'main-primary-600': '#2563eb',
        'main-primary-700': '#1d4ed8',
        'main-primary-800': '#1e40af',
        'main-primary-900': '#1e3a8a',
        'main-primary-950': '#172554'
        // ... todas as outras cores obrigatórias
      }
      // Pode customizar: colors, opacities, shadows, gradients
    })
  ]
};
```

#### Opção 3: Customizar via CSS (Flexível) 🎨

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideTheme } from '@nenoyago/design-system/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme() // Inicializa o sistema de tema
  ]
};
```

```html
<!-- index.html -->
<head>
  <style>
    :root {
      /* Sobrescreva apenas as variáveis que quiser */
      --color-main-primary-500: #3b82f6;
      --color-main-primary-600: #2563eb;
      --color-text-heading: #1e40af;
      /* O resto usa o tema padrão */
    }
  </style>
</head>
```

### 3. Usar Componentes

```typescript
// seu-componente.ts
import { Component } from '@angular/core';
import { LivButtonComponent } from '@nenoyago/design-system/components';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [LivButtonComponent],
  template: `
    <liv-button variant="primary" size="md"> Clique aqui </liv-button>
  `
})
export class ExemploComponent {}
```

## Variáveis de Tema Disponíveis

### Cores

- **Primary**: `--color-main-primary-{50-950}`
- **Secondary**: `--color-main-secondary-{50-950}`
- **Neutral**: `--color-neutral-{50-1000}`
- **Feedback**: `--color-feedback-{success|warning|error|info}-{light|medium|dark}`
- **Text**: `--color-text-{light|medium|dark|heading|link}`
- **Background**: `--color-background-{dark|medium|light|primary-white|primary-dark}`

### Opacidades

- **Dark**: `--opacity-dark-{50|100|200|400|800}`
- **Light**: `--opacity-light-{50|100|200|400|800}`

### Shadows

- `--shadow-soft`
- `--shadow-medium`
- `--shadow-strong`

### Gradients

- `--gradient-scrim`
- `--gradient-light`
- `--gradient-dark`
- `--gradient-dark-alt`

## Exemplos de Uso

### Tema Completo Customizado

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme({
      colors: {
        // ... todas as cores
      },
      shadows: {
        soft: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        strong: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    })
  ]
};
```

### Tema Híbrido (TypeScript + CSS)

```typescript
// app.config.ts - Define a base
provideTheme({
  colors: {
    /* cores base */
  }
});
```

```css
/* styles.css - Sobrescreve em runtime */
:root {
  --color-main-primary-500: var(--minha-cor-customizada);
}
```

---

Este pacote é publicado automaticamente pelo Changeset.

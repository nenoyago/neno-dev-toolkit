# @nenoyago/design-system

Biblioteca de componentes Angular e sistema de temas para projetos Eleva.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso de Componentes](#uso-de-componentes)
- [Variáveis de Tema](#variáveis-de-tema-disponíveis)

## Instalação

```bash
pnpm add @nenoyago/design-system
```

## Configuração

### 1. Importar Estilos

Em seu arquivo de estilos global (ex: `styles.css`), importe os estilos do Design System.

```css
/* styles.css */
@import '@nenoyago/design-system/styles';
```

### 2. Configurar o Tema

No `app.config.ts` da sua aplicação, use `provideTheme` para inicializar o sistema de temas.

#### Opção 1: Tema Padrão (Recomendado)

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

#### Opção 2: Customizar via TypeScript (Seguro por Tipos)

Você pode fornecer um objeto de tema parcial para `provideTheme` para sobrescrever o padrão.

```typescript
// app.config.ts
import { provideTheme } from '@nenoyago/design-system/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme({
      colors: {
        'main-primary-500': '#3b82f6' // Cor primária customizada
        // ... outras cores, se necessário
      }
    })
  ]
};
```

#### Opção 3: Customizar via Variáveis CSS

Sobrescreva as variáveis CSS em um arquivo de estilo global ou no `index.html`.

```css
/* styles.css */
:root {
  --color-main-primary-500: #3b82f6;
  --color-text-heading: #1e40af;
}
```

## Uso de Componentes

Importe os componentes `standalone` onde precisar.

```typescript
// seu-componente.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@nenoyago/design-system/components';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [ButtonComponent],
  template: `<liv-button variant="primary">Clique aqui</liv-button>`
})
export class ExemploComponent {}
```

## Variáveis de Tema Disponíveis

### Cores

- **Primary**: `--color-main-primary-{50-950}`
- **Secondary**: `--color-main-secondary-{50-950}`
- **Neutral**: `--color-neutral-{50-950}`
- **Feedback**: `--color-feedback-{success|warning|error|info}-{light|medium|dark}`
- **Text**: `--color-text-{light|medium|dark|heading|link}`
- **Background**: `--color-background-{white|dark|medium|light}`

### Opacidades, Sombras e Gradientes

- **Opacidades**: `--opacity-{dark|light}-{50-800}`
- **Sombras**: `--shadow-{soft|medium|strong}`
- **Gradientes**: `--gradient-{scrim|light|dark|medium}`

---

Este pacote é publicado automaticamente via Changesets.

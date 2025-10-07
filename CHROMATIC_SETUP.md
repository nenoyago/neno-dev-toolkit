# 🎨 Chromatic Setup Guide

## 📋 O que foi configurado

✅ Chromatic instalado co## 📚 URLs do Storybook

Após o primeiro deploy, você terá:

- **Produção (main):**  
  `https://main--68e56bc427fd47846235f3f9.chromatic.com/`

- **Preview (PRs):**  
  `https://<branch-name>--68e56bc427fd47846235f3f9.chromatic.com/`  
  Exemplo: `https://feat-new-button--68e56bc427fd47846235f3f9.chromatic.com/`

**💡 Dica:** Use sempre o formato permalink com o nome da branch para URLs mais estáveis!ia  
✅ Script `pnpm chromatic` adicionado  
✅ GitHub Action criada (`.github/workflows/deploy-storybook.yml`)  
✅ Config file `chromatic.config.json` criado (ignorado no git)

## 🚀 Como ativar

### 1. Criar conta no Chromatic

1. Acesse: https://www.chromatic.com/
2. Faça login com sua conta do GitHub
3. Clique em **"Add project"**
4. Selecione o repositório: `nenoyago/liv-dev-toolkit`
5. Copie o **Project Token** que será gerado

### 2. Configurar URL customizada (Opcional mas recomendado)

Para ter uma URL mais amigável:

1. No Chromatic Dashboard, vá em **Settings** → **Project settings**
2. Procure por **"Project slug"** ou **"Subdomain"**
3. Configure um slug customizado, exemplo:
   - `nenoyago-design-system`
   - `liv-design-system`
   - `neno-toolkit`

**Resultado:**
```
Antes: https://68e56bc427fd47846235f3f9-efgjjrvvzx.chromatic.com/
Depois: https://main--neno-toolkit.chromatic.com/
```

### 2. Adicionar o token no GitHub

1. Vá para o seu repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Configure:
   - **Name:** `CHROMATIC_PROJECT_TOKEN`
   - **Secret:** Cole o token copiado do Chromatic
5. Clique em **Add secret**

### 3. Testar localmente (opcional)

```bash
# Defina a variável de ambiente temporariamente
export CHROMATIC_PROJECT_TOKEN=seu-token-aqui

# Execute o deploy
pnpm chromatic
```

### 4. Fazer push e testar

```bash
git add .
git commit -m "feat: add chromatic integration"
git push
```

A action vai rodar automaticamente! 🎉

## 🔍 Como funciona

### Em PRs (Pull Requests):

- ✅ Roda visual testing
- ✅ Cria preview do Storybook
- ✅ Detecta mudanças visuais
- ✅ Adiciona comentário na PR com o link

### Na branch main:

- ✅ Publica Storybook em produção
- ✅ Auto-aceita mudanças visuais
- ✅ Atualiza baseline de snapshots

## 📚 URLs do Storybook

Após o primeiro deploy, você terá:

- **Produção (main):**  
  `https://main--seu-projeto-id.chromatic.com/`

- **Preview (PRs):**  
  `https://pr-123--seu-projeto-id.chromatic.com/`

- **Branch específica:**  
  `https://nome-branch--seu-projeto-id.chromatic.com/`

## 💡 Scripts disponíveis

```bash
# Deploy manual para Chromatic
pnpm chromatic

# Rodar Storybook localmente
pnpm storybook

# Build do Storybook
pnpm build:storybook
```

## ⚙️ Configurações da Action

A action roda quando:

- ✅ Push na `main` com mudanças em:
  - `projects/design-system/**`
  - `.storybook/**`
  - `package.json`
- ✅ Pull Requests com as mesmas mudanças
- ✅ Manualmente via workflow dispatch

### Features habilitadas:

- `exitZeroOnChanges: true` - Não falha se houver mudanças visuais
- `autoAcceptChanges: true` (main) - Auto-aceita mudanças na main
- `onlyChanged: true` - Testa apenas stories modificadas (mais rápido)

## 🎯 Próximos passos

1. **Configure o projeto no Chromatic**
2. **Adicione o token no GitHub Secrets**
3. **Faça um push para testar**
4. **Convide sua equipe** no Chromatic para colaborar

## 📖 Documentação

- [Chromatic Docs](https://www.chromatic.com/docs/)
- [GitHub Action](https://github.com/chromaui/action)
- [Visual Testing](https://www.chromatic.com/docs/test)

---

**🆓 Lembre-se:** Chromatic é **GRÁTIS** para:

- Hosting ilimitado do Storybook
- 5.000 snapshots/mês
- Unlimited users
- Repos públicos e privados

Só paga se precisar de mais snapshots! 🚀

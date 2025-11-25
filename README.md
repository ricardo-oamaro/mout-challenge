# Testes Automatizados E2E - ServeRest

Projeto de testes automatizados end-to-end (E2E) e API para a aplicação ServeRest utilizando Cypress, Cucumber/Gherkin e Mochawesome Reporter.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração](#configuração)
- [Executando Testes](#executando-testes)
- [Gerando Relatórios](#gerando-relatórios)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Comandos Customizados](#comandos-customizados)
- [Troubleshooting](#troubleshooting)

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com Node.js)
- **Google Chrome** (para execução headless)

## 📦 Instalação

1. Clone o repositório (se aplicável):
```bash
git clone <url-do-repositorio>
cd mouts_challenge
```

2. Instale as dependências:
```bash
npm install
```

## 📁 Estrutura do Projeto

```
mouts_challenge/
├── cypress/
│   ├── e2e/                    # Testes E2E e API
│   │   ├── cadastro/           # Testes de cadastro de usuário
│   │   ├── login/              # Testes de login/logout
│   │   ├── fluxo-compra/       # Testes de fluxo de compra
│   │   └── api/                # Testes de API
│   │       ├── usuarios/       # Testes API de usuários
│   │       └── produtos/       # Testes API de produtos
│   ├── fixtures/               # Dados de teste (JSON)
│   ├── locators/               # Seletores organizados por feature
│   ├── reports/                # Relatórios gerados
│   │   └── html/              # Relatórios HTML consolidados
│   ├── screenshots/            # Screenshots de falhas
│   └── support/                # Comandos customizados e configurações
│       ├── commands.js        # Comandos E2E customizados
│       ├── api-commands.js    # Comandos API customizados
│       ├── e2e.js             # Configurações de suporte
│       └── generate-report.js # Script de geração de relatórios
├── cypress.config.js           # Configuração do Cypress
└── package.json               # Dependências e scripts
```

## 🛠 Tecnologias Utilizadas

- **Cypress 13.6.0** - Framework de testes E2E
- **Cucumber/Gherkin** - BDD (Behavior Driven Development)
- **@badeball/cypress-cucumber-preprocessor** - Integração Cucumber com Cypress
- **Mochawesome Reporter** - Geração de relatórios HTML
- **esbuild** - Bundler para processamento de arquivos

## ⚙️ Configuração

O projeto está configurado para testar a aplicação ServeRest:

- **Base URL**: `https://front.serverest.dev`
- **API URL**: `https://serverest.dev`
- **Viewport**: 1280x720
- **Timeout padrão**: 10 segundos
- **Retries**: 1 tentativa em modo run

## 🚀 Executando Testes

### Modo Interativo (Cypress UI)

Abra a interface gráfica do Cypress:
```bash
npm run cy:open
# ou
npm test
```

### Modo Headless (Linha de Comando)

#### Testes Individuais

**Cadastro de Usuário:**
```bash
npm run test:cadastro
```

**Login/Logout:**
```bash
npm run test:login
```

**Fluxo de Compra:**
```bash
npm run test:compra
```

#### Testes E2E Completos

Executa todos os testes E2E (cadastro, login, fluxo-compra):
```bash
npm run test:e2e
```

#### Testes API

**Todos os testes API:**
```bash
npm run test:api
```

**Testes API de Usuários:**
```bash
npm run test:api:usuarios
```

**Testes API de Produtos:**
```bash
npm run test:api:produtos
```

#### Todos os Testes

Executa todos os testes (E2E + API):
```bash
npm run test:all
```

### Opções de Browser

Por padrão, os testes rodam no **Chrome em modo headless**. Para usar outros browsers:

```bash
# Electron (padrão do Cypress)
npm run cy:run

# Chrome headless (configurado nos scripts)
npm run cy:run:chrome
```

## 📊 Gerando Relatórios

### Gerar Relatório Após Execução

Após executar os testes, gere o relatório HTML consolidado:

```bash
npm run generate:report
```

### Executar Testes e Gerar Relatório em um Comando

**Testes E2E com relatório:**
```bash
npm run test:e2e:report
```

**Testes API com relatório:**
```bash
npm run test:api:report
```

**Todos os testes com relatório:**
```bash
npm run test:all:report
```

### Limpar Relatórios Anteriores

Antes de gerar novos relatórios, você pode limpar os anteriores:

```bash
npm run clean:reports
```

### Localização dos Relatórios

- **Relatórios JSON**: `cypress/reports/`
- **Relatório HTML Consolidado**: `cypress/reports/html/index.html`

Abra o arquivo `index.html` no navegador para visualizar o relatório completo.

## 📂 Estrutura de Arquivos

### Features (Gherkin)

Os testes são escritos em formato Gherkin (Cucumber):

- `cypress/e2e/cadastro/cadastro.feature` - Cenários de cadastro
- `cypress/e2e/login/login.feature` - Cenários de login/logout
- `cypress/e2e/fluxo-compra/fluxo-compra.feature` - Cenários de compra
- `cypress/e2e/api/usuarios/create-user.feature` - Cenários API de usuários
- `cypress/e2e/api/produtos/list-products.feature` - Cenários API de listagem
- `cypress/e2e/api/produtos/create-product.feature` - Cenários API de criação

### Step Definitions

Cada feature tem seu arquivo de step definitions correspondente:

- `cypress/e2e/cadastro/cadastro.js`
- `cypress/e2e/login/login.js`
- `cypress/e2e/fluxo-compra/fluxo-compra.js`
- `cypress/e2e/api/usuarios/create-user.js`
- `cypress/e2e/api/produtos/list-products.js`
- `cypress/e2e/api/produtos/create-product.js`

### Fixtures

Dados de teste organizados em JSON:

- `cypress/fixtures/usuarios.json` - Dados de usuários
- `cypress/fixtures/produtos.json` - Dados de produtos
- `cypress/fixtures/api/payloads.json` - Payloads para testes API

### Locators

Seletores organizados por feature:

- `cypress/locators/cadastro.locators.js`
- `cypress/locators/login.locators.js`
- `cypress/locators/fluxo-compra.locators.js`

## 🔨 Comandos Customizados

O projeto inclui comandos customizados do Cypress para facilitar os testes:

### Comandos E2E (`cypress/support/commands.js`)

**`cy.cadastrarUsuario(nome, email, senha, administrador)`**
- Cadastra um novo usuário no sistema
- Parâmetros:
  - `nome` (string): Nome do usuário
  - `email` (string): Email único do usuário
  - `senha` (string): Senha do usuário
  - `administrador` (boolean): Se é administrador

**`cy.login(email, senha)`**
- Realiza login no sistema
- Parâmetros:
  - `email` (string): Email do usuário
  - `senha` (string): Senha do usuário

**`cy.logout()`**
- Realiza logout do sistema

### Comandos API (`cypress/support/api-commands.js`)

**`cy.apiLogin(email, password)`**
- Autentica via API e retorna token
- Retorna: Token de autorização

**`cy.apiCreateUser(userData)`**
- Cria usuário via API
- Parâmetros: Objeto com dados do usuário

**`cy.apiCreateProduct(productData, authToken)`**
- Cria produto via API (requer autenticação)
- Parâmetros:
  - `productData` (object): Dados do produto
  - `authToken` (string): Token de autenticação

**`cy.apiGenerateUniqueEmail()`**
- Gera email único para testes
- Retorna: Email único baseado em timestamp

## 🐛 Troubleshooting

### Problemas Comuns

**1. Testes falhando por timeout**
- Verifique a conexão com a internet
- Aumente o `defaultCommandTimeout` no `cypress.config.js` se necessário

**2. Erro ao gerar relatório**
- Certifique-se de que os pacotes estão instalados:
  ```bash
  npm install --save-dev mochawesome-merge mochawesome-report-generator
  ```

**3. Testes não encontram elementos**
- Verifique se os seletores estão atualizados
- Use `cypress open` para inspecionar elementos com Cypress UI

**4. Problemas no macOS Sequoia com modo headless**
- Use Chrome em vez de Electron
- Execute com: `npm run test:all` (já configurado para Chrome)

**5. Relatórios não consolidados**
- Execute `npm run generate:report` após os testes
- Verifique se há arquivos JSON em `cypress/reports/`

### Logs e Debug

Para ver logs detalhados durante a execução:

```bash
# Modo interativo (recomendado para debug)
npm run cy:open
```

Os testes incluem logs informativos usando `cy.log()` para facilitar o debug.

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm test` | Abre Cypress UI |
| `npm run cy:open` | Abre Cypress UI |
| `npm run cy:run` | Executa testes no Electron |
| `npm run cy:run:chrome` | Executa testes no Chrome headless |
| `npm run test:cadastro` | Testes de cadastro |
| `npm run test:login` | Testes de login |
| `npm run test:compra` | Testes de fluxo de compra |
| `npm run test:e2e` | Todos os testes E2E |
| `npm run test:e2e:report` | Testes E2E + relatório |
| `npm run test:api` | Todos os testes API |
| `npm run test:api:report` | Testes API + relatório |
| `npm run test:all` | Todos os testes |
| `npm run test:all:report` | Todos os testes + relatório |
| `npm run generate:report` | Gera relatório HTML |
| `npm run clean:reports` | Limpa relatórios anteriores |

## 📚 Recursos Adicionais

- [Documentação Cypress](https://docs.cypress.io/)
- [Cucumber/Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [ServeRest API](https://serverest.dev/)

## 📄 Licença

ISC


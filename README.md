# QA Challenge

## Introdução

Este repositório contém dois testes automatizados.
1. **Validação de fluxos de UI** com **Playwright**.
2. **Interação e validação de APIs** com **Playwright** e **Node.js**.

## Requisitos Técnicos

- **Node.js** >= 14.x
- **TypeScript** >= 4.x
- **Playwright** >= 1.12.x

### Passos para instalação:

1. Clone este repositório:

   ```bash
   git clone <link-do-repositorio>
   cd nome-do-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para rodar os testes de UI:

   ```bash
   npm run test:ui
   ```

4. Para rodar os testes de API:

   ```bash
   npm run test:api
   ```

### Estrutura do Projeto

```plaintext
.
├── tests/
│   ├── api/
│   │   └── reqres.spec.ts       # Testes de API
│   ├── ui/
│   │   └── swaglabs.spec.ts     # Testes de UI
├── pages/
│   ├── login.ts                 # Página de login
│   ├── carrinho.ts              # Página do carrinho
├── utils/
│   └── utils.ts                 # Funções utilitárias
├── playwright.config.ts          # Configuração do Playwright
├── package.json
├── README.md
├── tsconfig.json                # Configuração do TypeScript
└── ...

## Descrição dos Testes

### Parte 1: Automação de UI com Playwright

Você deverá escrever testes automatizados para o site de e-commerce **[Swag Labs Demo](https://www.saucedemo.com/)**.  
As credenciais de login são fornecidas abaixo:

- **Usuário**: `standard_user`
- **Senha**: `secret_sauce`

### Fluxos de Teste de UI

1. **Login no sistema:**
   - Simule um fluxo de login com credenciais corretas.
   - Valide se o usuário foi autenticado e redirecionado para a página principal.
   - **Cenário adicional:** Simule tentativas de login com credenciais incorretas e valide se as mensagens de erro aparecem corretamente.

2. **Adicionar e remover produtos ao carrinho:**
   - Faça o login.
   - Adicione três produtos da lista ao carrinho.
   - Remova dois produtos.
   - Valide se os produtos restantes no carrinho são os corretos.
   - **Cenário adicional:** Valide se o contador do carrinho é atualizado corretamente à medida que os produtos são adicionados/removidos.

3. **Simulação de erro na finalização da compra:**
   - Após adicionar produtos ao carrinho, tente finalizar a compra sem preencher os dados obrigatórios no checkout (nome, endereço, etc.).
   - Valide se as mensagens de erro são exibidas e se o sistema bloqueia o usuário de finalizar a compra.

---

### Parte 2: Testes de API com Playwright

Você deverá interagir com a API pública de simulação **[Reqres](https://reqres.in/)**.  
Escreva testes para validar as respostas e o comportamento da API.

### Fluxos de Teste de API

1. **Listar usuários e validar dados:**
   - Faça uma requisição `GET` para o endpoint `/api/users?page=2`.
   - Valide o status da resposta (200) e o conteúdo retornado, verificando se os usuários possuem os campos corretos (`id`, `first_name`, `last_name`, `email`).
   - **Cenário adicional:** Valide a estrutura de dados da resposta usando assertions (ex: garantir que `email` tenha um formato válido).

2. **Criar e atualizar um usuário:**
   - Faça uma requisição `POST` para o endpoint `/api/users` com um payload de criação.
   - Valide se a resposta contém o código de status 201 e o usuário criado contém os dados corretos.
   - Faça uma requisição `PUT` para o endpoint `/api/users/2` e valide se o usuário foi atualizado corretamente.
   - **Cenário adicional:** Valide se os tempos de resposta da API estão dentro de limites aceitáveis.

3. **Manipulação de falhas na API:**
   - Faça uma requisição `DELETE` para um usuário que não existe (`/api/users/999`) e valide se a resposta correta de erro (404) é retornada.
   - Simule um cenário de falha de rede ou tempo limite na API e verifique se o sistema lida com o erro corretamente.

---

### Melhorias Técnicas

1. **Relatórios de Testes:**
   - Um **relatório HTML** ao final da execução dos testes.

2. **Execução Paralela:**
   - Os testes de API e UI podem ser executados em paralelo para otimizar o tempo de execução. 

3. **Pipeline de CI/CD:**
   - uma pipeline de integração contínua usando GitHub Actions para garantir que o projeto seja automaticamente testado ao fazer um push no repositório. (não finalizado)

---

 Se tiver dúvidas, entre em contato.

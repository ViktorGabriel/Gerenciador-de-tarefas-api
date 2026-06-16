# 📋 Task Manager API

Uma API REST completa, robusta e tipada para o gerenciamento de tarefas com foco em organização pessoal e produtividade. O projeto foi desenvolvido seguindo padrões rigorosos de arquitetura de software de mercado, garantindo separação de responsabilidades, validação estrita de dados e tratamento global de exceções.

---

## 🚀 Tecnologias Utilizadas

* **Node.js** & **TypeScript** (Garante tipagem estática e maior segurança no desenvolvimento)
* **Express** (Framework leve para gerenciamento de rotas e middlewares HTTP)
* **Prisma ORM** (Abstração de banco de dados com suporte total a type-safety)
* **SQLite** (Banco de dados relacional local, leve e de rápida configuração)
* **Zod** (Validação de schemas em tempo de execução)
* **Swagger UI** (Documentação interativa e viva da API)

---

## 🏛️ Arquitetura e Boas Práticas

Para garantir a manutenibilidade e a escalabilidade do software, o projeto foi estruturado seguindo o padrão de arquitetura **MSC (Model-Service-Controller)**, aplicando princípios do **SOLID**:

* **Controllers (`src/controllers`):** Responsáveis exclusivamente por interceptar as requisições HTTP, extrair os dados necessários e acionar a camada de negócio.
* **Services (`src/services`):** Onde reside o "coração" da aplicação. Toda a lógica de negócio, regras de validação via **Zod** e lançamentos de erros de negócio ocorrem aqui.
* **Repositories (`src/repositories`):** Camada isolada que conversa diretamente com o banco de dados através do **Prisma Client**, desacoplando a infraestrutura do restante do código.
* **Global Error Handler (`src/errors`):** Middleware centralizado para captura de erros assíncronos (`express-async-errors`). Ele intercepta falhas de validação, erros de negócio mapeados (`AppError`) e esconde logs internos em caso de erros inesperados do servidor (`500 Internal Server Error`).
* **Conventional Commits:** Histórico do Git estruturado de forma incremental utilizando prefixos claros (`feat:`, `chore:`, `docs:`), refletindo boas práticas de controle de versão.

---

## 📖 Documentação Interativa (Swagger)

A API possui documentação completa e viva estruturada com o Swagger. Com o servidor rodando, você pode acessar, visualizar e testar todos os endpoints (fazer requisições reais direto pelo navegador) através da rota:

```text
http://localhost:3000/api-docs
```

## 🔧 Instalação e Execução

Siga os passos abaixo para configurar o ambiente e rodar a aplicação:

1. **Clone o repositório** (ou baixe os arquivos do projeto):
   ```bash
   git clone <url-do-repositorio>
   cd Gerenciador-de-tarefas
   ```

2. **Instale as dependências** (Node.js deve estar instalado): 
   ```bash
   npm install
   ```

3. **Execute a aplicação em modo de desenvolvimento** (com hot-reload via `ts-node-dev`):
   ```bash
   npm run dev
   ```

   O servidor iniciará automaticamente e a documentação estará disponível em: `http://localhost:3000/api-docs`.

# NettCorpSolutions Backend

Este projeto é a API backend para o NettCorpSolutions, construída com Node.js e Express, utilizando MongoDB como banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução do JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **Mongoose**: ODM para MongoDB.
- **JWT**: Para autenticação baseada em tokens.
- **Nodemailer**: Para envio de emails.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Estrutura do Projeto

- **src/**: Contém o código-fonte do servidor.
  - **auth/**: Rotas e lógica de autenticação.
  - **contato/**: Gerenciamento de contatos.
  - **faleconosco/**: Gerenciamento de solicitações de "Fale Conosco".
  - **service/**: Gerenciamento de solicitações de serviço.
  - **user/**: Gerenciamento de usuários.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm start`: Inicia o servidor em modo de produção.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com nodemon.

## Configuração

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor com `npm run dev`.

<!-- ## Contribuição

Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a licença MIT. -->

# ChronicRelief

**ChronicRelief** é uma API desenvolvida para a aquisição de métricas e auto-monitoramento de pessoas com doenças crônicas. Este projeto foi criado como parte da Residência em Desenvolvimento de Software na **Rope Health**, no semestre 2024.2, através da faculdade **UNINASSAU**, com bolsa fornecida pelo **Porto Digital**.

## Tecnologias Utilizadas

A API foi construída utilizando:

- **Node.js**: como ambiente de execução do JavaScript no servidor.
- **Express**: framework para construção de APIs robustas e escaláveis.
- **MongoDB**: banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ORM para modelagem e integração com o MongoDB.
- **Nodemailer**: envio de emails, como notificações e lembretes.
- **JWT (jsonwebtoken)**: autenticação segura baseada em tokens.
- **Swagger**: documentação interativa para as rotas da API.
- **dotenv**: gerenciamento seguro de variáveis de ambiente.
- **helmet**: melhorias de segurança HTTP.
- **express-rate-limit**: proteção contra ataques de força bruta.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Gerenciamento de doenças, medicações e eventos de saúde.
- Notificações e lembretes por email usando **Nodemailer**.
- Suporte a tarefas programadas com **node-cron**.
- Documentação interativa com **Swagger**.
- Testes de rotas utilizando **Insomnia**.

---

## Como Utilizar a API

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FR-macedo/ChronicRelief.git
   ```
2. **Entre na pasta do projeto**:
   ```bash
   cd ChronicRelief
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias. Exemplo:
   ```env
   MONGODB_URL=seu_mongodb_url
   JWT_SECRET=sua_chave_secreta
   EMAIL_USER=seu_email
   EMAIL_PASS=sua_senha
   ```

5. **Inicie o servidor**:
   - Modo produção:
     ```bash
     npm start
     ```
   - Modo desenvolvimento:
     ```bash
     npm run dev
     ```

6. **Acesse a API**:
   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000) (ou na porta configurada).

---

## Documentação da API

A documentação da API foi feita com **Swagger** e pode ser acessada localmente:

1. Inicie o servidor.
2. Acesse: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

Essa interface interativa permite explorar e testar todas as rotas disponíveis.

---

## Testes com Insomnia

1. Importe o arquivo de rotas do Insomnia localizado em `tests/insomniaRoutes`.
2. Abra o **Insomnia** e importe o arquivo JSON.
3. Certifique-se de configurar as variáveis de ambiente do Insomnia para usar os dados corretos (como a URL base da API e os tokens de autenticação, se necessário).
4. Execute os testes para validar as rotas da API.

---

## Contribuindo para o Projeto

Se você deseja contribuir:

1. **Faça um fork do repositório**.
2. **Crie uma branch** para sua feature/bugfix:
   ```bash
   git checkout -b minha-feature
   ```
3. **Faça as alterações e os commits**:
   ```bash
   git commit -m "Descrição do que foi alterado"
   ```
4. **Envie um pull request** explicando as mudanças.

---

## Licença

Este projeto está licenciado sob a [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html). Isso significa que você pode:

- Usar, modificar e distribuir o código.
- Mas deve compartilhar quaisquer alterações ou trabalhos derivados sob a mesma licença.

---

## Agradecimentos

Este projeto só foi possível graças ao suporte de:

- **Rope Health**: pela oportunidade de aprendizado e desenvolvimento.
- **UNINASSAU**: pela base acadêmica.
- **Porto Digital**: pela bolsa e incentivo ao crescimento profissional.

Agradeço também aos professores, colegas e todos que contribuíram para a conclusão deste trabalho.

---

Sinta-se à vontade para explorar, aprender e contribuir para o **ChronicRelief**! 🚀
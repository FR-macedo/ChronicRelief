# ChronicRelief

### Projeto de Gerenciamento de Saúde+-
Este projeto é uma aplicação backend desenvolvida em Node.js usando Express e MongoDB, voltada para o gerenciamento de informações de saúde, incluindo usuários e doenças.

## Sumário

- [Rotas de Usuário](#rotas-de-usuário)
- [Rotas de Doenças](#rotas-de-doenças)
- [Middleware de Autenticação](#middleware-de-autenticação)
- [Rotas de Documentos](###Rotas-de-Documentos)

---

## Rotas de Usuário

### 1. Registrar um novo usuário

**Endpoint:** `POST /api/users/register`  
**Body:**
```json
{
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "senha": "senhaSegura"
}
```

**Descrição:** Cria um novo usuário no sistema. Retorna um token JWT após o registro bem-sucedido.

### 2. Fazer login

**Endpoint:** `POST /api/users/login`  
**Body:**
```json
{
  "email": "email@exemplo.com",
  "senha": "senhaSegura"
}
```

**Descrição:** Realiza a autenticação do usuário. Retorna um token JWT se as credenciais estiverem corretas.

---

## Rotas de Doenças

### 1. Criar uma nova doença

**Endpoint:** `POST /api/doencas`  
**Body:**
```json
{
  "nome": "Nome da Doença",
  "sintomas": "Descrição dos sintomas",
  "dataDiagnostico": "2024-01-01"
}
```

**Descrição:** Cria uma nova doença associada ao usuário autenticado. O ID do usuário é extraído do token JWT.

### 2. Visualizar todas as doenças

**Endpoint:** `GET /api/doencas`  
**Descrição:** Retorna uma lista de todas as doenças associadas ao usuário autenticado.

### 3. Obter uma doença específica

**Endpoint:** `GET /api/doencas/:id`  
**Parâmetros:**
- `id`: ID da doença a ser recuperada.

**Descrição:** Retorna os detalhes de uma doença específica.

### 4. Atualizar uma doença

**Endpoint:** `PUT /api/doencas/:id`  
**Parâmetros:**
- `id`: ID da doença a ser atualizada.

**Body:**
```json
{
  "nome": "Novo Nome da Doença",
  "sintomas": "Novos sintomas",
  "dataDiagnostico": "2024-01-01"
}
```

**Descrição:** Atualiza os detalhes de uma doença específica.

### 5. Apagar uma doença

**Endpoint:** `DELETE /api/doencas/:id`  
**Parâmetros:**
- `id`: ID da doença a ser deletada.

**Descrição:** Remove uma doença específica do banco de dados.

---

## Middleware de Autenticação

O middleware de autenticação (`authMiddleware`) é responsável por validar o token JWT enviado no cabeçalho das requisições. Ele verifica se o token é válido e se o usuário associado existe. Se a validação for bem-sucedida, o ID do usuário é adicionado ao objeto de requisição para uso nas rotas.

### Como usar o Middleware

As rotas que requerem autenticação devem incluir o middleware como um parâmetro antes da função de controle. Por exemplo:

```javascript
router.post('/api/doencas', authMiddleware, async (req, res) => {
  // Lógica para criar uma nova doença
});
```

---


### Rotas de Documentos

Esta seção descreve as rotas disponíveis para o upload, gerenciamento e recuperação de documentos dentro da aplicação. Os documentos são associados a usuários autenticados, permitindo um controle de acesso adequado.

#### 1. Fazer upload de um novo documento

**Endpoint:** `POST /api/documentos/upload`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário, avvi ser usado para adquirir o ID do usuário)

**Body:**
- **JSON:**  
  - seguindo esse modelo:

  ```
  {
    "Filename":"Nome_do_Documento.pdf",
    "contentType":"application/pdf",
    "base64Data":"sdnkkjnfsiddfjsdkgsodg..."
  }
  ```

**Descrição:** Esta rota permite que um usuário autenticado faça o upload de um novo documento. O documento será através da base64 do arquivo e associado ao ID do usuário logado.

#### 2. Buscar todos os documentos de um usuário

**Endpoint:** `GET /api/documentos`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário)

**Descrição:** Recupera todos os documentos que pertencem ao usuário autenticado. Esta rota garante que o usuário veja apenas seus próprios documentos.

#### 3. Buscar um documento específico

**Endpoint:** `GET /api/documentos/:id`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário)

**Parâmetros:**
- `id`: ID do documento a ser recuperado.

**Descrição:** Esta rota busca um documento específico pelo seu ID. O acesso é restrito, garantindo que apenas o usuário que fez o upload do documento possa visualizá-lo.

#### 4. Atualizar um documento

**Endpoint:** `PUT /api/documentos/:id`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário)

**Parâmetros:**
- `id`: ID do documento a ser atualizado.

**Body:**
- **Form Data:**  
  - `documento`: Arquivo do tipo PDF, DOC ou DOCX.

**Descrição:** Permite que um usuário autenticado atualize um documento existente. O ID do documento deve ser fornecido na URL, e a atualização só será bem-sucedida se o usuário for o dono do documento.

#### 5. Deletar um documento

**Endpoint:** `DELETE /api/documentos/:id`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário)

**Parâmetros:**
- `id`: ID do documento a ser deletado.

**Descrição:** Remove um documento específico, tanto da coleção do MongoDB quanto do GridFS, garantindo que o documento não permaneça no sistema após a exclusão.

#### 6. Baixar um documento

**Endpoint:** `GET /api/documentos/:id/download`  
**Headers:**
- `Authorization: Bearer <token>` (token JWT do usuário)

**Parâmetros:**
- `id`: ID do documento a ser baixado.

**Descrição:** Esta rota (em implementação) permitirá que os usuários façam o download de documentos específicos que tenham feito upload anteriormente. A lógica para a recuperação do arquivo do GridFS deve ser adicionada.

---

Essas rotas garantem um gerenciamento eficaz de documentos, permitindo que os usuários façam upload, busquem, atualizem e excluam seus documentos de forma segura e eficiente.


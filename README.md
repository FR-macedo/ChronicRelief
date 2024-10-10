# ChronicRelief

### Projeto de Gerenciamento de Saúde+-
Este projeto é uma aplicação backend desenvolvida em Node.js usando Express e MongoDB, voltada para o gerenciamento de informações de saúde, incluindo usuários e doenças.

## Sumário

- [Rotas de Usuário](#rotas-de-usuário)
- [Rotas de Doenças](#rotas-de-doenças)
- [Middleware de Autenticação](#middleware-de-autenticação)

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


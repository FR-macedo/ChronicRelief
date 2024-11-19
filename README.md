# ChronicRelief
> Projeto de Gerenciamento de Saúde

Este projeto é uma aplicação backend desenvolvida em Node.js com Express e MongoDB, voltada para o gerenciamento de informações de saúde, incluindo usuários, doenças, medicações e documentos.

## Sumário

- [Rotas de Usuário](#rotas-de-usuário)
- [Rotas de Doenças](#rotas-de-doenças)
- [Middleware de Autenticação](#middleware-de-autenticação)
- [Rotas de Documentos](#rotas-de-documentos)
- [Rotas de Medicações](#rotas-de-medicações)
- [Rotas dos Formulários MS](#rotas-dos-formulários-ms)
- [Rotas dos Formulários PS](#rotas-dos-formulários-ps)
- [Rotas dos Formulários JP](#rotas-dos-formulários-jp)

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

## Middleware de Autenticação

O middleware de autenticação (`authMiddleware`) é responsável por validar o token JWT enviado no cabeçalho das requisições. Ele verifica se o token é válido e se o usuário associado existe. Se a validação for bem-sucedida, o ID do usuário é adicionado ao objeto de requisição para uso nas rotas.

### Como usar o Middleware

As rotas que requerem autenticação devem incluir o middleware como um parâmetro antes da função de controle. Exemplo:

```javascript
router.post('/api/doencas', authMiddleware, async (req, res) => {
  // Lógica para criar uma nova doença
});
```

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

## Rotas de Documentos

### 1. Fazer upload de um novo documento

**Endpoint:** `POST /api/documentos/upload`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "filename": "Nome_do_Documento.pdf",
  "contentType": "application/pdf",
  "base64Data": "sdnkkjnfsiddfjsdkgsodg..."
}
```

**Descrição:** Permite que um usuário autenticado faça o upload de um novo documento. O documento será armazenado em base64 e associado ao ID do usuário.

### 2. Buscar todos os documentos de um usuário

**Endpoint:** `GET /api/documentos`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Recupera todos os documentos que pertencem ao usuário autenticado.

### 3. Buscar um documento específico

**Endpoint:** `GET /api/documentos/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Parâmetros:**
- `id`: ID do documento a ser recuperado.

**Descrição:** Busca um documento específico pelo seu ID.

## Rotas de Medicações

### 1. Criar uma nova medicação

**Endpoint:** `POST /api/medicacoes`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "nome": "Nome da Medicação",
  "dosagem": "Dosagem da Medicação",
  "frequencia": "Frequência de Administração",
  "horarioAlarme": "08:00",
  "dataInicio": "2024-01-01",
  "dataFim": "2024-12-31",
  "recorrencia": {
    "tipo": "semanal",
    "intervalos": 1,
    "diasDaSemana": ["segunda", "quarta", "sexta"]
  }
}
```

**Descrição:** Cria uma nova medicação associada ao usuário autenticado.

## Rotas dos Formulários MS

### 1. Criar um Registro Diário

**Endpoint:** `POST /api/diario/create`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "data": "2024-01-01",
  "sintomas": "Descrição dos sintomas",
  "medicacoes": ["Medicamento1", "Medicamento2"],
  "observacoes": "Observações adicionais"
}
```

**Descrição:** Esta rota cria um novo registro diário para a persona MS, associando sintomas e medicações específicas à data registrada.

### 2. Listar Registros Diários

**Endpoint:** `GET /api/diario`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Retorna uma lista de todos os registros diários criados pelo usuário autenticado para a persona MS.

### 3. Buscar um Registro Diário Específico

**Endpoint:** `GET /api/diario/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Parâmetros:**
- `id`: ID do registro diário a ser recuperado.

**Descrição:** Retorna os detalhes de um registro diário específico da persona MS com base no ID fornecido.

### 4. Atualizar um Registro Diário

**Endpoint:** `PUT /api/diario/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "data": "2024-01-02",
  "sintomas": "Novos sintomas",
  "medicacoes": ["Novo Medicamento"],
  "observacoes": "Novas observações"
}
```

**Descrição:** Atualiza os dados de um registro diário específico da persona MS.

### 5. Deletar um Registro Diário

**Endpoint:** `DELETE /api/diario/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Exclui um registro diário específico da persona MS do sistema.

## Rotas dos Formulários PS

### 1. Criar um Registro Semanal

**Endpoint:** `POST /api/semanal/create`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "semana": "2024-W01",
  "atividades": ["Atividade1", "Atividade2"],
  "observacoes": "Observações adicionais"
}
```

**Descrição:** Cria um novo registro semanal para a persona PS, com informações de atividades e observações.

### 2. Listar Registros Semanais

**Endpoint:** `GET /api/semanal`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Retorna uma lista de todos os registros semanais criados pelo usuário autenticado para a persona PS.

### 3. Buscar um Registro Semanal Específico

**Endpoint:** `GET /api/semanal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Parâmetros:**
- `id`: ID do registro semanal a ser recuperado.

**Descrição:** Retorna os detalhes de um registro semanal específico da persona PS.

### 4. Atualizar um Registro Semanal

**Endpoint:** `PUT /api/semanal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "semana": "2024-W02",
  "atividades": ["Nova Atividade"],
  "observacoes": "Novas observações"
}
```

**Descrição:** Atualiza um registro semanal específico da persona PS.

### 5. Deletar um Registro Semanal

**Endpoint:** `DELETE /api/semanal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Exclui um registro semanal específico da persona PS do sistema.

## Rotas dos Formulários JP

### 1. Criar um Registro Mensal

**Endpoint:** `POST /api/mensal/create`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "mes": "2024-01",
  "objetivos": ["Objetivo1", "Objetivo2"],
  "observacoes": "Observações adicionais"
}
```

**Descrição:** Cria um novo registro mensal para a persona JP, incluindo objetivos e observações específicas.

### 2. Listar Registros Mensais

**Endpoint:** `GET /api/mensal`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Retorna uma lista de todos os registros mensais criados pelo usuário autenticado para a persona JP.

### 3. Buscar um Registro Mensal Específico

**Endpoint:** `GET /api/mensal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Parâmetros:**
- `id`: ID do registro mensal a ser recuperado.

**Descrição:** Retorna os detalhes de um registro mensal específico da persona JP.

### 4. Atualizar um Registro Mensal

**Endpoint:** `PUT /api/mensal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "mes": "2024-02",
  "objetivos": ["Novo Objetivo"],
  "observacoes": "Novas observações"
}
```

**Descrição:** Atualiza um registro mensal específico da persona JP.

### 5. Deletar um Registro Mensal

**Endpoint:** `DELETE /api/mensal/:id`

**Headers:**
- `Authorization: Bearer <token>`

**Descrição:** Exclui um registro mensal específico da persona JP do sistema.
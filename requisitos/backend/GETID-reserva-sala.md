# Sistema de Reserva de Salas — Regras de Negócio GET /reservas/:id

## Objetivo

Documentar todas as regras de negócio implementadas no endpoint responsável pela consulta de uma reserva específica.

---

# Endpoint

```http
GET /reservas/:id
```

---

# Descrição

Endpoint responsável por:

- Consultar uma reserva específica
- Buscar reserva pelo ID
- Retornar detalhes completos da reserva
- Garantir integridade da consulta

---

# Path Params

| Campo | Tipo | Obrigatório |
|---|---|---|
| id | string (UUID) | Sim |

---

# Regra 01 — ID da Reserva é Obrigatório

O endpoint deve receber o identificador da reserva através da URL.

---

## Exemplo válido

```http
GET /reservas/85c1b1c0-9768-470a-b336-a05c0c9b3eb8
```

---

## Exemplo inválido

```http
GET /reservas/
```

---

## Retorno esperado

```json
{
  "message": "ID da reserva é obrigatório"
}
```

---

# Regra 02 — Reserva Deve Existir

O sistema deve validar se a reserva informada existe na base de dados.

---

## Exemplo inválido

```http
GET /reservas/uuid-inexistente
```

---

## Retorno esperado

```json
{
  "message": "Reserva não encontrada"
}
```

---

# Regra 03 — Retornar Dados da Reserva

O sistema deve retornar os dados completos da reserva encontrada.

---

## Exemplo de resposta

```json
{
  "id": "85c1b1c0-9768-470a-b336-a05c0c9b3eb8",
  "sala": "Brasil",
  "responsavel": "Thiago",
  "data": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:00",
  "participantes": [
    "Maria",
    "João"
  ],
  "status": "ATIVA",
  "createdAt": "2026-05-14T10:00:00.000Z"
}
```

---

# Regra 04 — Resposta Deve Ser em JSON

Todas as respostas devem utilizar formato:

```txt
application/json
```

---

# Regra 05 — Não Alterar Dados

O endpoint GET deve apenas consultar informações.

Não deve:

- alterar reservas
- deletar reservas
- criar registros

---

# Persistência

As reservas devem ser consultadas utilizando:

- PostgreSQL
- Prisma ORM

---

# Fluxo Esperado do Endpoint

## Fluxo de sucesso

1. Receber ID
2. Validar ID
3. Buscar reserva
4. Validar existência
5. Retornar reserva

---

# Resposta de Sucesso

## HTTP 200

```json
{
  "id": "uuid",
  "sala": "Brasil",
  "responsavel": "Thiago",
  "data": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:00",
  "participantes": [],
  "status": "ATIVA"
}
```

---

# Possíveis Status HTTP

| Status | Descrição |
|---|---|
| 200 | Consulta realizada com sucesso |
| 400 | Dados inválidos |
| 404 | Reserva não encontrada |
| 500 | Erro interno do servidor |

---

# Cenários de Teste

---

## Cenário 01 — Buscar reserva existente

### Request

```http
GET /reservas/85c1b1c0-9768-470a-b336-a05c0c9b3eb8
```

---

### Resultado esperado

```json
{
  "id": "85c1b1c0-9768-470a-b336-a05c0c9b3eb8",
  "sala": "Brasil"
}
```

---

## Cenário 02 — Buscar reserva inexistente

### Request

```http
GET /reservas/uuid-inexistente
```

---

### Resultado esperado

```json
{
  "message": "Reserva não encontrada"
}
```

---

# Regras Técnicas

| Regra | Descrição |
|---|---|
| ORM | Prisma |
| Banco | PostgreSQL |
| Tipo ID | UUID |
| Arquitetura | Controller + Validator |

---

# Observações

- O endpoint é somente leitura.
- O endpoint será utilizado futuramente pelo frontend React.
- O endpoint poderá futuramente possuir autenticação e autorização.

---
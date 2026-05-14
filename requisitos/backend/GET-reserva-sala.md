# Sistema de Reserva de Salas — Regras de Negócio GET /reservas

## Objetivo

Documentar todas as regras de negócio implementadas no endpoint responsável pela consulta de reservas.

---

# Endpoint

```http
GET /reservas
```

---

# Descrição

Endpoint responsável por:

- Listar reservas cadastradas
- Consultar dados persistidos
- Retornar informações das reservas
- Permitir futuras implementações de filtros e paginação

---

# Regras de Negócio

---

# Regra 01 — Listar Todas as Reservas

O sistema deve retornar todas as reservas cadastradas no banco de dados.

---

## Exemplo de resposta

```json
[
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
]
```

---

# Regra 02 — Ordenar por Data de Criação

As reservas devem ser retornadas da mais recente para a mais antiga.

---

## Ordenação esperada

```txt
createdAt DESC
```

---

# Regra 03 — Retornar Lista Vazia Quando Não Existirem Reservas

O sistema não deve retornar erro quando não existirem reservas cadastradas.

Deve retornar:

```json
[]
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

1. Receber requisição
2. Buscar reservas no banco
3. Ordenar reservas
4. Retornar lista

---

# Resposta de Sucesso

## HTTP 200

```json
[
  {
    "id": "85c1b1c0-9768-470a-b336-a05c0c9b3eb8",
    "sala": "Brasil",
    "responsavel": "Thiago",
    "data": "2026-05-20",
    "horaInicio": "09:00",
    "horaFim": "10:00",
    "participantes": [],
    "status": "ATIVA"
  }
]
```

---

# Possíveis Status HTTP

| Status | Descrição |
|---|---|
| 200 | Consulta realizada com sucesso |
| 500 | Erro interno do servidor |

---

# Cenários de Teste

---

## Cenário 01 — Listar reservas cadastradas

### Request

```http
GET /reservas
```

---

### Resultado esperado

```json
[
  {
    "id": "uuid",
    "sala": "Brasil"
  }
]
```

---

# Cenário 02 — Sem reservas cadastradas

### Request

```http
GET /reservas
```

---

### Resultado esperado

```json
[]
```

---

# Regras Técnicas

| Regra | Descrição |
|---|---|
| ORM | Prisma |
| Banco | PostgreSQL |
| Tipo ID | UUID |
| Arquitetura | Controller + Validator |
| Ordenação | createdAt DESC |

---

# Observações

- O endpoint será utilizado futuramente para:
  - filtros
  - paginação
  - pesquisa
  - dashboard
  - frontend React
- O endpoint não possui validação de body.
- O endpoint é somente leitura.

---
# Sistema de Reserva de Salas — Regras de Negócio DELETE /reservas/:id

## Objetivo

Documentar todas as regras de negócio implementadas no endpoint responsável pela remoção de reservas.

---

# Endpoint

```http
DELETE /reservas/:id
```

---

# Descrição

Endpoint responsável por:

- Remover reservas existentes
- Validar existência da reserva
- Garantir integridade da operação
- Remover permanentemente o registro do banco de dados

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
DELETE /reservas/85c1b1c0-9768-470a-b336-a05c0c9b3eb8
```

---

## Exemplo inválido

```http
DELETE /reservas/
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

O sistema deve validar se a reserva informada existe na base de dados antes da remoção.

---

## Exemplo inválido

```http
DELETE /reservas/uuid-inexistente
```

---

## Retorno esperado

```json
{
  "message": "Reserva não encontrada"
}
```

---

# Regra 03 — Remover Reserva Permanentemente

O sistema deve remover permanentemente o registro da base de dados.

A reserva não deve permanecer armazenada após a exclusão.

---

## Operação esperada

```txt
DELETE físico no banco de dados
```

---

# Regra 04 — Não Permitir Exclusão sem ID

O sistema não deve executar remoções sem o parâmetro `id`.

---

## Exemplo inválido

```http
DELETE /reservas
```

---

## Retorno esperado

```json
{
  "message": "ID da reserva é obrigatório"
}
```

---

# Persistência

As reservas devem ser removidas utilizando:

- PostgreSQL
- Prisma ORM

---

# Fluxo Esperado do Endpoint

## Fluxo de sucesso

1. Receber ID da reserva
2. Validar ID
3. Buscar reserva
4. Validar existência
5. Remover reserva do banco
6. Retornar sucesso

---

# Resposta de Sucesso

## HTTP 200

```json
{
  "message": "Reserva deletada com sucesso"
}
```

---

# Possíveis Status HTTP

| Status | Descrição |
|---|---|
| 200 | Reserva deletada com sucesso |
| 400 | Dados inválidos |
| 404 | Reserva não encontrada |
| 500 | Erro interno do servidor |

---

# Exemplos de Cenários de Teste

---

## Cenário 01 — Deletar reserva existente

### Request

```http
DELETE /reservas/85c1b1c0-9768-470a-b336-a05c0c9b3eb8
```

---

### Resultado esperado

```json
{
  "message": "Reserva deletada com sucesso"
}
```

---

## Cenário 02 — Tentar deletar reserva inexistente

### Request

```http
DELETE /reservas/uuid-inexistente
```

---

### Resultado esperado

```json
{
  "message": "Reserva não encontrada"
}
```

---

## Cenário 03 — Tentar deletar sem informar ID

### Request

```http
DELETE /reservas/
```

---

### Resultado esperado

```json
{
  "message": "ID da reserva é obrigatório"
}
```

---

# Regras Técnicas

| Regra | Descrição |
|---|---|
| ORM | Prisma |
| Banco | PostgreSQL |
| Tipo ID | UUID |
| Exclusão | Hard Delete |
| Arquitetura | Controller + Validator |

---

# Observações

- O endpoint utiliza exclusão física (hard delete).
- Após a exclusão, a reserva não poderá ser recuperada.
- O endpoint deve retornar mensagens claras para facilitar testes de API e automação.
- Todas as respostas devem ser em formato JSON.

---
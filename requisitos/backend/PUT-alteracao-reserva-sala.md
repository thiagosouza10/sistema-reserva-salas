# Sistema de Reserva de Salas — Regras de Negócio PUT /reservas/:id

## Objetivo

Documentar todas as regras de negócio implementadas no endpoint responsável pela atualização de reservas.

---

# Endpoint

```http
PUT /reservas/:id
```

---

# Descrição

Endpoint responsável por:

- Atualizar reservas existentes
- Validar regras de negócio
- Validar conflitos de horário
- Garantir integridade dos dados
- Impedir atualização de reservas inválidas

---

# Path Params

| Campo | Tipo | Obrigatório |
|---|---|---|
| id | number | Sim |

---

# Payload Esperado

```json
{
  "sala": "Portugal",
  "responsavel": "Helena",
  "data": "2026-05-26",
  "horaInicio": "10:00",
  "horaFim": "11:00",
  "participantes": ["Maria", "João"]
}
```

---

# Estrutura dos Campos

| Campo | Tipo | Obrigatório |
|---|---|---|
| sala | string | Sim |
| responsavel | string | Sim |
| data | string | Sim |
| horaInicio | string | Sim |
| horaFim | string | Sim |
| participantes | array | Não |

---

# Regra 01 — ID da Reserva é Obrigatório

O endpoint deve receber o identificador da reserva através da URL.

---

## Exemplo válido

```http
PUT /reservas/1
```

---

## Exemplo inválido

```http
PUT /reservas/
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
PUT /reservas/999
```

---

## Retorno esperado

```json
{
  "message": "Reserva não encontrada"
}
```

---

# Regra 03 — Não Permitir Atualizar Reserva Cancelada

Reservas com status:

```txt
CANCELADA
```

não podem ser alteradas.

---

## Exemplo inválido

```json
{
  "status": "CANCELADA"
}
```

---

## Retorno esperado

```json
{
  "message": "Não é permitido atualizar reserva cancelada"
}
```

---

# Regra 04 — Salas Permitidas

O sistema deve permitir apenas as seguintes salas:

- Brasil
- Portugal
- Espanha

---

## Exemplo inválido

```json
{
  "sala": "Argentina"
}
```

---

## Retorno esperado

```json
{
  "message": "Sala inválida"
}
```

---

# Regra 05 — Responsáveis Permitidos

O sistema deve permitir apenas os responsáveis:

- Thiago
- Helena

---

## Exemplo inválido

```json
{
  "responsavel": "Carlos"
}
```

---

## Retorno esperado

```json
{
  "message": "Responsável inválido"
}
```

---

# Regra 06 — Campos Obrigatórios

Os seguintes campos são obrigatórios:

- sala
- responsavel
- data
- horaInicio
- horaFim

O campo:

- participantes

é opcional.

---

## Retorno esperado

```json
{
  "message": "Campo sala é obrigatório"
}
```

---

# Regra 07 — Campos Não Podem Ser Vazios

O sistema não deve permitir:

- string vazia
- espaços em branco

---

## Exemplo inválido

```json
{
  "sala": "   "
}
```

---

## Retorno esperado

```json
{
  "message": "Campo sala é obrigatório"
}
```

---

# Regra 08 — Validação de Tipos e Formatos

O sistema deve validar os formatos e tipos de todos os campos.

---

# Validações Esperadas

| Campo | Validação |
|---|---|
| sala | string válida |
| responsavel | string válida |
| data | formato YYYY-MM-DD |
| horaInicio | formato HH:mm |
| horaFim | formato HH:mm |
| participantes | array |

---

## Exemplo inválido — Data

```json
{
  "data": "26/05/2026"
}
```

---

## Exemplo inválido — Hora

```json
{
  "horaInicio": "10h"
}
```

---

## Exemplo inválido — Participantes

```json
{
  "participantes": "Thiago"
}
```

---

## Retorno esperado

```json
{
  "message": "Dados inválidos"
}
```

---

# Regra 09 — Não Permitir Datas Retroativas

Não deve ser permitido atualizar reservas com datas anteriores ao dia atual.

---

## Exemplo inválido

```json
{
  "data": "2020-01-01"
}
```

---

## Retorno esperado

```json
{
  "message": "Não é permitido reservar datas passadas"
}
```

---

# Regra 10 — Não Permitir Reservas aos Domingos

O sistema não deve permitir reservas aos domingos.

---

## Retorno esperado

```json
{
  "message": "Não é permitido reservar aos domingos"
}
```

---

# Regra 11 — Hora Fim Deve Ser Maior Que Hora Início

O horário final da reserva deve ser maior que o horário inicial.

---

## Exemplo inválido

```json
{
  "horaInicio": "14:00",
  "horaFim": "13:00"
}
```

---

## Retorno esperado

```json
{
  "message": "Hora fim deve ser maior que hora início"
}
```

---

# Regra 12 — Duração Máxima da Reserva

A reserva não pode ultrapassar 4 horas de duração.

---

## Exemplo inválido

```json
{
  "horaInicio": "09:00",
  "horaFim": "14:00"
}
```

---

## Retorno esperado

```json
{
  "message": "Reserva não pode ultrapassar 4 horas"
}
```

---

# Regra 13 — Horário Permitido para Reservas

As reservas só podem ser realizadas entre:

- 08:00
- 18:00

---

## Exemplo inválido

```json
{
  "horaInicio": "07:00",
  "horaFim": "09:00"
}
```

---

## Retorno esperado

```json
{
  "message": "Reservas permitidas somente entre 08:00 e 18:00"
}
```

---

# Regra 14 — Limite Máximo de Participantes

A reserva deve permitir no máximo 10 participantes.

---

## Exemplo inválido

```json
{
  "participantes": [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "P7",
    "P8",
    "P9",
    "P10",
    "P11"
  ]
}
```

---

## Retorno esperado

```json
{
  "message": "Reserva permite no máximo 10 participantes"
}
```

---

# Regra 15 — Não Permitir Conflito de Horário

A mesma sala não pode possuir reservas sobrepostas no mesmo horário e mesma data.

A validação deve ignorar a própria reserva que está sendo atualizada.

---

## Cenário inválido

### Reserva existente

```json
{
  "id": 2,
  "sala": "Brasil",
  "data": "2026-05-26",
  "horaInicio": "10:00",
  "horaFim": "11:00"
}
```

### Atualização

```json
{
  "id": 1,
  "sala": "Brasil",
  "data": "2026-05-26",
  "horaInicio": "10:30",
  "horaFim": "11:30"
}
```

---

## Retorno esperado

```json
{
  "message": "Sala já reservada nesse horário"
}
```

---

# Persistência

As reservas devem ser persistidas utilizando:

- PostgreSQL
- Prisma ORM

---

# Fluxo Esperado do Endpoint

## Fluxo de sucesso

1. Receber ID da reserva
2. Validar ID
3. Buscar reserva
4. Validar existência
5. Validar status
6. Validar campos obrigatórios
7. Validar formatos
8. Validar regras de negócio
9. Validar conflitos
10. Atualizar reserva
11. Retornar sucesso

---

# Resposta de Sucesso

## HTTP 200

```json
{
  "id": 1,
  "sala": "Portugal",
  "responsavel": "Helena",
  "data": "2026-05-26",
  "horaInicio": "10:00",
  "horaFim": "11:00",
  "participantes": [],
  "status": "ATIVA"
}
```

---

# Possíveis Status HTTP

| Status | Descrição |
|---|---|
| 200 | Reserva atualizada com sucesso |
| 400 | Dados inválidos |
| 404 | Reserva não encontrada |
| 409 | Conflito de horário |
| 500 | Erro interno do servidor |

---
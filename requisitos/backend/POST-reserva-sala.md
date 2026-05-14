# Sistema de Reserva de Salas — Regras de Negócio POST /reservas

## Objetivo

Documentar todas as regras de negócio implementadas no endpoint responsável pela criação de reservas.

---

# Endpoint

```http
POST /reservas
```

---

# Descrição

Endpoint responsável por:

- Criar reservas de salas
- Validar regras de negócio
- Validar conflitos de horário
- Garantir integridade dos dados

---

# Payload Esperado

```json
{
  "sala": "Brasil",
  "responsavel": "Thiago",
  "data": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:00",
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

# Regra 01 — Salas Permitidas

O sistema deve permitir apenas as seguintes salas:

- Brasil
- Portugal
- Espanha

---

## Exemplo válido

```json
{
  "sala": "Brasil"
}
```

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

# Regra 02 — Responsáveis Permitidos

O sistema deve permitir apenas os responsáveis:

- Thiago
- Helena

---

## Exemplo válido

```json
{
  "responsavel": "Thiago"
}
```

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

# Regra 03 — Campos Obrigatórios

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

## Exemplo inválido

```json
{
  "sala": "Brasil"
}
```

---

## Retorno esperado

```json
{
  "message": "Campo responsável é obrigatório"
}
```

---

# Regra 03.1 — Campos Não Podem Ser Vazios

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

# Regra 04 — Conflito de Horário

A mesma sala não pode possuir reservas sobrepostas no mesmo horário e mesma data.

---

## Cenário inválido

### Reserva existente

```json
{
  "sala": "Brasil",
  "data": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:00"
}
```

### Nova tentativa

```json
{
  "sala": "Brasil",
  "data": "2026-05-20",
  "horaInicio": "09:30",
  "horaFim": "10:30"
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

# Regra 05 — Não Permitir Datas Retroativas

Não deve ser permitido criar reservas com datas anteriores ao dia atual.

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

# Regra 06 — Hora Fim Deve Ser Maior Que Hora Início

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

# Regra 07 — Validação de Tipos e Formatos

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
  "data": "20/05/2026"
}
```

---

## Exemplo inválido — Hora

```json
{
  "horaInicio": "9h"
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

# Regra 08 — Duração Máxima da Reserva

A reserva não pode ultrapassar 4 horas de duração.

---

## Exemplo válido

```json
{
  "horaInicio": "09:00",
  "horaFim": "13:00"
}
```

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

# Regra 09 — Não Permitir Reservas aos Domingos

O sistema não deve permitir reservas realizadas aos domingos.

---

## Exemplo inválido

```json
{
  "data": "2026-05-17"
}
```

---

## Retorno esperado

```json
{
  "message": "Não é permitido reservar aos domingos"
}
```

---

# Regra 10 — Limite Máximo de Participantes

A reserva deve permitir no máximo 10 participantes.

---

## Exemplo válido

```json
{
  "participantes": [
    "Maria",
    "João"
  ]
}
```

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

# Regra 11 — Horário Permitido para Reservas

As reservas só podem ser realizadas dentro do horário comercial:

- 08:00 às 18:00

---

## Exemplo válido

```json
{
  "horaInicio": "08:00",
  "horaFim": "12:00"
}
```

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

# Status Inicial da Reserva

Toda reserva criada deve possuir status:

```txt
ATIVA
```

---

# Persistência

As reservas devem ser persistidas utilizando:

- PostgreSQL
- Prisma ORM

---

# Fluxo Esperado do Endpoint

## Fluxo de sucesso

1. Receber payload
2. Validar campos obrigatórios
3. Validar strings vazias
4. Validar sala
5. Validar responsável
6. Validar formatos
7. Validar participantes
8. Validar data retroativa
9. Validar domingo
10. Validar horário inicial e final
11. Validar duração máxima
12. Validar horário comercial
13. Validar conflitos
14. Salvar reserva
15. Retornar sucesso

---

# Resposta de Sucesso

## HTTP 201

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
| 201 | Reserva criada com sucesso |
| 400 | Dados inválidos |
| 409 | Conflito de horário |
| 500 | Erro interno do servidor |

---
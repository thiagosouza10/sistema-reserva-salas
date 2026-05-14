# Sistema de Reserva de Salas

## Objetivo do Projeto

Criar uma aplicação moderna de reserva de salas com foco em:

- Aprendizado de desenvolvimento backend e frontend
- Testes unitários
- Testes de API
- Testes E2E
- Boas práticas de arquitetura
- Regras de negócio bem definidas

---

# Funcionalidades Principais

A aplicação permitirá:

- Criar reservas
- Editar reservas
- Cancelar reservas
- Consultar reservas
- Validar conflitos de horários

---

# Arquitetura da Aplicação

## Backend

Responsável por:

- Regras de negócio
- CRUD
- Banco de dados
- Validações
- API REST
- Testes unitários
- Testes de integração/API

### Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Jest
- Supertest

---

## Frontend

Responsável por:

- Interface moderna
- Formulários
- Listagem de reservas
- Experiência do usuário
- Testes E2E

### Tecnologias

- React
- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

---

# Entidades do Sistema

# Sala

Representa uma sala disponível para reserva.

| Campo | Tipo | Obrigatório |
|---|---|---|
| id | UUID | Sim |
| nome | Texto | Sim |
| capacidade | Número | Sim |
| ativa | Boolean | Sim |

---

# Usuário

Representa um usuário do sistema.

| Campo | Tipo |
|---|---|
| id | UUID |
| nome | Texto |
| email | Texto |

---

# Reserva

Representa uma reserva de sala.

| Campo | Tipo |
|---|---|
| id | UUID |
| salaId | UUID |
| responsavelId | UUID |
| participantes | Lista de usuários |
| data | Data |
| horaInicio | Horário |
| horaFim | Horário |
| status | Texto |

---

# Status da Reserva

| Status | Descrição |
|---|---|
| ATIVA | Reserva válida |
| CANCELADA | Reserva cancelada |

---

# Regras de Negócio

# Regra 1 — Não permitir conflito de horário

Uma sala não pode possuir duas reservas com horários sobrepostos no mesmo dia.

## Exemplo inválido

Reserva existente:
- 10:00 às 11:00

Nova tentativa:
- 10:30 às 11:30

Resultado:
- Deve retornar erro

---

# Regra 2 — Hora final deve ser maior que hora inicial

## Exemplo inválido

- Hora início: 14:00
- Hora fim: 13:00

Resultado:
- Deve retornar erro

---

# Regra 3 — Reserva deve possuir responsável

Toda reserva deve possuir exatamente um responsável.

---

# Regra 4 — Sala deve existir e estar ativa

Não permitir reservas para:

- salas inexistentes
- salas inativas

---

# Regra 5 — Não permitir reservas no passado

## Exemplo inválido

Data atual:
- 13/05/2026

Reserva:
- 10/05/2026

Resultado:
- Deve retornar erro

---

# Regra 6 — Participantes não podem repetir

Não permitir usuários duplicados na lista de participantes.

---

# Regra 7 — Cancelamento deve utilizar soft delete

Reservas canceladas:

- continuam salvas no banco
- não aparecem como reservas ativas

---

# Fluxos do Sistema

# Fluxo — Criar Reserva

## Usuário informa

- Sala
- Responsável
- Participantes
- Data
- Hora início
- Hora fim

## Sistema valida

- Sala existe
- Sala está ativa
- Horário válido
- Sem conflito
- Data válida

## Sistema salva

- Reserva com status ATIVA

---

# Fluxo — Editar Reserva

Usuário poderá alterar:

- Sala
- Horário
- Participantes
- Responsável

O sistema deve validar novamente todas as regras.

---

# Fluxo — Cancelar Reserva

O sistema altera o status da reserva para:

- CANCELADA

---

# Estrutura Inicial da API

# Endpoints

## Reservas

| Método | Endpoint | Objetivo |
|---|---|---|
| POST | /reservas | Criar reserva |
| GET | /reservas | Listar reservas |
| GET | /reservas/:id | Buscar reserva |
| PUT | /reservas/:id | Atualizar reserva |
| DELETE | /reservas/:id | Cancelar reserva |

---

# Exemplo de Payload

## Criar Reserva

```json
{
  "salaId": "1",
  "responsavelId": "10",
  "participantes": ["10", "20"],
  "data": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:00"
}
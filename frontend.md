# Sistema de Reserva de Salas — Documentação Frontend

# Objetivo

Construir uma aplicação frontend moderna, responsiva e profissional para gerenciamento de reservas de salas.

O frontend será integrado com a API já desenvolvida no backend.

O objetivo do projeto é:

- estudar frontend moderno
- estudar integração API
- estudar testes E2E
- estudar usabilidade
- estudar testes automatizados
- criar projeto para portfólio

---

# Objetivos Técnicos

O frontend deve possuir:

- layout moderno
- experiência de usuário premium
- responsividade
- integração com API REST
- componentização
- arquitetura organizada
- validações frontend
- loading states
- feedback visual
- animações suaves

---

# Tecnologias Utilizadas

| Tecnologia | Objetivo |
|---|---|
| React | Biblioteca frontend |
| Vite | Build tool |
| TailwindCSS | Estilização moderna |
| Axios | Consumo API |
| React Hook Form | Formulários |
| Zod | Validações |
| TanStack Query | Cache e gerenciamento API |
| Shadcn/ui | Componentes modernos |
| Lucide React | Ícones |
| React Router DOM | Rotas frontend |
| Sonner | Toast notifications |

---

# Arquitetura Frontend

```txt
src/
├── assets/
├── components/
├── pages/
├── services/
├── hooks/
├── routes/
├── layouts/
├── lib/
├── styles/
├── utils/
└── App.jsx
```

---

# Estrutura das Pastas

| Pasta | Objetivo |
|---|---|
| assets | imagens e ícones |
| components | componentes reutilizáveis |
| pages | telas |
| services | integração API |
| hooks | hooks customizados |
| routes | rotas |
| layouts | layouts |
| lib | configurações |
| styles | estilos globais |
| utils | funções auxiliares |

---

# Layout da Aplicação

O sistema deve possuir:

- sidebar moderna
- header
- cards
- tabela elegante
- modais modernos
- inputs premium
- animações suaves

---

# Identidade Visual

O frontend deve seguir estilo:

- moderno
- clean
- minimalista
- corporativo
- elegante
- SaaS premium

Inspirado em:

- Linear
- Stripe
- Notion
- Vercel

---

# Responsividade

A aplicação deve funcionar em:

| Dispositivo | Suporte |
|---|---|
| Desktop | Sim |
| Tablet | Sim |
| Mobile | Sim |

---

# Funcionalidades

---

# Tela Inicial

## Objetivo

Exibir todas as reservas cadastradas.

---

# Funcionalidades

- listar reservas
- ordenar reservas
- visualizar status
- editar reserva
- deletar reserva
- criar nova reserva

---

# Componentes da Tela

| Componente | Objetivo |
|---|---|
| Header | topo aplicação |
| Sidebar | menu lateral |
| Card resumo | indicadores |
| Tabela reservas | listagem |
| Botão nova reserva | criar reserva |
| Modal reserva | formulário |

---

# Regras de UX

- loading ao buscar dados
- skeleton loading
- feedback visual
- hover effects
- animações suaves
- mensagens amigáveis

---

# Tela Criar Reserva

## Objetivo

Permitir cadastro de reservas.

---

# Campos

| Campo | Tipo |
|---|---|
| sala | select |
| responsavel | select |
| data | datepicker |
| horaInicio | input time |
| horaFim | input time |
| participantes | multiselect |

---

# Regras Frontend

---

# Regra 01 — Campos Obrigatórios

Campos obrigatórios:

- sala
- responsavel
- data
- horaInicio
- horaFim

---

# Regra 02 — Exibir Erros Validação

O frontend deve exibir:

- mensagens abaixo inputs
- bordas vermelhas
- feedback visual

---

# Regra 03 — Bloquear Submit Duplicado

O botão salvar deve ficar desabilitado durante requisição.

---

# Regra 04 — Exibir Loading

Durante requisição:

- loading spinner
- botão desabilitado

---

# Regra 05 — Toast Notifications

Sistema deve exibir:

- sucesso
- erro
- warning

---

# Integração Backend

---

# Base URL

```txt
http://localhost:3333
```

---

# Endpoints

| Método | Endpoint | Objetivo |
|---|---|---|
| GET | /reservas | listar |
| GET | /reservas/:id | buscar |
| POST | /reservas | criar |
| PUT | /reservas/:id | atualizar |
| DELETE | /reservas/:id | deletar |

---

# Fluxos da Aplicação

---

# Fluxo Criar Reserva

1. Usuário abre modal
2. Preenche formulário
3. Frontend valida campos
4. Envia POST API
5. Exibe loading
6. Atualiza listagem
7. Exibe toast sucesso

---

# Fluxo Atualizar Reserva

1. Usuário clica editar
2. Modal abre preenchido
3. Usuário altera dados
4. Frontend valida
5. Envia PUT API
6. Atualiza listagem
7. Exibe toast

---

# Fluxo Deletar Reserva

1. Usuário clica deletar
2. Modal confirmação
3. Usuário confirma
4. Envia DELETE API
5. Atualiza listagem
6. Exibe toast

---

# Componentes Reutilizáveis

| Componente | Objetivo |
|---|---|
| Button | botões |
| Input | inputs |
| Select | selects |
| Modal | modal |
| Table | tabela |
| Card | cards |
| Badge | status |
| Toast | notificações |
| Loading | loading |
| EmptyState | lista vazia |

---

# Estados da Aplicação

| Estado | Objetivo |
|---|---|
| loading | carregando |
| success | sucesso |
| error | erro |
| empty | vazio |

---

# Experiência do Usuário (UX)

O frontend deve transmitir:

- velocidade
- modernidade
- clareza
- facilidade uso
- elegância

---

# Regras de Design

- espaçamento consistente
- bordas suaves
- sombras modernas
- cores suaves
- contraste adequado
- tipografia moderna

---

# Paleta Visual

| Elemento | Estilo |
|---|---|
| Background | claro |
| Cards | branco |
| Bordas | suaves |
| Botões | modernos |
| Hover | suave |
| Shadows | discretas |

---

# Performance

O frontend deve:

- evitar recarregamentos
- atualizar tela automaticamente
- utilizar cache
- evitar loading desnecessário

---

# Tratamento de Erros

O frontend deve tratar:

- API offline
- timeout
- validações
- erro servidor
- erro conexão

---

# Testes Futuros

A aplicação será utilizada para:

- testes E2E
- testes frontend
- testes API
- automação
- Cypress
- Playwright

---

# Cenários E2E Futuros

| Cenário | Objetivo |
|---|---|
| Criar reserva | sucesso |
| Editar reserva | sucesso |
| Deletar reserva | sucesso |
| Validar conflito | erro |
| Validar campos | erro |
| Responsividade | mobile |

---

# Melhorias Futuras

- dark mode
- autenticação JWT
- paginação
- filtros
- dashboard
- gráficos
- calendário
- drag and drop
- notificações
- multiusuário

---

# Objetivo Final

Criar uma aplicação:

- moderna
- profissional
- elegante
- responsiva
- preparada para testes
- preparada para portfólio

---
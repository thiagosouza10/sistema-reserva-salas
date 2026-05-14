# Sistema de Reserva de Salas

Projeto Fullstack desenvolvido com:

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* React
* Vite
* TailwindCSS

---

# Funcionalidades

## Backend

* CRUD completo de reservas
* Validações de regras de negócio
* Swagger
* Prisma ORM
* PostgreSQL

## Frontend

* Dashboard moderno
* Criar reservas
* Editar reservas
* Excluir reservas
* Toast feedback
* Interface moderna com Tailwind

---

# Estrutura do Projeto

```txt
reserva-salas/
├── backend/
├── frontend/
├── package.json
└── README.md
```

---

# Pré-requisitos

Antes de iniciar, instale:

## 1. Node.js

Download:

[https://nodejs.org](https://nodejs.org)

---

## 2. PostgreSQL

Download:

[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Durante a instalação:

* Defina usuário
* Defina senha
* Guarde a porta padrão: 5432

---

# Clonar Projeto

```bash
git clone URL_DO_PROJETO
```

Entrar na pasta:

```bash
cd reserva-salas
```

---

# Instalação Automática

O projeto possui script para instalar:

* dependências do backend
* dependências do frontend
* dependências da raiz

Execute:

```bash
npm run install:all
```

---

# Scripts da Raiz

## Instalar tudo

```bash
npm run install:all
```

---

## Subir frontend + backend juntos

```bash
npm run dev
```

---

# Configuração Backend

# Criar Banco de Dados no PostgreSQL

Antes de configurar o projeto, você precisa criar o banco de dados local.

## Opção — via pgAdmin

1. Abra o pgAdmin
2. Conecte no servidor local
3. Clique com botão direito em **Databases**
4. Clique em **Create → Database**
5. Nome: `reserva_salas`
6. Salve

## Observação

* Porta padrão: `5432`
* Esse banco será usado pelo Prisma ORM
* O nome deve ser exatamente igual ao usado no `.env`

Entrar na pasta:

```bash
cd backend
```

---

---

# Configurar .env

Crie arquivo:

```txt
backend/.env
```

Conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/reserva_salas"
```

Substitua:

```txt
SUA_SENHA
```

pela senha do PostgreSQL.

---

# Executar Migrations Prisma

Ainda dentro da pasta backend:

```bash
npx prisma migrate dev
```

---

# Abrir Prisma Studio

```bash
npx prisma studio
```

---

# Configuração Frontend

Entrar na pasta:

```bash
cd frontend
```

---

# Rodar Projeto Completo

Na raiz execute:

```bash
npm run dev
```

---

# URLs do Projeto

## Frontend

```txt
http://localhost:5173
```

---

## Backend

```txt
http://localhost:3333
```

---

## Swagger

```txt
http://localhost:3333/api-docs
```

---

# Scripts do Projeto

## Raiz

| Script              | Descrição                  |
| ------------------- | -------------------------- |
| npm run dev         | Sobe frontend + backend    |
| npm run install:all | Instala todas dependências |

---

## Backend

| Script                 | Descrição              |
| ---------------------- | ---------------------- |
| npm run dev            | Sobe backend           |
| npx prisma migrate dev | Executa migrations     |
| npx prisma studio      | Interface visual banco |

---

## Frontend

| Script      | Descrição     |
| ----------- | ------------- |
| npm run dev | Sobe frontend |

---

---

# Regras de Negócio Implementadas

* Pasta: /requisitos

---

# Tecnologias Utilizadas

## Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Swagger

---

## Frontend

* React
* Vite
* TailwindCSS
* Axios
* React Hot Toast
* Lucide React

---

# Autor

Thiago de Souzas

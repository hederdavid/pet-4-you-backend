# 🐾 Pet-4-You Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</p>

## 📋 Sobre o Projeto

**Pet-4-You** é uma API REST desenvolvida para conectar pessoas que desejam adotar animais de estimação com aqueles que precisam encontrar um novo lar para seus pets. A plataforma foi criada para facilitar o processo de adoção responsável e promover o bem-estar animal.

### 🎯 O que o projeto faz

- **Gerenciamento de Usuários**: Sistema completo de cadastro, autenticação e autorização
- **Cadastro de Pets**: Permite aos usuários cadastrar animais disponíveis para adoção
- **Sistema de Busca**: Facilita a busca por pets com base em critérios específicos
- **Upload de Fotos**: Integração com Firebase para armazenamento de imagens dos pets
- **Autenticação JWT**: Sistema seguro de autenticação com tokens de acesso e renovação
- **Controle de Permissões**: Sistema de roles (USER/ADMIN) para diferentes níveis de acesso

### 💡 Por que foi construído

Este projeto nasceu da paixão por animais e da identificação de uma lacuna na região onde moro. Percebi que não existia um sistema digital eficiente para facilitar a adoção de pets, o que resulta em:

- Animais abandonados nas ruas
- Dificuldade para pessoas que querem adotar encontrarem pets disponíveis
- Falta de controle sobre o processo de adoção
- Ausência de um canal centralizado para divulgação

O **Pet-4-You** foi desenvolvido para mitigar esses problemas, oferecendo uma solução tecnológica que conecta adotantes e doadores de forma eficiente e segura.

## 🚀 Tecnologias Utilizadas

### Backend

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[NestJS](https://nestjs.com/)** - Framework progressivo para Node.js
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript e Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Autenticação & Segurança

- **[JWT](https://jwt.io/)** - Tokens de autenticação
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas

### Cloud & Storage

- **[Firebase](https://firebase.google.com/)** - Armazenamento de imagens
- **[Firebase Admin](https://firebase.google.com/docs/admin/setup)** - Administração do Firebase

### Validação & Configuração

- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** - Gerenciamento de configurações

## 🏗️ Arquitetura do Sistema

```
src/
├── common/              # Recursos compartilhados
│   ├── decorators/      # Decorators customizados
│   ├── guards/          # Guards de autenticação e autorização
│   ├── interfaces/      # Interfaces de requisições
│   └── types/           # Types personalizados
├── modules/             # Módulos da aplicação
│   ├── auth/           # Módulo de autenticação
│   ├── users/          # Módulo de usuários
│   ├── pets/           # Módulo de pets
│   └── firebase/       # Módulo do Firebase
└── plugins/            # Plugins e configurações
    └── database/       # Configuração do banco de dados
```

## 📚 Funcionalidades

### 🔐 Autenticação

- Login com email/senha
- Sistema de refresh tokens com cookies seguros
- Logout com limpeza de tokens
- Proteção de rotas com JWT

### 👥 Gerenciamento de Usuários

- Cadastro de novos usuários
- Atualização de perfil
- Soft delete de usuários
- Sistema de roles (USER/ADMIN)

### 🐕 Gerenciamento de Pets

- Cadastro de pets para adoção
- Upload de fotos via Firebase
- Busca e filtros avançados
- Controle de status (disponível/adotado)
- Histórico de publicações

### 🔒 Segurança

- Hash de senhas com bcrypt
- Tokens JWT seguros
- Cookies HttpOnly para refresh tokens
- Validação rigorosa de dados de entrada

## ⚙️ Como Instalar e Rodar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **npm** ou **yarn**
- Conta no **Firebase** (para upload de imagens)

### 1. Clone o repositório

```bash
git clone https://github.com/hederdavid/pet-4-you-backend.git
cd pet-4-you-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pet4you_db"

# JWT Secrets
ACCESS_TOKEN_SECRET="seu_access_token_secret_aqui"
REFRESH_TOKEN_SECRET="seu_refresh_token_secret_aqui"

# JWT Expiration
ACCESS_TOKEN_EXPIRATION="15m"
REFRESH_TOKEN_EXPIRATION="7d"

# Firebase Configuration
FIREBASE_PROJECT_ID="seu_firebase_project_id"
FIREBASE_PRIVATE_KEY="sua_firebase_private_key"
FIREBASE_CLIENT_EMAIL="seu_firebase_client_email"
```

### 4. Configure o banco de dados

```bash
# Execute as migrações do Prisma
npx prisma migrate dev

# Gere o cliente Prisma
npx prisma generate
```

### 5. (Opcional) Visualize o banco de dados

```bash
npx prisma studio
```

### 6. Inicie a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

## 📖 Documentação da API

### Endpoints Principais

#### 🔐 Autenticação

```
POST /auth/login          # Login do usuário
POST /auth/refresh        # Renovar tokens
POST /auth/logout         # Logout do usuário
```

#### 👥 Usuários

```
GET    /users             # Listar usuários
POST   /users             # Criar usuário
GET    /users/:id         # Buscar usuário por ID
PATCH  /users/:id         # Atualizar usuário
DELETE /users/:id         # Remover usuário
```

#### 🐾 Pets

```
GET    /pets              # Listar pets
POST   /pets              # Cadastrar pet
GET    /pets/:id          # Buscar pet por ID
PATCH  /pets/:id          # Atualizar pet
DELETE /pets/:id          # Remover pet
```

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev         # Inicia em modo de desenvolvimento
npm run start:debug      # Inicia em modo de debug

# Build e Produção
npm run build             # Compila o projeto
npm run start:prod        # Inicia em modo de produção

# Testes
npm run test              # Executa testes unitários
npm run test:e2e          # Executa testes end-to-end
npm run test:cov          # Executa testes com coverage

# Qualidade de Código
npm run lint              # Executa o linter
npm run format            # Formata o código
```

## 🐳 Docker (Em breve)

```bash
# Build da imagem
docker build -t pet-4-you-backend .

# Executar com Docker Compose
docker-compose up -d
```

## 🤝 Contribuição

Contribuições são muito bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commitar suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Fazer push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Heder David**

- GitHub: [@hederdavid](https://github.com/hederdavid)
- LinkedIn: [Heder David](https://linkedin.com/in/hederdavid)

---

<p align="center">
  Feito com ❤️ e 🐾 por <strong>Heder David</strong>
</p>

<p align="center">
  <em>"Toda vida importa. Todo animal merece um lar."</em>
</p>

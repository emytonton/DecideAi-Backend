# 🎯 DecideAI – Backend Architecture

Backend do **DecideAI**, um aplicativo que ajuda pessoas ou grupos de amigos a tomarem decisões de forma colaborativa ou individual, utilizando sorteio, votação em grupo e listas personalizadas.

> **Base URL:** https://decide-ai-backend.vercel.app
> 
Este projeto foi concebido seguindo rigorosamente os princípios de:

- **Domain-Driven Design (DDD)**
- **Clean Architecture**
- **SOLID**
- **Alta coesão e baixo acoplamento**
- **Comunicação em tempo real via WebSockets**
- **Persistência com MongoDB**
- **Armazenamento de Arquivos na Nuvem (AWS S3)**
- **Node.js + TypeScript + Express**

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript (Strict Mode)
- **Runtime:** Node.js
- **Framework Web:** Express
- **Banco de Dados:** MongoDB (Atlas) & Mongoose
- **Tempo Real:** Socket.io
- **Storage (Imagens):** AWS S3 (Amazon Simple Storage Service)
- **Uploads:** Multer
- - **Infraestrutura / Deploy:** Vercel (Serverless Functions)

---

## 🧠 Visão Geral do Domínio

O domínio central do sistema é **Tomada de Decisão**, que se divide em três grandes contextos:

1. **Decisão em Grupo**
2. **Decisão Solo**
3. **Listas Personalizadas com Sorteio**

Além disso, existe o conceito de **Usuários**, que interagem entre si por meio de **nicknames** (amizades) e possuem perfis personalizados.

---

## 👥 Usuários e Amizades

### Usuário
- Identificado por um **nickname único**
- Pode:
  - Fazer upload de **Avatar (Foto de Perfil)**
  - Criar decisões
  - Participar de decisões em grupo
  - Criar listas personalizadas
  - Aceitar ou recusar convites de votação

### Amizade
- Relacionamento baseado em nickname
- Usado exclusivamente para:
  - Selecionar participantes de decisões em grupo
- Não envolve chat ou feed (fora do escopo)

---

## 🗳️ Decisão em Grupo

### Fluxo Conceitual

1. Um usuário cria uma **decisão em grupo**
2. Define:
   - Nome da decisão
   - Lista de opções (quantidade indeterminada)
   - Lista de amigos convidados
3. O sistema:
   - Aguarda todos os convidados **aceitarem**
   - Após aceitação, aguarda todos **votarem**
4. Quando todos votam:
   - O sistema calcula o resultado
   - A opção mais votada vence
   - **Empates são resolvidos por sorteio**
5. O resultado é divulgado em tempo real via **WebSockets**

---

## 🎲 Decisão Solo

Decisões individuais baseadas em **categorias pré-definidas** armazenadas no próprio banco de dados.

### Categorias Suportadas
- 🎬 Filme
- 📚 Livro
- 🍔 Comida
- 🥤 Bebida
- 🏋️ Exercício

### Funcionamento
1. O usuário escolhe uma categoria
2. Define filtros (ex: gênero, tipo, etc.)
3. O sistema:
   - Consulta o **Banco de Dados Local**
   - Aplica os filtros
   - Sorteia uma opção válida
4. Retorna o resultado para o usuário

---

## 📋 Listas Personalizadas

### Conceito
O usuário pode criar listas próprias (ex: "Lugares para viajar", "Filmes para ver hoje") para realizar sorteios rápidos.

### Funcionalidades
- Criar lista
- Adicionar itens à lista
- Atualizar lista
- Excluir lista
- **Sortear** uma opção aleatória da lista

---

## 🔌 WebSockets

Utilizados para garantir a interatividade instantânea nas decisões em grupo:

- Notificação de convites de decisão
- Confirmação de presença em tempo real
- Atualização da contagem de votos
- Divulgação automática do resultado final

---

## 🚀 Objetivos da Arquitetura

Este backend foi projetado para:

- **Escalabilidade:** Pronto para deploy serverless (Vercel/AWS)
- **Manutenibilidade:** Separação clara de responsabilidades via Clean Architecture
- **Segurança:** Tratamento de erros robusto e validação de dados
- **Flexibilidade:** Fácil adaptação para novos tipos de decisão ou fontes de dados
- **Base Sólida:** Servir como API completa para clientes Mobile e Web


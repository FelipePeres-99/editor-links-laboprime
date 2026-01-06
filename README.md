# 🔗 LinkShort Pro

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Produ%C3%A7%C3%A3o-success)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> **Solução robusta de encurtamento de URLs com Analytics em tempo real.**

---

## 📖 Sobre o Projeto

O **LinkShort Pro** nasceu de uma necessidade real na **Laboprime**. Precisávamos de uma ferramenta profissional para gerenciar links curtos sob nosso domínio, mas sem os custos elevados de plataformas SaaS de terceiros. 

A solução foi desenvolver uma ferramenta proprietária do zero, focada em performance, segurança de tipos (Type Safety) e custo zero de manutenção.

### 🚀 Funcionalidades Principais
- **Custom Alias:** Crie links personalizados (ex: `meudominio.com/promo-natal`).
- **Real-time Analytics:** Contador de cliques integrado e data de criação.
- **Validação Robusta:** Verificação de URLs e higienização de inputs tanto no Front quanto no Back.
- **Design Responsivo:** Interface moderna otimizada para Desktop e Mobile.
- **Feedback Visual:** Sistema de notificações (toasts) e estados de carregamento.

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** com **Express**
- **TypeScript** (Interfaces, Enums, Generics)
- **Arquitetura MVC** (Model-View-Controller)
- **UUID** para identificação única

### Frontend
- **HTML5 & CSS3** (Grid, Flexbox e Variáveis CSS)
- **JavaScript ES6+** (Async/Await, Fetch API, Classes)
- **Mobile-first approach**

---

## 🏗️ Estrutura de Pastas

```text
linkshort-pro/
├── src/
│   ├── controllers/   # Lógica de recebimento de requisições
│   ├── services/      # Regras de negócio (Singleton Pattern)
│   ├── models/        # Tipagem e DTOs (Data Transfer Objects)
│   ├── routes/        # Definição dos endpoints
│   └── server.ts      # Setup do servidor Express
├── public/            # Frontend estático
└── vercel.json        # Configuração de deploy CI/CD
```
## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* **Node.js**
* Gerenciador de pacotes (**NPM** ou **Yarn**)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/linkshort-pro.git](https://github.com/seu-usuario/linkshort-pro.git)
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Execute em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
4. **Para build de produção:**
   ```bash
   npm run build
   npm start
   ```
   
## 💡 Desafios Técnicos Resolvidos

* **Singleton no Service:** Implementação do padrão criacional *Singleton* para garantir que a instância de armazenamento em memória seja única e global em toda a aplicação, evitando perda de estado entre diferentes módulos.

* **Type Safety (Segurança de Tipos):** Uso extensivo de interfaces e tipos personalizados do TypeScript para garantir que o contrato de dados entre o **Frontend** e a **API** seja rigoroso, eliminando inconsistências e bugs comuns em tempo de execução.

* **Redirecionamento Dinâmico:** Desenvolvimento de uma lógica de *middleware* customizada para interceptar aliases, processar a métrica de clique (analytics) e executar o redirecionamento com **status HTTP 302** de forma transparente para o usuário.


## 📈 Roadmap (Próximos Passos)

- [ ] **Implementação de Banco de Dados persistente:** Migração do armazenamento em memória para PostgreSQL ou MongoDB, garantindo a retenção dos dados.
- [ ] **Geração automática de QR Code:** Criação de um QR Code exclusivo para cada link encurtado, facilitando o compartilhamento físico.
- [ ] **Sistema de Autenticação:** Implementação de login para que usuários possam gerenciar e editar seus próprios links.
- [ ] **Dashboards de Analytics:** Visualizações detalhadas incluindo métricas de origem do clique, tipos de dispositivos e localização geográfica.



**Felipe Peres**

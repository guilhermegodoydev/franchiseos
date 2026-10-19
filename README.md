# FMS - Franchise Management System

Sistema web para gerenciamento de franquias, com autenticação própria e controle de unidades por franqueadora. Já está em produção na primeira versão (CRUD de unidades + autenticação) e evolui para um sistema completo de gestão.

##  Acesso à demo

Para testar sem precisar criar conta, use as credenciais abaixo:

| Campo | Valor |
|---|---|
| E-mail | dono@franchiseos.com |
| Senha | Senha123! |
| Perfil | Dono da franquia |

> Conta de demonstração com dados fictícios. Os dados podem ser alterados ou resetados a qualquer momento.

🔗 **Demo:** [FranchiseOS](https://franchiseos-plum.vercel.app/login)

## Screenshots

[prints das telas: login, listagem de unidades, formulário de unidade]

## Funcionalidades atuais

- CRUD de unidades
- Autenticação com JWT e rotas protegidas
- Controle de acesso por role (atualmente: dono da franquia)
- Isolamento de dados: cada usuário acessa apenas as unidades da própria sede
- Máscara e validação de CEP

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js, React, shadcn/ui (variante Base UI) |
| Backend | .NET 10, ASP.NET Core, Entity Framework Core (Code First, com migrations) |
| Banco de dados | PostgreSQL |

## Decisões técnicas

### Next.js + .NET em vez de uma stack única
Existiam alternativas mais simples: fazer tudo apenas com Next.js, ou usar React com Vite no frontend. Optei por esta combinação com foco em aprendizado: já conhecia React e quis explorar o Next.js, e já tinha base em C#/ASP.NET Core, então evoluir para o .NET 10 com EF foi o caminho natural. Ambas as tecnologias também são bastante usadas no mercado.

### Mutações executadas no servidor do Next.js
As chamadas à API partem do servidor do Next.js, não do navegador. Isso traz:
- aproveitamento do cache do Next.js sem configuração extra no backend;
- a URL da API fica oculta do cliente.

### Autenticação JWT implementada manualmente
Em vez de usar uma solução pronta (como o Supabase), implementei o fluxo à mão para entender o problema que o JWT resolve: como o token é assinado, qualquer alteração nos dados (`main_office_id`, role) invalida a assinatura. Assim consigo aplicar o mesmo conceito em outros projetos, sem depender de uma ferramenta.

- O login retorna um JWT com as claims `sub`, `email`, `role` e `main_office_id`.
- As consultas exigem token válido e filtram os dados pelo `main_office_id` do próprio token.
- A autorização usa `[Authorize]` nos endpoints.
- A role é atribuída no login (hoje existe apenas a de dono da franquia).

### shadcn/ui em vez de componentes feitos à mão
Escolhi uma biblioteca de UI para ter um design profissional e consistente. O shadcn foi a escolha por ser bastante completo e adotado no mercado, e por injetar o código dos componentes no projeto, o que permite configurá-los livremente. Outro motivo importante foi a acessibilidade: os primitivos por baixo (no projeto, Base UI) já tratam navegação por teclado, leitores de tela e outros casos de borda que seriam trabalhosos de implementar manualmente.

### CORS (ainda não implementado)
Como a comunicação é servidor com servidor, não foi necessário até agora. Será implementado quando o backend passar a receber requisições de outras origens além do próprio site.

### Arquitetura do backend (em evolução)
O backend está organizado por tipo de arquivo (controllers, serviços etc.), o que deixa os arquivos de uma mesma entidade espalhados em várias pastas. Foi uma escolha consciente para ganhar velocidade e focar no processo. O plano é migrar para camadas ou organização por feature.

## Aprendizados

- **JWT:** o maior desafio foi entender para que ele serve e como se diferencia de sessões no backend ou de apenas conferir login e senha.
- **Arquitetura:** definiria uma arquitetura mínima desde o início. Migrar depois exige alterar muitos arquivos, mesmo numa estrutura simples.
- **Escopo:** aprendi a definir o mínimo necessário para o deploy e a pensar em edge cases, regras de negócio e fluxos que precisam ser respeitados.
- **Domínio:** ao estudar o que é um FMS, percebi que o CRUD atual é só a base. O objetivo é evoluir para atender fluxos reais de uma franquia, como royalties e relatórios (veja o roadmap).

## Roadmap

- [ ] Gerenciamento de royalties
- [ ] Dashboard geral
- [ ] Relatórios e exportação de dados
- [ ] Acesso para gerentes/franqueados visualizarem seus próprios dados
- [ ] Novas roles além de dono da franquia
- [ ] Arquitetura em camadas ou por feature no backend
- [ ] CORS, caso o backend seja consumido por outras origens
- [ ] Auditoria (se viável)

# Projeto Prática Interdisciplinar

Sistema em desenvolvimento para auxiliar usuários no controle de informações financeiras, com foco inicial em autenticação, cadastro de usuários e registro de movimentações.

## Equipe

| Integrante     | Papel                          | Frente de trabalho         |
| -------------- | ------------------------------- | --------------------------- |
| Wadney         | Product Owner / Gerente de Projeto | Coordenação e priorização   |
| Wellen         | Desenvolvedora                  | Front-end                   |
| Dany / Taynara | Desenvolvedoras                 | Back-end e Banco de Dados   |

## Metodologia

O desenvolvimento segue **Scrum**, com sprints semanais. Cada sprint é encerrada com uma Sprint Review (apresentação do incremento) e uma Retrospective (pontos de melhoria para a sprint seguinte).

## Primeira Fase

Nesta primeira fase do projeto, atuamos nas seguintes frentes:

| ID   | História de Usuário                                                                                      | Prioridade |    Pontos | Status |
| ---- | -------------------------------------------------------------------------------------------------------- | ---------- | --------: | ------ |
| US01 | Como usuário, quero realizar login no sistema para que minhas informações financeiras fiquem protegidas. | Alta       |         3 | Concluído |
| US02 | Como usuário, quero realizar meu cadastro para que eu possa utilizar o sistema.                          | Alta       |         3 | Concluído |
| US03 | Como usuário, quero cadastrar receitas para que eu possa controlar minhas entradas financeiras.          | Alta       |         5 | Concluído |
| US04 | Como usuário, quero cadastrar despesas para que eu possa controlar meus gastos.                          | Alta       | A definir | Concluído |

> Escopo entregue nas Sprints 1 e 2: arquitetura inicial, banco de dados, autenticação, cadastro de usuários e registro de movimentações (receitas e despesas), com apresentação do incremento aos usuários.

## Segunda Fase

Sprint 3 — foco em funcionalidades de busca e filtro sobre as movimentações já cadastradas:

| ID   | História de Usuário                                                                                          | Prioridade | Responsável                        | Status |
| ---- | -------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------- | ------ |
| US05 | Como usuário, quero buscar movimentações por texto livre para encontrar rapidamente um lançamento específico. | Alta       | Wellen (front) + Dany/Taynara (back) | Concluído |
| US06 | Como usuário, quero filtrar movimentações por categoria para analisar meus gastos e receitas por tipo.        | Alta       | Wellen (front) + Dany/Taynara (back) | Concluído |
| US07 | Como usuário, quero combinar múltiplos filtros ao mesmo tempo para refinar minha análise financeira.          | Média      | Dany/Taynara (back)                 | Concluído |
| US08 | Como usuário, quero ordenar os resultados (data, valor, nome) para visualizar as movimentações como preferir. | Média      | Wellen (front)                      | Concluído |

> Escopo entregue na Sprint 3: busca por texto livre, filtro por categoria, filtros combinados e ordenação dos resultados.

## Objetivo

Construir a base funcional do sistema, garantindo que o usuário consiga acessar a aplicação com segurança, registrar suas principais movimentações financeiras e, na fase atual, localizar e filtrar essas movimentações com agilidade.

## Tecnologias

* Java
* Spring Boot
* Maven
* Spring Security
* Spring Data JPA
* H2 Database
* PostgreSQL

## Como Executar

### Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* Java
* Maven

### Linux / macOS

Na raiz do projeto, execute:

```bash
./mvnw spring-boot:run
```

### Windows

No Windows, execute:

```bash
mvnw.cmd spring-boot:run
```

## Estrutura do Projeto

O projeto é desenvolvido de forma incremental em sprints semanais, seguindo Scrum. Iniciou pelas funcionalidades de autenticação e cadastro de usuários (Sprint 1) e gerenciamento das movimentações financeiras (Sprint 2), e segue agora para busca e filtro das movimentações (Sprint 3).

## Status do Projeto

🚧 Em desenvolvimento — Sprints 1, 2 e 3 concluídas. Sprint 4 em planejamento. 

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
| US04 | Como usuário, quero cadastrar despesas para que eu possa controlar meus gastos.                          | Alta       |         5 | Concluído |

> Escopo entregue nas Sprints 1 e 2: arquitetura inicial, banco de dados, autenticação, cadastro de usuários e registro de movimentações (receitas e despesas), com apresentação do incremento aos usuários.

## Segunda Fase

Sprint 3 — foco em funcionalidades de busca e filtro sobre as movimentações já cadastradas:

| ID   | História de Usuário                                                                                          | Prioridade | Responsável                        | Status |
| ---- | -------------------------------------------------------------------------------------------------------------- | ----------| ----------------------------------- | ------ |
| US05 | Como usuário, quero buscar movimentações por texto livre para encontrar rapidamente um lançamento específico. | Alta       | Wellen (front) + Dany/Taynara (back) | Concluído |
| US06 | Como usuário, quero filtrar movimentações por categoria para analisar meus gastos e receitas por tipo.        | Alta       | Wellen (front) + Dany/Taynara (back) | Concluído |
| US07 | Como usuário, quero combinar múltiplos filtros ao mesmo tempo para refinar minha análise financeira.          | Média      | Dany/Taynara (back)                 | Concluído |
| US08 | Como usuário, quero ordenar os resultados (data, valor, nome) para visualizar as movimentações como preferir. | Média      | Wellen (front)                      | Concluído |

> Escopo entregue na Sprint 3: busca por texto livre, filtro por categoria, filtros combinados e ordenação dos resultados.

## Terceira Fase

Sprint 4 — foco em funcionalidades de análise financeira, visualização de dados e geração de relatórios:

| ID   | História de Usuário                                                                                                                                             | Prioridade | Pontos    | Status    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- | --------- |
| US09 | Como usuário, quero consultar minhas movimentações por período para que eu possa analisar minhas finanças diariamente, semanalmente, mensalmente ou anualmente. | Média      | 5         | Concluído |
| US10 | Como usuário, quero visualizar gráficos financeiros para que eu possa compreender melhor meus gastos.                                                           | Média      | 5         | Concluído |
| US11 | Como usuário, quero gerar relatórios financeiros para que eu possa analisar minha situação financeira.                                                          | Média      | 5          | Concluído |

> Escopo entregue na Sprint 4: consulta das movimentações por diferentes períodos, visualização gráfica das informações financeiras e geração de relatórios para análise da situação financeira.

## Quarta Fase

Sprint 5 — foco em melhorias de experiência de uso, com personalização visual e modernização da interface:

| ID   | História de Usuário                                                                                                                                  | Prioridade | Pontos | Status       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -----: | ------------ |
| US12 | Como usuário, quero ativar o modo escuro para que eu possa utilizar o sistema com mais conforto visual, principalmente em ambientes com pouca luz.    | Média      |      3 | Concluída |
| US13 | Como usuário, quero uma interface com botões e visual do site mais modernos e agradáveis para que eu tenha uma experiência de uso mais clara e atrativa. | Baixa      |      3 | Concluída |

# US14 – Metas financeiras

## Resumo

| Campo | Valor |
|---|---|
| ID | US14 |
| Prioridade | Média |
| Pontos | 3 | 
| Ator | Usuário |

## User story

> Como usuário, quero cadastrar, consultar, editar e excluir metas financeiras para que eu possa planejar e acompanhar meus objetivos.

## Casos de uso

| ID | Caso de uso |
|---|---|
| UC14.1 | Cadastrar meta |
| UC14.2 | Consultar metas |
| UC14.3 | Editar meta |
| UC14.4 | Excluir meta |

**Ator principal:** Usuário

**Pré-condição geral:** o usuário está autenticado no sistema.

### UC14.1 – Cadastrar meta

**Fluxo principal**

1. O usuário acessa a página de Metas.
2. O usuário escolhe "Nova meta" e preenche os dados.
3. O sistema valida as informações e salva a meta.
4. O sistema exibe a meta na lista.

**Fluxo alternativo**

- **A1 – Dados inválidos:** se algum campo obrigatório estiver vazio ou inválido, o sistema exibe a mensagem de erro e mantém o formulário aberto.

**Pós-condição:** a meta fica cadastrada e visível na lista.

### UC14.2 – Consultar metas

**Fluxo principal**

1. O usuário acessa a página de Metas.
2. O sistema busca as metas do usuário.
3. O sistema exibe a lista de metas.

**Fluxo alternativo**

- **A1 – Sem metas:** se o usuário não tiver metas, o sistema informa que nenhuma meta foi cadastrada e oferece o cadastro de uma nova.

**Pós-condição:** as metas do usuário estão visíveis.

### UC14.3 – Editar meta

**Fluxo principal**

1. O usuário seleciona uma meta e escolhe "Editar".
2. O sistema exibe os dados atuais em um formulário.
3. O usuário altera os campos e confirma.
4. O sistema valida e salva a alteração.

**Fluxo alternativo**

- **A1 – Dados inválidos:** o sistema exibe a mensagem de erro e mantém o formulário aberto.

**Pós-condição:** a meta fica atualizada.

### UC14.4 – Excluir meta

**Fluxo principal**

1. O usuário seleciona uma meta e escolhe "Excluir".
2. O sistema pede confirmação.
3. O usuário confirma.
4. O sistema remove a meta da lista.

**Fluxo alternativo**

- **A1 – Cancelamento:** se o usuário cancelar a confirmação, nada é alterado.

**Pós-condição:** a meta deixa de existir.

## Critérios de aceitação

- [ ] O usuário consegue cadastrar uma meta informando os dados obrigatórios.
- [ ] O usuário visualiza a lista de suas metas na página de Metas.
- [ ] O usuário consegue editar os dados de uma meta existente.
- [ ] O usuário consegue excluir uma meta, mediante confirmação.
- [ ] O sistema exibe mensagens claras quando os dados são inválidos.
- [ ] Cada usuário vê e altera somente as suas próprias metas.

## Diagrama de caso de uso

```
                 ┌──────────────── Sistema financeiro ────────────────┐
                 │                                                    │
                 │             ( Cadastrar meta )                     │
                 │             ( Consultar metas )                    │
  Usuário ───────┤             ( Editar meta )                        │
                 │             ( Excluir meta )                       │
                 │                                                    │
                 └────────────────────────────────────────────────────┘
```

## Escopo técnico entregue

- Criação da entidade Metas
- CRUD da entidade Metas
- Rota da página de Metas


> Escopo da Sprint 5: modo escuro com preferência de tema salva e padronização visual de botões e do site.

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

🚧 Em andamento. 


## Diagrama de relacionamento

<img width="846" height="626" alt="image" src="https://github.com/user-attachments/assets/16fdcffb-e5f9-4187-81fc-ae4990606005" />


## Diagrama de Caso de Uso

N1
<img width="1303" height="2239" alt="image" src="https://github.com/user-attachments/assets/7c82b5d1-67f2-400f-8eb4-371dab73aa95" />

N2
<img width="1252" height="506" alt="image" src="https://github.com/user-attachments/assets/397b57de-8f0f-46b4-9422-3ef6e7302926" />

<img width="1252" height="506" alt="image" src="https://github.com/user-attachments/assets/07558861-a796-4f51-95f0-73082d0d3b64" />


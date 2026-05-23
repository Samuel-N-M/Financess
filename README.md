# Financess - Plataforma Inteligente de Gestão de Finanças Pessoais

O **Financess** é uma solução de software baseada na web projetada para atuar como um assistente pessoal inteligente de finanças. O sistema vai além do simples registro histórico de entradas e saídas; sua proposta de valor concentra-se em capacitar o usuário a transformar hábitos de consumo e planejar de forma preditiva o alcance de metas financeiras de longo prazo.

---

## 1. Escopo do MVP (Funcionalidades Implementadas)
Para mitigar riscos de cronograma e garantir testes rigorosos de integridade das regras de negócio, o escopo inicial foi concentrado nas seguintes jornadas core do usuário:

* **Autenticação Convencional Segura:** Fluxo estável de controle de acesso contendo cadastro, login e gerenciamento de sessões locais por e-mail e senha.
* **Controle e Fluxo de Transações (CRUD):** Lançamento, edição, exclusão, categorização e listagem em tempo real de receitas (entradas) e despesas (saídas).
* **Módulo de Metas Financeiras:** Criação de objetivos de poupança (inspirado no conceito de "caixinhas"), contendo valor-alvo, valor poupado, aportes manuais e barras de progresso visuais interativas.
* **Painel de Controle (Dashboard Principal):** Centralização de indicadores financeiros macro, exibindo de forma clara o Saldo Atual, Receitas do Mês, Despesas do Mês e tabelas de últimas movimentações.
* **Relatórios Filtrados:** Módulo de visualização de dados textuais e analíticos com filtros por período e por categoria, estruturado com chaves de estado dinâmicas.

---

## 2. Arquitetura Tecnológica e Stack de Desenvolvimento
A aplicação utiliza uma divisão clara de responsabilidades através de uma arquitetura cliente-servidor nativa da web:

| Camada | Tecnologia / Framework | Responsabilidade Técnico-Operacional |
| :--- | :--- | :--- |
| **Frontend** | React (JS/ES6+) | Construção de componentes de interface SPA (Single Page Application), reutilização de blocos e controle declarativo de estados locais. |
| **Empacotador** | Vite | Orquestração do build do cliente, oferecendo Hot Module Replacement (HMR) instantâneo para um ciclo rápido de desenvolvimento. |
| **Estilização** | Custom CSS3 (Vanilla) | Estilização manual centralizada via variáveis globais nativas (`:root`), garantindo identidade visual limpa sem dependências de frameworks externos. |
| **Backend** | Flask (Python) | Construção ágil e minimalista dos endpoints da API RESTful, execução das validações de negócio e gerenciamento de sessões. |
| **Banco de Dados** | MySQL | Modelagem relacional e persistência de dados financeiros, garantindo integridade e consistência transacional estrita. |
| **Infraestrutura** | Docker / Docker Compose | Isolamento em containers de todos os ambientes para mitigar inconsistências operacionais de infraestrutura entre as máquinas locais. |

---

## 3. Justificativa e Análise da Stack Tecnológica
A escolha das ferramentas para o ecossistema do **Financess** obedeceu a critérios de agilidade no desenvolvimento, curva de aprendizado acelerada e confiabilidade para sistemas transacionais. Abaixo constam as justificativas técnicas, vantagens e desvantagens de cada elemento:

### 3.1. React
* **Por que foi utilizado?** Para construir uma interface fluida do tipo SPA. A arquitetura baseada em componentes do React permite isolar elementos complexos (como o formulário de transações e as barras de metas) e atualizar a tela em tempo real sem recarregar a página.
* **Vantagens:** Extrema flexibilidade, ecossistema gigante de bibliotecas prontas, reutilização contínua de componentes e excelente manipulação de estados.
* **Desvantagens:** Por ser uma biblioteca de visualização e não um framework completo (como o Angular), exige que o desenvolvedor configure e escolha bibliotecas externas para tarefas adicionais de roteamento e estados globais.

### 3.2. Vite
* **Por que foi utilizado?** Substitui ferramentas antigas (como o *Create React App / Webpack*), reduzindo o tempo de espera de compilação do frontend de minutos para milissegundos.
* **Vantagens:** Inicialização de servidor local quase instantânea, atualizações de tela em tempo real extremamente rápidas (Hot Module Replacement) e geração de builds de produção enxutos e otimizados.
* **Desvantagens:** Configurações altamente avançadas de plugins de terceiros podem exigir caminhos ligeiramente diferentes de customização se comparados ao ecossistema tradicional do Webpack.

### 3.3. Custom CSS3 (Vanilla CSS)
* **Por que foi utilizado?** Em vez de inflar o projeto com frameworks pesados de estilização (como Tailwind ou Bootstrap), a equipe optou por criar uma folha de estilos limpa e centralizada (`index.css`), utilizando **Variáveis CSS** dinâmicas que alternam automaticamente as cores do sistema com base na preferência do sistema operacional do usuário.
* **Vantagens:** Desempenho máximo (carregamento instantâneo), controle total sobre cada pixel da aplicação, independência completa de bibliotecas de terceiros que possam quebrar no futuro e código CSS legível e semântico.
* **Desvantagens:** Exige escrever mais linhas de código manualmente para criar layouts responsivos através de `@media queries` e sistemas de posicionamento (Flexbox/Grid).

### 3.4. Flask (Python)
* **Por que foi utilizado?** Finanças pessoais exigem segurança na manipulação de regras de negócio de backend. O Flask foi escolhido por ser um microframework minimalista em Python que permite erguer uma API REST funcional com pouquíssimas linhas de código, mantendo o controle total sobre a arquitetura.
* **Vantagens:** Simplicidade extrema, sem burocracias ou configurações pesadas (ao contrário do Django), além de contar com o suporte nativo a toda a robustez da linguagem Python.
* **Desvantagens:** Por fornecer apenas o "essencial", estruturas mais robustas como ORMs, validações avançadas de formulários e segurança avançada precisam ser acopladas manualmente através de pacotes de terceiros.

### 3.5. MySQL
* **Por que foi utilizado?** Dados financeiros são sensíveis e demandam o cumprimento estrito das propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade). Um banco relacional garante que transações e aportes de metas fiquem perfeitamente vinculados aos usuários originais.
* **Vantagens:** Extremamente confiável, amplamente documentado no mercado, forte integridade referencial com chaves estrangeiras e excelente desempenho em consultas estruturadas.
* **Desvantagens:** Escalabilidade horizontal mais complexa e menor flexibilidade em alterações rápidas e drásticas de esquemas (schemas) quando comparado a bancos NoSQL (como o MongoDB).

### 3.6. Docker / Docker Compose
* **Por que foi utilizado?** O projeto envolve três tecnologias distintas (Node, Python e MySQL). O Docker garante que qualquer membro da equipe consiga rodar a aplicação instantaneamente com as mesmas versões de software, eliminando o clássico problema do *"na minha máquina funciona"*.
* **Vantagens:** Padronização absoluta do ambiente, isolamento de processos e inicialização simplificada de múltiplos serviços por meio de um único comando.
* **Desvantagens:** Curva de aprendizado inicial para configuração de redes e volumes, além de demandar um consumo considerável de memória RAM e processamento das máquinas locais de desenvolvimento durante o build.

---

## 4. Estrutura do Projeto
O repositório está organizado de forma modular para separar claramente as responsabilidades do ecossistema, utilizando a estrutura nativa de projetos React empacotados com o Vite:

```text
financess/
├── backend/               # Servidor API Flask (Python)
│   ├── app/               # Código-fonte da aplicação (Rotas, Modelos e Controladores)
│   ├── Dockerfile         # Configuração de build do container do backend
│   └── requirements.txt   # Dependências e bibliotecas Python (Flask, etc.)
├── frontend/              # Interface do Usuário (React + Vite)
│   ├── src/               # Componentes, Páginas e Estados do React
│   │   ├── assets/        # Recursos estáticos locais (imagens, logos)
│   │   ├── index.css      # Estilos globais e variáveis nativas de cor do projeto
│   │   └── main.jsx       # Ponto de entrada da aplicação React
│   ├── public/            # Ativos públicos servidos diretamente
│   ├── index.html         # Arquivo HTML principal (onde o Vite injeta o bundle)
│   ├── vite.config.js     # Arquivo de configuração de build e servidor do Vite
│   ├── Dockerfile         # Configuração de build do container do frontend
│   └── package.json       # Dependências do ecossistema Node (React, Vite)
├── docker-compose.yml     # Orquestrador dos serviços (Backend, Frontend e MySQL)
└── README.md              # Documentação oficial do projeto

```

---

## 5. Como Executar o Projeto

A maneira mais rápida e consistente de rodar o ambiente completo de desenvolvimento é utilizando o **Docker** e o **Docker Compose**, o que dispensa a necessidade de instalar Python, Node.js ou MySQL diretamente na sua máquina física.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (que já inclui o Docker Compose).
* [Git](https://git-scm.com/) (para clonar o repositório).

### Passo a Passo para Inicialização

**1. Clone o repositório para a sua máquina local:**

```bash
git clone [https://github.com/Samuel-N-M/Financess.git](https://github.com/Samuel-N-M/Financess.git)
cd Financess

```

**2. Suba o ecossistema completo usando o Docker Compose:**
O comando abaixo fará o download das imagens necessárias, construirá os containers do Frontend (configurando o servidor de desenvolvimento do Vite) e do Backend, além de subir o banco de dados MySQL.

```bash
docker-compose up --build

```

**3. Acesse a aplicação:**
Assim que os logs do terminal indicarem que o Vite e o Flask inicializaram com sucesso, você poderá acessar:

* **Frontend (Interface do Usuário - Vite Server):** `http://localhost:3000`
* **Backend (API Flask / Endpoints):** `http://localhost:5001`

### Comandos Úteis de Gerenciamento

* **Para derrubar os serviços:** Clique `Ctrl + C` no terminal onde o compose está rodando, ou execute `docker-compose down` em outra aba.
* **Para resetar o banco de dados local:** Se precisar limpar os volumes do banco para um teste limpo, use `docker-compose down -v`.

---

## 6. Guia de Estilo Visual (UI/UX)

A interface possui suporte nativo a Temas (Light/Dark mode) baseado nas configurações de cor do sistema operacional do usuário.

### 6.1. Paleta de Cores de Alta Fidelidade (Variáveis CSS)

As cores centrais do projeto mudam dinamicamente conforme as definições abaixo:

* **Tom de Destaque (`--accent: #14b8a6`):** Um tom moderno de Verde Teal/Esmeralda aplicado em botões primários, elementos interativos e links.
* **Fundo Claro (`--bg: #fff`):** Base limpa e de alto contraste para navegação diurna.
* **Fundo Escuro (`--bg: #16171d`):** Um tom de cinza escuro/antracite profundo projetado para conforto visual noturno.
* **Linhas de Separação (`--border`):** Divisores sutis mapeados em `#e5e4e7` (Light) e `#2e303a` (Dark) para delimitar tabelas e seções sem gerar poluição visual.

### 6.2. Tipografia e Estrutura Sêmica

* **Fontes do Sistema (`system-ui`, `Segoe UI`):** Uso de fontes nativas modernas para garantir renderização ultra-rápida, legibilidade confortável de dados financeiros e adaptação nativa para Windows, Linux e macOS.
* **Layout Estrutural (`#root`):** A aplicação centraliza seu conteúdo em uma estrutura responsiva delimitada com largura máxima travada em `1126px`, gerando uma leitura de painel e dashboard limpa e organizada.

---

## 7. Modelagem Matemática e Estatística do Banco de Dados

A persistência do sistema Financess foi normalizada em nível relacional de tabelas. O cálculo matemático do balanço financeiro e do progresso de metas obedece às equações estruturadas abaixo:

### 7.1. Equação do Saldo Líquido da Conta ($S_A$)

O saldo atual de qualquer conta cadastrada no sistema não fica estático em uma coluna, evitando concorrência destrutiva. Ele é computado dinamicamente através do somatório histórico das transações consolidadas:

$$S_A = S_I + \sum V_{\text{receitas}} - \sum V_{\text{despesas}}$$

Onde:

* $S_I$: Saldo Inicial configurado no momento de abertura da conta.
* $V_{\text{receitas}}$: Valor monetário de transações onde o tipo é classificado como entrada/receita.
* $V_{\text{despesas}}$: Valor monetário de transações onde o tipo é classificado como saída/despesa.

### 7.2. Função de Progresso de Metas Financeiras ($P_M$)

A evolução percentual visualizada pelo usuário em suas metas de poupança é gerada pela razão da receita acumulada sobre o teto estipulado:

$$P_M = \left( \frac{V_I + \sum A_M}{V_{\text{alvo}}} \right) \times 100$$

Onde:

* $V_I$: Valor inicial opcional que o usuário já possuía ao criar a meta.
* $A_M$: Valor financeiro de cada aporte incremental associado àquela meta específica.
* $V_{\text{alvo}}$: Valor total necessário para a conclusão da meta.

---

## 8. Métricas de Software e Controle de Qualidade

Como parte do processo de homologação conduzido pela equipe na disciplina de Métricas de Software, os seguintes indicadores reais foram mapeados ao final do ciclo:

* **Tamanho Funcional Homologado:** O projeto atingiu o volume de **80 Pontos de Função Estimados (PFe)**, concentrados no núcleo transacional e interfaces interativas.
* **Densidade de Defeitos de Produto:** Apresentou uma curva de evolução acentuada. A taxa caiu drasticamente de **0,60 falhas/PF** na Fase de Infraestrutura para apenas **0,025 falhas/PF** na entrega final, fruto de uma rodada maciça de testes de rotas na reta final.
* **Lead Time de Processo (Eficiência):** O tempo médio de ciclo para a conclusão de uma tarefa de desenvolvimento foi otimizado de **96 horas** para céleres **4 horas**. Essa melhoria foi alcançada por meio da fragmentação de histórias complexas em tarefas menores no quadro Kanban.
* **Taxa de Rejeição de Pull Requests (PRs):** Aprovou-se a política de testes locais de formulários e bancos de dados antes de submissões ao GitHub. Isso resultou em uma taxa de reação de **0%** na última semana (10 PRs submetidos e mesclados com sucesso sem quebrar o container de produção).


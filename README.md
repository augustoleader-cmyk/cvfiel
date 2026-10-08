# CVFiel 🛡

> **Ajuste seu currículo à vaga. Sem ajustar a verdade.**

CVFiel é um MVP acadêmico de análise de currículo ATS que compara uma descrição de vaga com o currículo do candidato, identifica requisitos, mede alinhamento e gera uma versão ATS-friendly sem inventar experiências, ferramentas, números, certificações ou níveis de proficiência.

O diferencial central é a **Trava de Evidência**: uma competência só pode aparecer como fato no currículo otimizado quando existe suporte no currículo original ou quando o próprio usuário fornece explicitamente a informação.

---

## Problema

Currículos relevantes podem perder aderência quando usam linguagem muito diferente da descrição da vaga ou quando possuem estrutura ruim para parsing. Ao mesmo tempo, uma ferramenta de otimização pode criar um problema ainda pior se “corrigir” lacunas inventando experiência.

O CVFiel foi desenhado para equilibrar:

**alinhamento + integridade.**

---

## Tese do produto

> É possível melhorar a clareza e a aderência de um currículo a uma vaga sem alterar a biografia do candidato.

Quando existir conflito entre aumentar o Índice de Alinhamento e preservar a verdade, o produto sempre escolhe preservar a verdade.

---

## Fluxo

1. O usuário cola a descrição da vaga.
2. Cola o currículo.
3. O CVFiel identifica requisitos relevantes.
4. Cada requisito é classificado como:
   - **Comprovado** — evidência direta;
   - **Pode reforçar** — evidência equivalente;
   - **Não comprovado** — nenhuma evidência encontrada.
5. O sistema calcula o **Índice de Alinhamento**.
6. Mostra forças, gaps e recomendações.
7. Gera uma versão ATS-friendly com reescritas conservadoras.
8. O usuário revisa e edita.
9. Pode copiar o texto ou salvar como PDF pelo navegador.

---

## Trava de Evidência

A aplicação não pode adicionar automaticamente:

- ferramenta não citada;
- emprego ou cargo inexistente;
- empresa;
- certificação;
- formação;
- idioma ou nível diferente;
- projeto;
- percentual;
- resultado quantitativo;
- senioridade;
- experiência sem suporte textual.

Exemplo:

**Vaga:** SQL obrigatório  
**Currículo:** não contém SQL

Resultado:

**SQL → Não comprovado**

SQL não é inserido no currículo final.

---

## Índice de Alinhamento

A pontuação exibida é uma **heurística própria** e não uma “nota real de ATS”.

Pesos conceituais usados no MVP:

| Dimensão | Peso |
| --- | ---: |
| Competências técnicas | 35% |
| Experiência e responsabilidades | 25% |
| Cargo / contexto profissional | 15% |
| Competências comportamentais | 10% |
| Formação e certificações | 10% |
| Estrutura ATS | 5% |

Quando uma categoria não é aplicável, os pesos ativos são normalizados.

Para evitar **keyword stuffing**, a análise considera a presença contextual de um requisito; repetir a mesma palavra várias vezes não multiplica sua pontuação.

---

## Importância dos requisitos

A descrição da vaga é analisada em busca de sinais como:

**Essencial**

- obrigatório;
- necessário;
- requisitos;
- experiência comprovada;
- must have.

**Complementar**

- diferencial;
- desejável;
- plus;
- nice to have.

Sem marcador específico, o requisito é tratado como **Relevante**.

---

## Privacidade

O MVP é totalmente client-side.

- não existe login;
- não existe banco de dados;
- currículo e vaga não são salvos em servidor;
- nenhuma API externa recebe o texto;
- não há analytics com conteúdo do currículo;
- não há chave ou token no projeto.

Os textos existem apenas na página durante a sessão.

---

## Tecnologias

Para tornar o MVP simples de auditar e fácil de publicar:

- HTML5;
- CSS3;
- JavaScript puro;
- processamento local;
- CSS de impressão A4;
- Google Fonts apenas para interface.

A direção visual segue o sistema especificado no mega prompt com padrões inspirados em **shadcn/ui**: cards, badges, alerts, progress, tabs conceituais, tooltips e design tokens. Para a versão estática acadêmica, os componentes foram implementados diretamente em CSS/HTML, sem dependência de framework.

---

## Funcionalidades

### Entrada
- descrição da vaga;
- currículo em texto;
- contadores de caracteres;
- validação de entrada;
- botão de exemplo demonstrativo.

### Análise
- Índice de Alinhamento;
- requisitos por categoria;
- grau de importância;
- palavras encontradas;
- evidências equivalentes;
- requisitos não comprovados;
- principal gap;
- prioridades de melhoria.

### Integridade
- Trava de Evidência;
- comparador antes × depois;
- evidências utilizadas em cada reescrita;
- confirmação manual para experiência ausente;
- proteção contra inclusão automática de skills inexistentes.

### Saída
- currículo em uma coluna;
- editor final;
- desfazer;
- restaurar original;
- copiar texto;
- exportar/salvar como PDF via impressão;
- diagnóstico ATS.

---

## Caso demo

A vaga demonstrativa pede:

- Excel;
- Power BI;
- SQL;
- análise de indicadores;
- comunicação com áreas de negócio;
- automação;
- Azure.

O currículo demonstra:

- Excel;
- Power BI;
- dashboards;
- KPIs;
- operação;
- comunicação.

**SQL não existe no currículo.**

Resultado obrigatório:

> SQL deve aparecer como **Não comprovado** e nunca como competência do candidato.

---

## QA de integridade

Execute:

    node qa-tests.js

Resultado atual:

    PASS — Caso 1: Python ausente não é inventado
    PASS — Caso 2: Power BI comprovado permanece no texto
    PASS — Caso 3: percentual inexistente não é criado
    PASS — Caso 4: nível de inglês não é elevado
    PASS — Teste crítico: SQL pedido pela vaga não entra no currículo demo

    Resultado: 5/5 PASS

Se o teste crítico de SQL falhar, o produto deve ser considerado reprovado.

---

## Como executar

Não há build.

### Opção 1

Abra:

    index.html

### Opção 2 — servidor local

    python -m http.server 8766

Depois abra:

    http://localhost:8766

Para carregar automaticamente o cenário demonstrativo:

    http://localhost:8766/?demo=1&analyze=1

---

## Estrutura

    CVFiel-Curso-DIO/
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── qa-tests.js
    ├── PROMPT.md
    ├── README.md
    ├── docs/
    │   └── pesquisa-e-decisoes.md
    └── evidencias/
        ├── 01-home-desktop.png
        ├── 02-analise-demo.png
        └── 03-home-mobile.png

---

## Mudanças entre o mega prompt e a versão final

O mega prompt previa uma implementação com design system shadcn/ui. Como este projeto foi construído diretamente pelo GPT, sem Lovable, a versão acadêmica foi convertida para um **site estático sem dependências**, preservando o design system visual e os comportamentos essenciais.

Decisões:

- sem backend;
- sem login;
- sem banco;
- sem IA generativa externa;
- sem upload de PDF no MVP;
- análise por heurística auditável;
- confirmação manual para dados ausentes;
- PDF via CSS de impressão;
- nenhuma dependência necessária para rodar.

Essas mudanças reduzem risco, facilitam auditoria e mantêm intacta a tese do desafio.

---

## Limitações

Este MVP não:

- reproduz o algoritmo interno de um ATS específico;
- prevê contratação;
- calcula probabilidade de entrevista;
- entende todas as competências possíveis;
- substitui revisão humana;
- lê PDFs escaneados;
- garante aprovação por sistemas de recrutamento.

O léxico do analisador é propositalmente controlado para que a Trava de Evidência permaneça previsível e auditável.

---

## Pesquisa que orientou o produto

Foram considerados materiais sobre:

- funcionamento e limitações de scanners de match;
- uso responsável de palavras-chave;
- formatação ATS-friendly;
- formatos aceitos por plataformas de recrutamento;
- documentação do shadcn/ui.

Veja [docs/pesquisa-e-decisoes.md](docs/pesquisa-e-decisoes.md).

---

## Evidências

As capturas em `evidencias/` documentam:

1. Home desktop;
2. análise com cenário demo;
3. Home mobile;
4. resultado mobile.

---

## Aplicação publicada

**https://augustoleader-cmyk.github.io/cvfiel/**

---

## Próximos passos

Depois da validação do MVP:

- importação de PDF/DOCX;
- parser estrutural de currículo;
- dicionário de competências maior;
- embeddings locais/semânticos com controle de evidência;
- histórico opcional;
- DOCX exportável;
- testes automatizados de interface;
- internacionalização.

---

## Princípio final

> **O CVFiel melhora a apresentação. Nunca melhora a biografia.**

Se melhorar a pontuação exigir inventar um fato, o fato não entra.

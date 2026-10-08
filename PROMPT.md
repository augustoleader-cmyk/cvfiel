# Mega Prompt — CVFiel

## Analisador e otimizador de currículo ATS com Trava de Evidência

Atue como uma equipe sênior composta por Product Manager, UX/UI Designer, Desenvolvedor Front-end, Desenvolvedor Full Stack, especialista em NLP/análise de texto, especialista em recrutamento, QA Engineer e especialista em acessibilidade e segurança.

Sua missão é planejar e construir um MVP web chamado **CVFiel**, funcional, responsivo, visualmente profissional e pronto para publicação.

---

## 1. Visão do produto

O CVFiel ajuda uma pessoa a adaptar seu currículo para uma vaga específica sem inventar qualificações ou experiências.

Fluxo:

1. usuário cola a descrição da vaga;
2. cola o próprio currículo;
3. aplicação compara os textos;
4. identifica requisitos e palavras-chave;
5. mostra o que já existe;
6. mostra o que falta;
7. diferencia ausência de redação de ausência real de experiência;
8. sugere melhorias;
9. gera versão ATS-friendly;
10. permite revisar e exportar.

Princípio:

> **O CVFiel melhora a apresentação. Nunca melhora a biografia.**

---

## 2. Problema

Currículos genéricos escondem experiências relevantes, deixam de utilizar a linguagem da vaga e podem possuir estrutura ruim para parsing. Ferramentas automáticas também podem cometer um erro pior: inventar competências inexistentes.

O produto combina **alinhamento + integridade**.

---

## 3. Proposta de valor

# Ajuste seu currículo à vaga.
## Sem ajustar a verdade.

Compare currículo e oportunidade, entenda lacunas e gere uma versão mais clara e ATS-friendly baseada somente na experiência real.

---

## 4. Trava de Evidência

Antes de incorporar um requisito ao currículo ajustado, verificar se existe suporte no currículo original.

### Evidência direta

Vaga: Power BI  
Currículo: Criação de dashboards em Power BI  
Resultado: **Comprovado**

### Evidência equivalente

Vaga: gestão de indicadores  
Currículo: acompanhamento de KPIs e dashboards  
Resultado: **Pode reforçar**

A redação pode ficar mais próxima da vaga sem alterar o fato.

### Sem evidência

Vaga: Kubernetes  
Currículo: nenhuma referência  
Resultado: **Não comprovado**

Não inserir automaticamente.

---

## 5. Regra absoluta de integridade

Jamais:

- criar empregos;
- criar cargos;
- mudar empresa;
- aumentar senioridade;
- criar formação;
- criar certificação;
- inventar ferramenta;
- inventar idioma;
- inventar projeto;
- criar resultado quantitativo;
- adicionar percentual inexistente;
- afirmar experiência não comprovada.

Exemplo proibido:

Original: “Criei relatórios para a operação.”

Não transformar em: “Reduzi custos em 35% por meio de relatórios.”

Pode transformar em: “Desenvolvi relatórios operacionais para apoiar o acompanhamento e a tomada de decisão.”

---

## 6. Índice de Alinhamento

Nunca chamar de score real do ATS, aprovação ATS, chance de contratação ou probabilidade de entrevista.

Nome:

# Índice de Alinhamento

Escala 0–100.

Tooltip:

> Estimativa criada pelo CVFiel a partir da aderência textual entre currículo e vaga. Sistemas ATS reais utilizam critérios diferentes e este índice não reproduz a pontuação interna de uma plataforma específica.

---

## 7. Composição

- Competências técnicas: 35%
- Experiência e responsabilidades: 25%
- Cargo/contexto profissional: 15%
- Competências comportamentais: 10%
- Formação e certificações: 10%
- Estrutura ATS: 5%

Redistribuir pesos quando um bloco não for aplicável.

---

## 8. Keyword stuffing

Repetir palavra-chave não deve multiplicar pontuação.

Ruim: SQL, SQL, SQL.

Bom: “Desenvolvi consultas SQL para consolidação e análise de dados.”

---

## 9. Home

Logo: **CVFiel**

Links:
- Como funciona
- Por que ATS?
- Integridade
- Analisar currículo

CTA: **ANALISAR MEU CURRÍCULO**

---

## 10. Hero

Badge: **ATS-friendly · baseado nos seus fatos**

Headline:

# Seu currículo pode falar melhor.
## Sem precisar mentir.

CTA principal: **COMEÇAR ANÁLISE**

CTA secundário: **VER COMO FUNCIONA**

Microcopy: **Sem cadastro no MVP.**

---

## 11. Pilares

### Compare
Entenda como o currículo conversa com os requisitos.

### Ajuste
Reforce habilidades que realmente possui.

### Preserve
Nada entra sem evidência.

---

## 12. Área de análise

Duas áreas no desktop:

### 1. Descrição da vaga
Textarea, contador de caracteres e botão Colar texto.

### 2. Seu currículo
Textarea, contador e prioridade para texto colado.

Upload de PDF somente se não complicar o MVP. Sem OCR.

---

## 13. Validação

Não analisar campos vazios ou curtos demais.

Mensagens amigáveis e sem apagar conteúdo.

---

## 14. Loading

Mostrar etapas:

- Lendo a vaga;
- Identificando requisitos;
- Comparando evidências;
- Avaliando estrutura;
- Preparando recomendações.

Sem porcentagem falsa.

---

## 15. Resultado

Mostrar Índice de Alinhamento.

- 0–39: Alinhamento baixo
- 40–59: Alinhamento parcial
- 60–79: Bom alinhamento
- 80–100: Alinhamento forte

Nunca prometer contratação.

---

## 16. Explicação

Mostrar “O que já ajuda” e “Principal gap”.

---

## 17. Requisitos da vaga

Agrupar quando aplicável:

- Competências técnicas;
- Ferramentas;
- Experiência;
- Soft skills;
- Formação;
- Certificações;
- Idiomas.

---

## 18. Matriz de palavras-chave

### Encontradas
Verde.

### Pode reforçar
Âmbar.

### Não comprovadas
Vermelho/cinza discreto.

Mensagem obrigatória:

> Não adicionaremos estes itens automaticamente. Inclua apenas aquilo que realmente fizer parte da sua experiência.

---

## 19. Importância

Classificar requisito em:

- Essencial;
- Relevante;
- Complementar.

Sinais essenciais: obrigatório, necessário, must have, requisitos, experiência comprovada.

Sinais complementares: diferencial, desejável, plus, nice to have.

---

## 20. Onde melhorar

Recomendações por prioridade:

- Alta prioridade;
- Média prioridade;
- Opcional.

Explicar problema, por que importa e como corrigir.

---

## 21. Antes × depois

Criar comparação com:

- Original;
- Sugestão CVFiel;
- Evidências utilizadas.

As sugestões precisam ser rastreáveis ao texto original.

---

## 22. Alteração sensível

Se um requisito não estiver comprovado:

> A vaga solicita X, mas não encontramos essa informação no currículo.

Permitir:
- Sim, possuo;
- Não;
- Ignorar.

Se confirmar, o próprio usuário deve escrever a experiência real. Não inventar texto por ele.

---

## 23. Currículo final

Estrutura linear:

- Nome;
- Contato;
- Resumo Profissional;
- Experiência Profissional;
- Formação;
- Competências;
- Certificações.

Não criar seção com conteúdo fictício.

---

## 24. Formatação ATS

- uma coluna;
- ordem linear;
- títulos convencionais;
- sem tabela;
- sem caixa de texto;
- sem gráfico;
- sem barra de habilidades;
- sem foto;
- sem conteúdo crítico em header/footer;
- bullets simples;
- texto selecionável.

---

## 25. Preview

Página A4, fundo branco, margens adequadas, tipografia profissional e legível.

---

## 26. Editor final

Usuário consegue editar.

Ações:

- Desfazer;
- Restaurar original;
- Copiar;
- Exportar.

---

## 27. Exportação

MVP obrigatório: **EXPORTAR PDF**.

Se PDF nativo não for conveniente, usar `window.print()` com `@media print`, A4 e texto selecionável.

---

## 28. Copiar texto

Adicionar **COPIAR TEXTO** com feedback “Currículo copiado ✓”.

---

## 29. Diagnóstico ATS

Checklist:

- estrutura de uma coluna;
- títulos reconhecíveis;
- contato no corpo;
- sem tabelas;
- sem gráficos;
- palavras-chave relevantes;
- sem keyword stuffing.

---

## 30. Responsabilidade

Exibir:

> **CVFiel não inventa experiência.**

> Revise todas as sugestões antes de enviar uma candidatura. O índice é uma estimativa e não representa a avaliação interna de um ATS ou empregador.

---

## 31. Design system

Usar conceitos e componentes do **shadcn/ui**:

- Button;
- Card;
- Badge;
- Tabs;
- Tooltip;
- Alert;
- Progress;
- Textarea;
- Dialog;
- Separator;
- Scroll Area;
- Skeleton.

---

## 32. Direção visual

Confiável, técnico, moderno, calmo, profissional e transparente.

Evitar neon, visual de cassino, gamificação excessiva e gradientes exagerados.

---

## 33. Paleta

- Background: #F7F8FA
- Surface: #FFFFFF
- Ink: #17202A
- Muted: #697586
- Primary: #2563EB
- Primary Soft: #EAF1FF
- Evidence Green: #178B61
- Evidence Soft: #E9F7F1
- Attention Amber: #C68016
- Missing: #C84949
- Border: #E1E6ED

---

## 34. Identidade

Logo textual **CVFiel**.

Símbolo possível: check + documento ou documento + escudo.

Não usar robô.

---

## 35. Mobile

Campos empilhados. Resultado em cards. Antes/depois adaptado. CTA de exportação acessível.

---

## 36. Acessibilidade

- contraste;
- foco visível;
- teclado;
- labels;
- estados além de cor;
- aria-label;
- áreas de toque adequadas;
- prefers-reduced-motion.

---

## 37. Privacidade

Currículos contêm dados pessoais.

No MVP:
- não salvar em banco;
- processar localmente;
- explicar armazenamento, caso exista;
- botão Limpar dados;
- não enviar currículo a analytics ou serviços externos.

---

## 38. Como funciona

1. Cole a vaga.
2. Cole o currículo.
3. Veja o alinhamento.
4. Revise e exporte.

---

## 39. Por que CVFiel?

Headline:

# Otimizar não é inventar.

Pilares:
- Evidência antes da sugestão;
- Score explicado;
- Currículo ATS-friendly;
- Usuário controla o texto final.

---

## 40. Exemplo demo

Vaga: Analista de Dados Jr.

Pede:
- Excel;
- Power BI;
- SQL;
- análise de indicadores;
- comunicação com áreas de negócio.

Currículo demo possui:
- Excel;
- Power BI;
- dashboards;
- KPIs;
- contato com operação.

Não possui SQL.

SQL deve aparecer como **Não comprovado** e jamais ser inserido automaticamente.

---

## 41. Testes críticos

### Caso 1
Vaga pede Python; CV não contém Python → Python não entra.

### Caso 2
Vaga pede Power BI; CV possui dashboards em Power BI → pode reforçar.

### Caso 3
CV diz “aumentei produtividade”, sem número → não criar “30%”.

### Caso 4
CV diz “inglês intermediário”; vaga pede fluente → não alterar nível.

---

## 42. Heurística

Considerar:

- normalização;
- plural/singular;
- pequenas variações;
- siglas;
- termos equivalentes;
- contexto.

Similaridade conceitual não autoriza inventar experiência.

---

## 43. Escopo do MVP

Não implementar inicialmente:

- login;
- dashboard;
- banco;
- histórico;
- pagamentos;
- assinatura;
- CRM;
- perfil;
- LinkedIn;
- scraping;
- extensão de navegador.

---

## 44. Erros

Mensagens amigáveis. Nunca apagar entrada após erro.

---

## 45. Loading

Skeleton e etapas conceituais. Sem progresso percentual inventado.

---

## 46. Performance

Evitar dependências grandes, animações pesadas, imagens enormes e vídeo automático.

---

## 47. SEO

Title:

**CVFiel — Currículo ATS alinhado à vaga sem inventar experiência**

Description:

**Compare seu currículo com uma vaga, identifique palavras-chave e gere uma versão ATS-friendly baseada somente na sua experiência real.**

Open Graph básico.

---

## 48. README

Documentar:

- Projeto;
- Problema;
- Solução;
- Trava de Evidência;
- Análise;
- Heurística;
- Tecnologias;
- Como executar;
- Mega prompt;
- Alterações;
- Segurança;
- Limitações;
- Prints;
- Link publicado;
- Próximos passos.

---

## 49. Evidências

Capturar:

1. Home;
2. formulário;
3. resultado;
4. encontradas;
5. não comprovadas;
6. antes/depois;
7. currículo final;
8. exportação.

---

## 50. Critérios de aceitação

O projeto só está pronto se:

- vaga e currículo podem ser inseridos;
- análise funciona;
- índice aparece;
- encontradas e ausentes aparecem;
- termos não comprovados ficam separados;
- nenhuma habilidade ausente é inventada;
- versão ajustada é gerada;
- é possível editar;
- copiar;
- exportar PDF;
- layout é responsivo;
- demo funciona;
- não há secret;
- aplicação abre publicamente.

---

## 51. Teste final obrigatório

Vaga contém SQL.

Currículo demo não contém SQL.

A versão final não pode incluir SQL como competência.

Se incluir, o produto está reprovado.

---

## 52. Regra final

Quando houver conflito entre:

**melhor score**

e

**manter a verdade**

sempre escolher:

# MANTER A VERDADE.

O sucesso do CVFiel é fazer cada candidato apresentar da melhor forma possível aquilo que realmente sabe e fez.

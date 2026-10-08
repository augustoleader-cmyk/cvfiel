# Pesquisa e decisões de produto

## 1. O “score” não é uma nota universal de ATS

Scanners comerciais apresentam percentuais próprios de match, mas diferentes ATS utilizam critérios, parsers e fluxos distintos. Por isso o CVFiel chama sua métrica de **Índice de Alinhamento** e evita prometer “chance de aprovação”.

Referência:
- Jobscan — Resume Scanner: https://www.jobscan.co/resume-scanner

## 2. Palavras-chave devem refletir experiência real

Boas práticas de currículo recomendam identificar termos importantes da descrição da vaga e utilizá-los quando correspondem ao histórico verdadeiro do candidato.

Referência:
- Indeed — Resume keywords and phrases: https://www.indeed.com/career-advice/resumes-cover-letters/resume-keywords-and-phrases

Decisão de produto:
- correspondência direta → comprovado;
- correspondência conceitual controlada → pode reforçar;
- ausência de evidência → não comprovado.

## 3. Estrutura ATS-friendly

A saída adota formato conservador:

- uma coluna;
- seções convencionais;
- texto selecionável;
- sem gráficos;
- sem barras de habilidades;
- sem tabelas;
- sem foto;
- sem informação crítica em header/footer.

Referência:
- Indeed — ATS resume: https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume

## 4. PDF baseado em texto

Plataformas de recrutamento amplamente utilizadas aceitam formatos como PDF e DOCX. O MVP gera saída imprimível em PDF pelo navegador, preservando texto selecionável.

Referência:
- Greenhouse — Supported formats: https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads

## 5. Design system

O mega prompt especifica shadcn/ui pela qualidade e consistência dos seus componentes e tokens. Na implementação estática acadêmica, os padrões visuais foram reproduzidos diretamente, sem instalar framework.

Referência:
- shadcn/ui documentation: https://ui.shadcn.com/docs

## 6. Decisão sobre IA generativa

O núcleo do MVP não usa LLM externa.

Motivos:

1. currículo contém dados pessoais;
2. o desafio central é evitar alucinação;
3. uma heurística controlada é mais fácil de auditar;
4. não há custo de API;
5. o projeto funciona em GitHub Pages.

Uma evolução futura pode usar NLP semântico, desde que toda sugestão continue vinculada a trechos de evidência do currículo original.

## 7. Princípio de integridade

Nenhuma otimização automática pode criar:

- experiências;
- ferramentas;
- números;
- empresas;
- certificações;
- níveis de idioma;
- formação;
- senioridade.

A única exceção é quando o próprio usuário confirma manualmente uma informação e escreve, com suas palavras, o fato que deseja incluir.

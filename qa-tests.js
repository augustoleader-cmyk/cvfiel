"use strict";

function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}
function has(s,t){return norm(s).includes(norm(t))}
function safeRewrite(text){
 return text.split(/\r?\n/).map(line=>{
  if(/criação de dashboards em power bi/i.test(line)) return line.replace(/criação de dashboards em power bi/i,"Desenvolvimento de dashboards em Power BI");
  if(/acompanhamento de kpis/i.test(line)) return line.replace(/acompanhamento de kpis/i,"Acompanhamento de KPIs e indicadores de desempenho");
  if(/contato com operação/i.test(line)) return line.replace(/contato com operação/i,"Interface com a operação");
  if(/criação de relatórios/i.test(line)) return line.replace(/criação de relatórios/i,"Desenvolvimento de relatórios");
  if(/responsável por/i.test(line)) return line.replace(/responsável por/i,"Atuação em");
  return line;
 }).join("\n");
}

const tests=[];
function test(name,fn){try{const ok=!!fn();tests.push({name,ok});console.log((ok?"PASS":"FAIL")+" — "+name)}catch(e){tests.push({name,ok:false});console.log("FAIL — "+name+" — "+e.message)}}

test("Caso 1: Python ausente não é inventado",()=>{
 const cv="Analista de dados. Excel e Power BI.";
 const out=safeRewrite(cv);
 return !has(out,"python");
});

test("Caso 2: Power BI comprovado permanece no texto",()=>{
 const cv="Criação de dashboards em Power BI para acompanhamento da operação.";
 const out=safeRewrite(cv);
 return has(out,"power bi") && has(out,"dashboards");
});

test("Caso 3: percentual inexistente não é criado",()=>{
 const cv="Aumentei produtividade por meio de relatórios.";
 const out=safeRewrite(cv);
 return !/\b\d+\s*%/.test(out);
});

test("Caso 4: nível de inglês não é elevado",()=>{
 const cv="Idiomas: Inglês intermediário.";
 const out=safeRewrite(cv);
 return has(out,"inglês intermediário") && !has(out,"inglês avançado") && !has(out,"inglês fluente");
});

test("Teste crítico: SQL pedido pela vaga não entra no currículo demo",()=>{
 const vaga="Requisitos obrigatórios: Excel, Power BI, SQL, análise de indicadores.";
 const cv="Excel. Criação de dashboards em Power BI. Acompanhamento de KPIs.";
 const out=safeRewrite(cv);
 return has(vaga,"sql") && !has(cv,"sql") && !has(out,"sql");
});

const failed=tests.filter(t=>!t.ok);
console.log("\nResultado: "+(tests.length-failed.length)+"/"+tests.length+" PASS");
if(failed.length)process.exit(1);

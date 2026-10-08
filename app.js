"use strict";

const jobEl=document.getElementById("jobText");
const resumeEl=document.getElementById("resumeText");
const resultsEl=document.getElementById("results");
const loadingBox=document.getElementById("loadingBox");
const resumeEditor=document.getElementById("resumeEditor");
const toastEl=document.getElementById("toast");

const demoJob=`Analista de Dados Jr.

Responsabilidades:
- Criar e acompanhar dashboards e indicadores para áreas de negócio.
- Apoiar análises operacionais e comunicar insights às áreas parceiras.

Requisitos obrigatórios:
- Excel
- Power BI
- SQL
- Análise de indicadores
- Comunicação com áreas de negócio

Diferenciais:
- Automação de rotinas
- Conhecimento em Azure`;

const demoResume=`Lucas Almeida
São Paulo/SP | lucas.almeida@email.com | (11) 99999-0000 | linkedin.com/in/lucasalmeida

RESUMO PROFISSIONAL
Analista com experiência em acompanhamento operacional, criação de relatórios e dashboards.

EXPERIÊNCIA PROFISSIONAL
Analista Operacional — Empresa Exemplo
2024 – Atual
- Criação de dashboards em Power BI para acompanhamento da operação.
- Acompanhamento de KPIs e elaboração de relatórios gerenciais.
- Excel utilizado para consolidação e análise de informações.
- Contato com operação para alinhamento de demandas e apresentação de resultados.

FORMAÇÃO
Tecnologia em Análise e Desenvolvimento de Sistemas — Faculdade Exemplo

COMPETÊNCIAS
Excel, Power BI, dashboards, KPIs, análise operacional, comunicação.`;

const lexicon=[
 {label:"Excel",job:["excel","microsoft excel"],direct:["excel","microsoft excel"],equiv:["planilhas"],category:"technical"},
 {label:"Power BI",job:["power bi","powerbi"],direct:["power bi","powerbi"],equiv:["dashboards no power bi"],category:"technical"},
 {label:"SQL",job:["sql"],direct:["sql"],equiv:[],category:"technical"},
 {label:"Python",job:["python"],direct:["python"],equiv:[],category:"technical"},
 {label:"Azure",job:["azure","microsoft azure"],direct:["azure","microsoft azure"],equiv:[],category:"technical"},
 {label:"Kubernetes",job:["kubernetes"],direct:["kubernetes"],equiv:["k8s"],category:"technical"},
 {label:"Análise de indicadores",job:["análise de indicadores","analise de indicadores","gestão de indicadores","gestao de indicadores"],direct:["análise de indicadores","analise de indicadores","gestão de indicadores","gestao de indicadores"],equiv:["kpi","kpis","indicadores de desempenho","dashboards"],category:"experience"},
 {label:"Análise de dados",job:["análise de dados","analise de dados"],direct:["análise de dados","analise de dados"],equiv:["análise de informações","analise de informacoes","relatórios gerenciais","relatorios gerenciais","dashboards"],category:"experience"},
 {label:"Automação",job:["automação","automacao","automatização","automatizacao"],direct:["automação","automacao","automatização","automatizacao"],equiv:["vba","macro","macros","power automate","scripts"],category:"experience"},
 {label:"Comunicação com áreas de negócio",job:["comunicação com áreas de negócio","comunicacao com areas de negocio","áreas de negócio","areas de negocio"],direct:["comunicação com áreas de negócio","comunicacao com areas de negocio"],equiv:["contato com operação","contato com operacao","interface com áreas","interface com areas","apresentação de resultados","apresentacao de resultados","stakeholders"],category:"soft"},
 {label:"Comunicação",job:["comunicação","comunicacao"],direct:["comunicação","comunicacao"],equiv:["apresentação","apresentacao","alinhamento"],category:"soft"},
 {label:"Graduação",job:["graduação","graduacao","ensino superior","superior completo"],direct:["graduação","graduacao","tecnologia em","bacharelado","licenciatura","ensino superior"],equiv:["faculdade"],category:"education"},
 {label:"Inglês avançado",job:["inglês avançado","ingles avancado","inglês fluente","ingles fluente"],direct:["inglês avançado","ingles avancado","inglês fluente","ingles fluente"],equiv:[],category:"education"}
];

const categoryMeta={
 technical:{label:"Competências técnicas",weight:35},
 experience:{label:"Experiência e responsabilidades",weight:25},
 context:{label:"Cargo / contexto profissional",weight:15},
 soft:{label:"Competências comportamentais",weight:10},
 education:{label:"Formação e certificações",weight:10},
 structure:{label:"Estrutura ATS",weight:5}
};

let lastAnalysis=null;
let originalGenerated="";
let undoStack=[];
let internalEdit=false;
const userConfirmedSkills=new Set();

function normalize(s){
 return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim();
}
function esc(s){
 return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function contains(text,term){return normalize(text).includes(normalize(term))}
function firstMatch(text,terms){return terms.find(t=>contains(text,t))||null}
function importanceFor(jobText,term){
 const lines=jobText.split(/\n/);
 const nterm=normalize(term);
 const line=lines.find(l=>normalize(l).includes(nterm))||"";
 const n=normalize(line);
 if(/obrigator|necessar|must have|requisit|comprovad/.test(n)) return "Essencial";
 if(/diferencial|desejavel|plus|nice to have/.test(n)) return "Complementar";
 return "Relevante";
}
function analyzeEvidence(job,resume){
 const requirements=[];
 lexicon.forEach(item=>{
   const matched=firstMatch(job,item.job);
   if(!matched)return;
   const direct=firstMatch(resume,item.direct);
   const equiv=direct?null:firstMatch(resume,item.equiv);
   requirements.push({...item,matchedJob:matched,matchType:direct?"direct":equiv?"equivalent":"missing",evidence:direct||equiv||null,importance:importanceFor(job,matched)});
 });
 return requirements;
}
function scoreAnalysis(reqs,resume){
 const activeCats=[...new Set(reqs.map(r=>r.category))];
 let totalWeight=categoryMeta.structure.weight;
 let earned=categoryMeta.structure.weight;
 activeCats.forEach(cat=>{
   const rs=reqs.filter(r=>r.category===cat);
   const w=categoryMeta[cat]?.weight||10;
   totalWeight+=w;
   const coverage=rs.reduce((sum,r)=>sum+(r.matchType==="direct"?1:r.matchType==="equivalent"?.65:0),0)/Math.max(rs.length,1);
   earned+=w*coverage;
 });
 const contextWeight=categoryMeta.context.weight;
 const jobTitle=(jobEl.value.split(/\n/).find(l=>/analista|assistente|coordenador|desenvolvedor|engenheiro|cientista|gerente/i.test(l))||"");
 const contextTokens=normalize(jobTitle).split(/\s+/).filter(t=>t.length>4);
 const contextMatch=contextTokens.some(t=>normalize(resume).includes(t));
 if(contextTokens.length){totalWeight+=contextWeight;earned+=contextWeight*(contextMatch?1:.35)}
 return Math.max(0,Math.min(100,Math.round(earned/totalWeight*100)));
}
function scoreLabel(score){
 if(score<40)return"Alinhamento baixo";
 if(score<60)return"Alinhamento parcial";
 if(score<80)return"Bom alinhamento";
 return"Alinhamento forte";
}
function safeRewriteLine(line,resumeNorm){
 let out=line;
 let evidence=[];
 if(/criação de dashboards em power bi/i.test(line)){
   const hasIndicators=/kpi|indicador/i.test(resumeNorm);
   out=line.replace(/criação de dashboards em power bi/i,"Desenvolvimento de dashboards em Power BI");
   if(hasIndicators) out=out.replace(/para acompanhamento da operação/i,"para acompanhamento de indicadores e da operação");
   evidence=["criação de dashboards em Power BI",hasIndicators?"KPIs/indicadores":"acompanhamento da operação"].filter(Boolean);
 } else if(/acompanhamento de kpis/i.test(line)){
   out=line.replace(/acompanhamento de kpis/i,"Acompanhamento de KPIs e indicadores de desempenho");
   evidence=["acompanhamento de KPIs"];
 } else if(/contato com operação/i.test(line)){
   out=line.replace(/contato com operação/i,"Interface com a operação");
   evidence=["contato com operação"];
 } else if(/criação de relatórios/i.test(line)){
   out=line.replace(/criação de relatórios/i,"Desenvolvimento de relatórios");
   evidence=["criação de relatórios"];
 } else if(/responsável por/i.test(line)){
   out=line.replace(/responsável por/i,"Atuação em");
   evidence=["responsável por"];
 }
 return {changed:out!==line,text:out,evidence};
}
function generateSafeResume(resume){
 const resumeNorm=normalize(resume);
 const lines=resume.split(/\r?\n/);
 const comparisons=[];
 const finalLines=lines.map(line=>{
   const r=safeRewriteLine(line,resumeNorm);
   if(r.changed) comparisons.push({original:line,adjusted:r.text,evidence:r.evidence});
   return r.text;
 });
 return {text:finalLines.join("\n"),comparisons};
}
function formatResume(text){
 const lines=text.split(/\r?\n/);
 let firstNonEmpty=true;
 return lines.map(raw=>{
   const line=raw.trim();
   if(!line)return"<p>&nbsp;</p>";
   if(firstNonEmpty){firstNonEmpty=false;return"<h1>"+esc(line)+"</h1>"}
   if(/^(RESUMO PROFISSIONAL|EXPERIÊNCIA PROFISSIONAL|EXPERIENCIA PROFISSIONAL|FORMAÇÃO|FORMACAO|COMPETÊNCIAS|COMPETENCIAS|CERTIFICAÇÕES|CERTIFICACOES|IDIOMAS|PROJETOS)$/i.test(line)) return"<h2>"+esc(line)+"</h2>";
   if(/^[-•]/.test(line)) return"<p>• "+esc(line.replace(/^[-•]\s*/,""))+"</p>";
   return"<p>"+esc(line)+"</p>";
 }).join("");
}
function renderBadges(id,items,type){
 document.getElementById(id).innerHTML=items.length?items.map(r=>'<span class="kw '+type+'">'+esc(r.label)+'</span>').join(""):'<span class="help-text">Nenhum item.</span>';
}
function renderRequirements(reqs){
 const cats=[...new Set(reqs.map(r=>r.category))];
 document.getElementById("requirementsGroups").innerHTML=cats.map(cat=>{
   const rows=reqs.filter(r=>r.category===cat).map(r=>'<div class="req-row"><span>'+esc(r.label)+'</span><span class="importance">'+r.importance+'</span></div>').join("");
   return'<div class="req-group"><h4>'+esc(categoryMeta[cat]?.label||cat)+'</h4>'+rows+'</div>';
 }).join("")||'<p class="help-text">Não identificamos requisitos suficientes. Tente colar uma descrição de vaga mais completa.</p>';
}
function renderRecommendations(reqs){
 const direct=reqs.filter(r=>r.matchType==="direct");
 const equivalent=reqs.filter(r=>r.matchType==="equivalent");
 const missing=reqs.filter(r=>r.matchType==="missing");
 const recs=[];
 if(missing.length)recs.push({p:"ALTA PRIORIDADE",t:"Não transforme lacunas em fatos",d:"A vaga pede "+missing.slice(0,3).map(r=>r.label).join(", ")+". Como não há evidência no currículo, mantenha esses itens fora da versão final até você confirmar experiência real."});
 if(equivalent.length)recs.push({p:"MÉDIA PRIORIDADE",t:"Aproxime a linguagem da vaga",d:"Há evidência equivalente para "+equivalent.slice(0,3).map(r=>r.label).join(", ")+". Reforce esses conceitos usando apenas a experiência já descrita."});
 if(direct.length)recs.push({p:"OPCIONAL",t:"Dê mais visibilidade ao que já existe",d:"Competências como "+direct.slice(0,3).map(r=>r.label).join(", ")+" já estão comprovadas. Garanta que apareçam em contexto, sem repetição artificial."});
 if(!recs.length)recs.push({p:"ALTA PRIORIDADE",t:"Adicione mais contexto à vaga",d:"Não encontramos requisitos suficientes para uma análise útil."});
 document.getElementById("recommendations").innerHTML=recs.map(r=>'<div class="rec"><span>'+r.p+'</span><h4>'+esc(r.t)+'</h4><p>'+esc(r.d)+'</p></div>').join("");
}
function renderComparisons(comparisons){
 document.getElementById("comparisons").innerHTML=comparisons.length?comparisons.slice(0,4).map(c=>
  '<div class="comparison"><div class="compare-pane"><h4>Original</h4><p>'+esc(c.original)+'</p></div><div class="compare-pane"><h4>Sugestão CVFiel</h4><p>'+esc(c.adjusted)+'</p></div><div class="evidence-used"><b>Evidências utilizadas:</b> '+esc(c.evidence.join(" · "))+'</div></div>'
 ).join(""):'<p class="help-text">O texto já está claro o suficiente para este MVP. Nenhuma reescrita automática foi necessária.</p>';
}
function renderSensitive(missing){
 const card=document.getElementById("sensitiveCard");
 if(!missing.length){card.classList.add("hidden");return}
 card.classList.remove("hidden");
 document.getElementById("sensitiveCopy").textContent="A vaga solicita "+missing.map(r=>r.label).join(", ")+", mas não encontramos essas informações no currículo.";
 document.getElementById("sensitiveItems").innerHTML=missing.map(r=>
  '<div class="sensitive-item"><span><b>'+esc(r.label)+'</b> · não comprovado</span><button type="button" data-confirm="'+esc(r.label)+'">Eu realmente possuo</button></div>'
 ).join("");
 document.querySelectorAll("[data-confirm]").forEach(btn=>btn.addEventListener("click",()=>{
   const skill=btn.getAttribute("data-confirm");
   const note=window.prompt("Descreva com suas palavras onde e como você usou "+skill+". O CVFiel adicionará somente o texto que você escrever.");
   if(note&&note.trim().length>8){
     saveUndo();
     userConfirmedSkills.add(normalize(skill));
     resumeEditor.innerHTML += '<h2>INFORMAÇÕES CONFIRMADAS PELO USUÁRIO</h2><p>• '+esc(note.trim())+'</p>';
     toast("Informação adicionada exatamente como você escreveu.");
     btn.textContent="Confirmado por você";
     btn.disabled=true;
   }
 }));
}
function validate(){
 let ok=true;
 const job=jobEl.value.trim(),resume=resumeEl.value.trim();
 const je=document.getElementById("jobError"),re=document.getElementById("resumeError");
 je.classList.add("hidden");re.classList.add("hidden");
 if(job.length<80){je.textContent="A descrição parece incompleta. Cole mais informações da vaga para obter uma análise melhor.";je.classList.remove("hidden");ok=false}
 if(resume.length<120){re.textContent="Seu currículo parece incompleto. Adicione experiências, habilidades e formação para melhorar a análise.";re.classList.remove("hidden");ok=false}
 return ok;
}
function performAnalysis(){
 userConfirmedSkills.clear();
 const job=jobEl.value.trim(),resume=resumeEl.value.trim();
 const reqs=analyzeEvidence(job,resume);
 const score=scoreAnalysis(reqs,resume);
 const safe=generateSafeResume(resume);
 const direct=reqs.filter(r=>r.matchType==="direct");
 const equivalent=reqs.filter(r=>r.matchType==="equivalent");
 const missing=reqs.filter(r=>r.matchType==="missing");
 lastAnalysis={job,resume,reqs,score,safe,direct,equivalent,missing};

 document.getElementById("scoreValue").textContent=score;
 document.getElementById("scoreRing").style.setProperty("--score",score);
 document.getElementById("scoreLabel").textContent=scoreLabel(score);
 document.getElementById("metricDirect").textContent=direct.length;
 document.getElementById("metricEquivalent").textContent=equivalent.length;
 document.getElementById("metricMissing").textContent=missing.length;
 document.getElementById("strengthList").innerHTML=(direct.concat(equivalent).slice(0,4).map(r=>'<li>'+esc(r.label)+(r.matchType==="equivalent"?" possui evidência equivalente":" encontrado")+'</li>').join("")||"<li>Adicione mais detalhes ao currículo para identificar forças.</li>");
 document.getElementById("mainGap").textContent=missing.length?"A vaga enfatiza "+missing[0].label+", mas essa competência não aparece no currículo.":"Nenhum gap crítico foi identificado entre os requisitos detectados.";
 renderRequirements(reqs);
 renderBadges("directBadges",direct,"good");
 renderBadges("equivalentBadges",equivalent,"warn");
 renderBadges("missingBadges",missing,"bad");
 renderRecommendations(reqs);
 renderComparisons(safe.comparisons);
 renderSensitive(missing);

 originalGenerated=safe.text;
 undoStack=[];
 internalEdit=true;
 resumeEditor.innerHTML=formatResume(safe.text);
 internalEdit=false;
 resultsEl.classList.remove("hidden");
 setTimeout(()=>resultsEl.scrollIntoView({behavior:"smooth",block:"start"}),50);
 runRuntimeIntegrityGuard();
}
function startAnalysis(){
 if(!validate())return;
 const steps=["Lendo a vaga…","Identificando requisitos…","Comparando evidências…","Avaliando estrutura…","Preparando recomendações…"];
 loadingBox.classList.remove("hidden");
 document.getElementById("analyzeBtn").disabled=true;
 let i=0;
 document.getElementById("loadingStep").textContent=steps[0];
 const timer=setInterval(()=>{i++;if(i<steps.length)document.getElementById("loadingStep").textContent=steps[i]},140);
 setTimeout(()=>{clearInterval(timer);loadingBox.classList.add("hidden");document.getElementById("analyzeBtn").disabled=false;performAnalysis()},760);
}
function runRuntimeIntegrityGuard(){
 if(!lastAnalysis)return;
 const missingLabels=lastAnalysis.missing.map(r=>normalize(r.label));
 const finalNorm=normalize(resumeEditor.innerText);
 const originalNorm=normalize(lastAnalysis.resume);
 const violations=missingLabels.filter(label=>finalNorm.includes(label)&&!originalNorm.includes(label)&&!userConfirmedSkills.has(label));
 if(violations.length){
   resumeEditor.innerHTML=formatResume(lastAnalysis.resume);
   toast("Trava de Evidência acionada: uma competência não comprovada foi removida.");
   console.error("CVFiel integrity violation blocked:",violations);
 }
}
function saveUndo(){if(!internalEdit)undoStack.push(resumeEditor.innerHTML);if(undoStack.length>30)undoStack.shift()}
function toast(msg){toastEl.textContent=msg;toastEl.classList.remove("hidden");setTimeout(()=>toastEl.classList.add("hidden"),2600)}
function updateCount(el,id){document.getElementById(id).textContent=el.value.length+" caracteres"}
async function pasteInto(el){
 try{const t=await navigator.clipboard.readText();if(t){el.value=t;el.dispatchEvent(new Event("input"));toast("Texto colado ✓")}}
 catch(e){toast("O navegador bloqueou a área de transferência. Cole manualmente com Ctrl+V.")}
}

jobEl.addEventListener("input",()=>updateCount(jobEl,"jobCount"));
resumeEl.addEventListener("input",()=>updateCount(resumeEl,"resumeCount"));
document.getElementById("pasteJobBtn").addEventListener("click",()=>pasteInto(jobEl));
document.getElementById("pasteResumeBtn").addEventListener("click",()=>pasteInto(resumeEl));
document.getElementById("demoBtn").addEventListener("click",()=>{jobEl.value=demoJob;resumeEl.value=demoResume;jobEl.dispatchEvent(new Event("input"));resumeEl.dispatchEvent(new Event("input"));toast("Exemplo carregado. SQL está propositalmente ausente do currículo.")});
document.getElementById("clearBtn").addEventListener("click",()=>{jobEl.value="";resumeEl.value="";jobEl.dispatchEvent(new Event("input"));resumeEl.dispatchEvent(new Event("input"));resultsEl.classList.add("hidden");lastAnalysis=null;originalGenerated="";toast("Dados limpos.")});
document.getElementById("analyzeBtn").addEventListener("click",startAnalysis);
document.getElementById("undoBtn").addEventListener("click",()=>{if(undoStack.length){internalEdit=true;resumeEditor.innerHTML=undoStack.pop();internalEdit=false;toast("Alteração desfeita.")}});
document.getElementById("restoreBtn").addEventListener("click",()=>{if(!lastAnalysis)return;saveUndo();internalEdit=true;resumeEditor.innerHTML=formatResume(lastAnalysis.resume);internalEdit=false;toast("Currículo original restaurado.")});
document.getElementById("copyBtn").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(resumeEditor.innerText);toast("Currículo copiado ✓")}catch(e){toast("Não foi possível copiar automaticamente.")}});
document.getElementById("printBtn").addEventListener("click",()=>{runRuntimeIntegrityGuard();window.print()});
resumeEditor.addEventListener("beforeinput",saveUndo);
resumeEditor.addEventListener("input",()=>{if(!internalEdit&&lastAnalysis)runRuntimeIntegrityGuard()});

updateCount(jobEl,"jobCount");updateCount(resumeEl,"resumeCount");

window.CVFielQA={
 normalize,analyzeEvidence,generateSafeResume,
 demoJob,demoResume,
 criticalTest(){
   const reqs=analyzeEvidence(demoJob,demoResume);
   const safe=generateSafeResume(demoResume).text;
   return {
     sqlMissing:reqs.some(r=>r.label==="SQL"&&r.matchType==="missing"),
     sqlNotInvented:!normalize(safe).includes("sql"),
     powerBiProven:reqs.some(r=>r.label==="Power BI"&&r.matchType==="direct"),
     noFabricated30Percent:!safe.includes("30%")
   };
 }
};
console.info("CVFiel QA:",window.CVFielQA.criticalTest());
const params=new URLSearchParams(location.search);
if(params.get("demo")==="1"){
  jobEl.value=demoJob;resumeEl.value=demoResume;jobEl.dispatchEvent(new Event("input"));resumeEl.dispatchEvent(new Event("input"));
  if(params.get("analyze")==="1"){
    setTimeout(startAnalysis,120);
    if(params.get("capture")==="results") setTimeout(()=>{
      [document.querySelector(".site-header"),document.querySelector(".hero"),document.querySelector(".trust-strip"),document.getElementById("analisar"),document.getElementById("integridade"),document.getElementById("ats"),document.querySelector("footer")].forEach(el=>{if(el)el.classList.add("hidden")});
      resultsEl.style.padding="20px";window.scrollTo(0,0);
    },1250);
  }
}
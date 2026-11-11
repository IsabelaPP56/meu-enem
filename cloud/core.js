export const LETTERS = ['A','B','C','D','E'];
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function questionId(q){const id=q.area+'_'+q.id;if(!/^(matematica|linguagens|natureza|humanas)_[LMNH]\d{3,4}$/.test(id))throw Error('Identificador de questão inválido.');return id}
export function parseJSON(text){return JSON.parse(String(text).trim().replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,''))}
export function validateExplanation(x,q){
 if(!x||x.canExplain!==true||String(x.doubt||'').trim())throw Error('A IA não conseguiu justificar o gabarito com segurança. Nenhuma explicação foi publicada.');
 if(x.officialAnswer!==q.answer||!LETTERS.includes(q.answer))throw Error('A resposta da IA divergiu do gabarito oficial. Conteúdo descartado.');
 if(!Array.isArray(x.steps)||x.steps.length<2||x.steps.some(s=>typeof s!=='string'||s.length<12))throw Error('Passos da resolução incompletos.');
 for(const l of LETTERS){const a=x.alternatives?.[l];if(!a||a.correct!==(l===q.answer)||typeof a.reason!=='string'||a.reason.length<15)throw Error('Análise das alternativas não confere com o gabarito.');}
 if(!Array.isArray(x.commonMistakes)||x.commonMistakes.some(s=>typeof s!=='string'))throw Error('Faltam orientações sobre os erros.');
 const out={canExplain:true,officialAnswer:q.answer,steps:x.steps.slice(0,20),alternatives:Object.fromEntries(LETTERS.map(l=>[l,{correct:l===q.answer,reason:x.alternatives[l].reason.slice(0,5000)}])),commonMistakes:x.commonMistakes.slice(0,10),doubt:String(x.doubt||'')};if(JSON.stringify(out).length>50000)throw Error('Explicação grande demais.');return out
}
export function validateEssay(x){
 if(!x||typeof x.transcription!=='string'||typeof x.canEvaluate!=='boolean')throw Error('Resposta de correção inválida.');
 if(!x.canEvaluate)return{canEvaluate:false,transcription:x.transcription.slice(0,40000),warning:String(x.warning||'Confira a transcrição e envie um texto legível.'),competencies:[],total:null,problematicExcerpts:[],suggestions:[]};
 if(!Array.isArray(x.competencies)||x.competencies.length!==5)throw Error('A correção não trouxe as cinco competências.');
 const seen=new Set();const competencies=x.competencies.map(c=>{if(!Number.isInteger(c.number)||c.number<1||c.number>5||seen.has(c.number)||!Number.isInteger(c.score)||c.score<0||c.score>200||c.score%40!==0||typeof c.justification!=='string'||c.justification.length<15)throw Error('Notas ou justificativas inválidas.');seen.add(c.number);return{number:c.number,score:c.score,justification:c.justification.slice(0,6000)}}).sort((a,b)=>a.number-b.number);
 if(!Array.isArray(x.problematicExcerpts)||!Array.isArray(x.suggestions))throw Error('Correção incompleta.');
 return{canEvaluate:true,transcription:x.transcription.slice(0,40000),competencies,total:competencies.reduce((n,c)=>n+c.score,0),problematicExcerpts:x.problematicExcerpts.filter(s=>typeof s==='string').slice(0,20),suggestions:x.suggestions.filter(s=>typeof s==='string').slice(0,15),warning:String(x.warning||'Estimativa de IA; não é correção oficial do INEP.')}
}
export function quotaDecision(old,now,limit=30){if(!old||now-old.windowStart>=86400000)return{windowStart:now,count:1};if(old.count>=limit)throw Error('Seu limite de 30 tentativas em 24 horas foi atingido. Tente após o fim desta janela.');return{windowStart:old.windowStart,count:old.count+1}}
export const STUDY_KEYS=['progress.v1','drafts.v1','settings.v1','learning.v2','simulados.v1','plano.v1'].map(x=>'meuenem.enem.2027.'+x);
export function validProgress(x){if(!x||typeof x!=='object'||Array.isArray(x))throw Error('Progresso inválido.');for(const[k,v]of Object.entries(x)){if(!/^(matematica|linguagens|natureza|humanas):[LMNH]\d{3,4}$/.test(k)||!v||typeof v!=='object'||(v.choice&&!LETTERS.includes(v.choice)))throw Error('Registro de progresso inválido.')}return x}

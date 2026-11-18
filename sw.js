// Meu ENEM · service worker v4 (Fase 1). Estratégia: rede primeiro para tudo do próprio site.
// Com internet, sempre usa a versão publicada; sem internet, usa a última cópia guardada.
// Não intercepta Firebase, Google, YouTube nem qualquer outro domínio.
const CACHE='meu-enem-v4-1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(u.pathname.endsWith('/sw.js'))return;
 e.respondWith((async()=>{try{const res=await fetch(r);if(res&&res.ok&&res.type==='basic'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{})}return res}catch(err){const hit=await caches.match(r,{ignoreSearch:r.mode==='navigate'});if(hit)return hit;if(r.mode==='navigate'){const home=await caches.match('./')||await caches.match('index.html');if(home)return home}return new Response('Sem conexão. Reabra o Meu ENEM quando a internet voltar.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})())});

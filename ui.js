export function cardEvent(e){
 const pct=e.capacity?Math.min(100,Math.round((e.registered||0)/e.capacity*100)):0;
 return `<article class="card"><span class="tag">${esc(e.category||"Community")}</span><h3>${esc(e.title)}</h3><p class="muted">${esc(e.event_date)} • ${esc((e.event_time||"").slice(0,5))}${e.location?" • "+esc(e.location):""}</p><p>${esc(e.description||"")}</p><div class="bar"><span style="width:${pct}%"></span></div><p class="muted">${e.registered||0} / ${e.capacity||"∞"} registered</p><a class="btn" href="event.html?id=${e.id}">Register</a></article>`;
}
export function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
export function showSetup(el){el.innerHTML=`<div class="card"><h2>Connect Supabase</h2><p>Open <b>js/config.js</b> and paste your Supabase URL and publishable/anon key. Then refresh this page.</p></div>`;}
export function msg(text,type="success"){const d=document.createElement("div");d.className="toast "+type;d.textContent=text;document.body.appendChild(d);setTimeout(()=>d.remove(),3500);}

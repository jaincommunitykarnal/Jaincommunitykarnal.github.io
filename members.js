import {supabase,configured} from "./supabase.js"; import {esc,showSetup} from "./ui.js";
const out=document.querySelector("#members"), search=document.querySelector("#search");
let members=[];
async function load(){if(!configured()){showSetup(out);return}const q=search.value.trim();let req=supabase.from("member_public").select("*").order("name").limit(100);if(q)req=req.or(`name.ilike.%${q}%,family.ilike.%${q}%`);const {data,error}=await req;if(error)out.innerHTML=`<div class="card">${error.message}</div>`;else{members=data||[];out.innerHTML=`<div class="tablewrap"><table><thead><tr><th>Name</th><th>Family</th></tr></thead><tbody>${members.map(m=>`<tr><td>${esc(m.name)}</td><td>${esc(m.family||"—")}</td></tr>`).join("")}</tbody></table></div>`}}
search.oninput=()=>load();load();
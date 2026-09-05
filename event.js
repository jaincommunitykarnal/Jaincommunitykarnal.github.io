import {supabase,configured} from "./supabase.js"; import {esc,msg,showSetup} from "./ui.js";
const id=new URLSearchParams(location.search).get("id"), out=document.querySelector("#event");
if(!configured()){showSetup(out)}
else if(!id){out.innerHTML="<div class='card'>Event not found.</div>"}
else{
 const {data:e,error}=await supabase.from("event_public").select("*").eq("id",id).single();
 if(error){out.innerHTML=`<div class="card"><b>Event not found</b><p>${error.message}</p></div>`}
 else out.innerHTML=`<article class="card wide"><span class="tag">${esc(e.category||"Community")}</span><h1>${esc(e.title)}</h1><p class="muted">${esc(e.event_date)} • ${esc((e.event_time||"").slice(0,5))}${e.location?" • "+esc(e.location):""}</p><p>${esc(e.description||"")}</p><div class="notice"><b>${Math.max(0,(e.capacity||0)-(e.registered||0))}</b> places remaining</div><h2>Register</h2><form id="reg"><label>Name<input name="name" required></label><label>Family<input name="family"></label><label>Mobile<input name="phone" type="tel" required></label><label>Participants<select name="participants">${[1,2,3,4,5].map(x=>`<option>${x}</option>`).join("")}</select></label><button class="btn">Confirm Registration</button></form></article>`;
 document.querySelector("#reg")?.addEventListener("submit",async ev=>{ev.preventDefault();const f=new FormData(ev.target);const {error}=await supabase.rpc("register_for_event",{p_event_id:Number(id),p_name:f.get("name"),p_family:f.get("family"),p_phone:f.get("phone"),p_participants:Number(f.get("participants"))});if(error)msg(error.message,"error");else{msg("Registration confirmed. जय जिनेन्द्र 🙏");ev.target.reset();}});
}
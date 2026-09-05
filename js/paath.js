import {supabase,configured} from "./supabase.js"; import {esc,msg,showSetup} from "./ui.js";
const out=document.querySelector("#paath");
if(!configured()){showSetup(out)}else{
 const {data,error}=await supabase.from("paath_slot_public").select("*").order("slot_date").order("start_hour");
 if(error){out.innerHTML=`<div class="card"><b>Database error</b><p>${error.message}</p></div>`}
 else{
  const days={}; (data||[]).forEach(s=>(days[s.slot_date]??=[]).push(s));
  out.innerHTML=Object.entries(days).map(([d,slots])=>`<section class="card day"><h2>${new Date(d+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})}</h2><div class="slots">${slots.map(s=>`<button class="slot ${s.booked>=s.capacity?"full":""}" ${s.booked>=s.capacity?"disabled":""} data-id="${s.id}">${String(s.start_hour).padStart(2,"0")}:00–${String((s.start_hour+1)%24).padStart(2,"0")}:00<small>${s.booked}/${s.capacity}</small></button>`).join("")}</div></section>`).join("");
  out.querySelectorAll(".slot:not([disabled])").forEach(b=>b.onclick=()=>book(b.dataset.id));
 }
}
async function book(id){
 const name=prompt("Your name:"); if(!name)return;
 const family=prompt("Family name (optional):")||"";
 const phone=prompt("Mobile number:"); if(!phone)return;
 const {error}=await supabase.rpc("book_paath_slot",{p_slot_id:Number(id),p_name:name,p_family:family,p_phone:phone});
 if(error)msg(error.message,"error"); else {msg("Paath slot booked successfully. 🙏"); location.reload();}
}
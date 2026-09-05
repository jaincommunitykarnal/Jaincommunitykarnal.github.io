import {supabase,configured} from "./supabase.js"; import {cardEvent,showSetup} from "./ui.js";
const out=document.querySelector("#events");
if(!configured()){showSetup(out)}else{
 const {data,error}=await supabase.from("event_public").select("*").eq("registration_open",true).order("event_date").order("event_time").limit(6);
 if(error) out.innerHTML=`<div class="card"><b>Database error</b><p>${error.message}</p></div>`;
 else out.innerHTML=(data||[]).map(cardEvent).join("")||`<div class="card">No upcoming events yet.</div>`;
}
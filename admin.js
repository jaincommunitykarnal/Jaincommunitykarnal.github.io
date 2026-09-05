import {supabase,configured} from "./supabase.js"; import {esc,msg,showSetup} from "./ui.js";
const auth=document.querySelector("#auth"), dash=document.querySelector("#dashboard");
if(!configured()){showSetup(auth)}
else{
 const {data:{session}}=await supabase.auth.getSession();
 render(session);
 supabase.auth.onAuthStateChange((_e,s)=>render(s));
}
async function render(session){
 if(!session){dash.hidden=true;auth.innerHTML=`<article class="card narrow"><h1>Organizer Login</h1><p class="muted">Authorized community organizers only.</p><form id="login"><label>Email<input type="email" name="email" required></label><label>Password<input type="password" name="password" required></label><button class="btn">Login</button></form><p class="muted">Organizer accounts are created in Supabase Authentication.</p></article>`;document.querySelector("#login").onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const {error}=await supabase.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});if(error)msg(error.message,"error")};return}
 auth.innerHTML=`<div class="titleline"><h1>Organizer Dashboard</h1><button id="logout" class="btn">Logout</button></div>`;
 document.querySelector("#logout").onclick=()=>supabase.auth.signOut();
 dash.hidden=false;
 const {data:events}=await supabase.from("events").select("*").order("event_date").order("event_time");
 const {data:regs}=await supabase.from("event_registrations").select("*,events(title)").order("created_at",{ascending:false}).limit(100);
 const {count:members}=await supabase.from("members").select("*",{count:"exact",head:true});
 const {count:bookings}=await supabase.from("paath_bookings").select("*",{count:"exact",head:true});
 dash.innerHTML=`<div class="kpis"><div class="kpi"><small>Events</small><b>${events?.length||0}</b></div><div class="kpi"><small>Members</small><b>${members||0}</b></div><div class="kpi"><small>Event registrations</small><b>${regs?.length||0}</b></div><div class="kpi"><small>Paath bookings</small><b>${bookings||0}</b></div></div><div class="titleline"><h2>Events</h2><button id="new" class="btn">+ Create Event</button></div><div class="tablewrap"><table><thead><tr><th>Event</th><th>Date</th><th>Capacity</th><th>Open</th></tr></thead><tbody>${(events||[]).map(e=>`<tr><td>${esc(e.title)}</td><td>${e.event_date}</td><td>${e.capacity}</td><td>${e.registration_open?"Yes":"No"}</td></tr>`).join("")}</tbody></table></div><h2>Recent registrations</h2><div class="tablewrap"><table><thead><tr><th>Event</th><th>Name</th><th>Family</th><th>People</th></tr></thead><tbody>${(regs||[]).map(r=>`<tr><td>${esc(r.events?.title)}</td><td>${esc(r.name)}</td><td>${esc(r.family||"—")}</td><td>${r.participants}</td></tr>`).join("")}</tbody></table></div>`;
 document.querySelector("#new").onclick=()=>createEvent();
}
async function createEvent(){
 const title=prompt("Event name:"); if(!title)return;
 const event_date=prompt("Date (YYYY-MM-DD):"); if(!event_date)return;
 const event_time=prompt("Time (HH:MM):","18:00")||"18:00";
 const category=prompt("Category:","Religious")||"Community";
 const capacity=Number(prompt("Capacity:","100")||100);
 const description=prompt("Description:","")||"";
 const {error}=await supabase.from("events").insert({title,event_date,event_time,category,capacity,description,registration_open:true});
 if(error)msg(error.message,"error");else{msg("Event created.");location.reload()}
}
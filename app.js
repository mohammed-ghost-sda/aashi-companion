(function () {
  "use strict";
  var stops = [
    ["Chennai Beach (MSB)","PF 1 • South Suburban Track","18:15","Departed"],
    ["Chennai Fort (MSF)","PF 2 • High Platform","18:19","On time"],
    ["Chennai Park (MPK)","PF 2 • Central Interchange","18:22","On time"],
    ["Mambalam (MBM)","PF 1 • West Mambalam","18:34","+2 min"],
    ["Guindy (GDY)","PF 4 • Metro & Bus Interchange","18:42","Cleared"],
    ["St. Thomas Mount (STM)","Platform 1 • Green Line Metro & MRTS Junction","18:48","Next halt"],
    ["Meenambakkam (MN)","PF 1 • Airport Cargo Terminal","18:52","Scheduled"],
    ["Pallavaram (PV)","PF 2 • Cantonment West","18:56","Scheduled"],
    ["Tambaram (TBM)","PF 3 • Main Southern Rail Terminal","19:08","Major exchange"],
    ["Perungalathur (PRGL)","PF 1 • Feeder to Outstation MTC Buses","19:15","Destination"]
  ];
  var trains = [
    {id:"40542",type:"FAST EMU",route:"Chennai Beach ↔ Chengalpattu Fast",tags:["GUINDY → PERUNGALATHUR → CGL"],detail:"Stops: Guindy, Tambaram, Perungalathur, Vandalur, Guduvancheri.",time:"18:52 → 19:16",duration:"24 min run",freq:"Every 8 min",next:"IN 8 MINS",mode:"suburban"},
    {id:"40544",type:"LADIES SPECIAL",route:"Chennai Beach ↔ Arakkonam / Tambaram",tags:["SLOW EMU ALL STOPS"],detail:"All intermediate halts including St. Thomas Mount, Pallavaram, Chromepet, Perungalathur.",time:"19:00 → 19:28",duration:"28 min run",freq:"Every 8 min peak",next:"IN 16 MINS",mode:"suburban"},
    {id:"40546",type:"SLOW REGULAR EMU",route:"Chennai Beach ↔ Chengalpattu Local",tags:["DIRECT PERUNGALATHUR"],detail:"Comprehensive stopping pattern via Saidapet, Guindy, Meenambakkam, Tambaram Sanatorium.",time:"19:08 → 19:35",duration:"27 min run",freq:"Every 8 min peak",next:"IN 24 MINS",mode:"suburban"},
    {id:"40550",type:"FAST EMU",route:"Chennai Beach ↔ Tirumalpur Fast",tags:["DIRECT PERUNGALATHUR"],detail:"Express stopping profile to Chengalpattu, extending westward via Walajabad & Kanchipuram.",time:"19:20 → 19:43",duration:"23 min run",freq:"Every 12 min",next:"IN 36 MINS",mode:"suburban"},
    {id:"40554",type:"SLOW REGULAR EMU",route:"Chennai Beach ↔ Tambaram Terminal Loop",tags:["TERMINATES TAMBARAM"],detail:"Passengers to Perungalathur must interchange at Tambaram PF 1 to onward shuttle.",time:"19:34 → 19:54",duration:"20 min run",freq:"Every 8 min peak",next:"IN 50 MINS",mode:"suburban"}
  ];
  var coaches = [["ENG","♧","Low",""],["LADIES","♀","Med","ladies"],["GEN","♟","Packed",""],["GEN","♟","Packed",""],["VEND","▣","Med","vend"],["GEN","♟","Packed",""],["LADIES","♀","High","high"],["GEN","♟","Packed",""],["FC","▦","Med","fc"],["GEN","♟","Med",""],["LADIES","♀","Med","ladies"],["GUARD","♙","Low",""]];
  var $ = function (id) { return document.getElementById(id); };
  function renderCoaches(){ $("coachGrid").innerHTML=coaches.map(function(c){return '<div class="coach '+c[3]+'"><b>'+c[0]+'</b><span class="coach-symbol">'+c[1]+'</span><small>'+c[2]+'</small></div>';}).join(""); }
  function renderTimeline(){ $("timeline").innerHTML=stops.map(function(s,i){return '<div class="timeline-row"><span class="timeline-check">'+(i<5?'✓':i===5?'→':'·')+'</span><div class="timeline-item"><div><strong>'+ (i+1)+'. '+s[0] + (i===0?' <small>Orig</small>':'') + (i===9?' <small>DESTINATION</small>':'') + '</strong><small>'+s[1]+'</small></div><div class="time-col">'+s[2]+' <small>'+s[3].toUpperCase()+'</small></div></div></div>';}).join(""); }
  function renderStations(){ $("stationList").innerHTML=stops.slice(5).map(function(s,i){return '<div class="station-item '+(i===0?'current':'')+'"><div class="station-copy"><strong>'+s[0]+'</strong><small>'+s[1]+'</small></div><div class="station-time">'+s[2]+' ETA <small>'+s[3].toUpperCase()+'</small></div></div>';}).join(""); }
  var activeMode="suburban", directOnly=false, ladiesOnly=false, alarmEnabled=false;
  function renderTrains(){
    var q=$("trainSearch").value.toLowerCase();
    var data=trains.filter(function(t){
      return t.mode===activeMode &&
        (!q || [t.id,t.route,t.detail,t.type].join(" ").toLowerCase().indexOf(q)>-1) &&
        (!directOnly || t.tags.join(" ").indexOf("DIRECT PERUNGALATHUR")>-1 || t.id==="40542") &&
        (!ladiesOnly || t.type.indexOf("LADIES")>-1);
    });
    $("trainList").innerHTML=data.length?data.map(function(t){return '<article class="train-row"><div class="train-code"><small>EMU</small>'+t.id+'</div><div class="train-description"><div class="train-tags"><span class="primary">'+t.type+'</span>'+t.tags.map(function(tag){return '<span>'+tag+'</span>';}).join("")+' <em class="eyebrows">verified Oct 2026</em></div><h3>'+t.route+'</h3><p>'+t.detail+'</p></div><div class="train-time">'+t.time+'<small>Platform 4 • '+t.duration+'</small></div><div class="frequency">FREQUENCY<strong>'+t.freq+'</strong><strong>'+t.next+'</strong></div></article>';}).join(""):'<div class="surface" style="padding:22px;text-align:center;color:#986e72">No matching services. Try another train number or station.</div>';
  }
  function toast(msg){var el=$("toast");el.textContent=msg;el.classList.add("visible");clearTimeout(toast.timer);toast.timer=setTimeout(function(){el.classList.remove("visible");},2600);}
  function updateClock(){var now=new Date();var parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).format(now);$("clock").textContent=parts+" IST";}
  renderCoaches();renderTimeline();renderStations();renderTrains();updateClock();setInterval(updateClock,1000);
  $("trainSearch").addEventListener("input",renderTrains);
  document.querySelectorAll(".mode-tab").forEach(function(tab){tab.addEventListener("click",function(){document.querySelectorAll(".mode-tab").forEach(function(t){t.classList.remove("selected");});tab.classList.add("selected");activeMode=tab.dataset.mode;renderTrains();});});
  $("directFilter").addEventListener("click",function(){directOnly=!directOnly;this.classList.toggle("active",directOnly);renderTrains();});
  $("ladiesFilter").addEventListener("click",function(){ladiesOnly=!ladiesOnly;this.classList.toggle("active",ladiesOnly);renderTrains();});
  $("nextHour").addEventListener("click",function(){this.classList.toggle("active");toast("The visible sample departures are all within this 60-minute preview window.");});
  $("invertRoute").addEventListener("click",function(){var a=$("originTitle").textContent;$("originTitle").textContent=$("destTitle").textContent;$("destTitle").textContent=a;toast("Route direction inverted in this preview.");});
  $("saveTrip").addEventListener("click",function(){this.classList.toggle("saved");toast(this.classList.contains("saved")?"Journey saved to your keepsake list.":"Journey removed from saved trips.");});
  $("shareTrip").addEventListener("click",function(){var text="Aashii’s Rafiq • Chennai Beach to Perungalathur • ETA 19:15";if(navigator.share){navigator.share({title:"My live journey",text:text}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast("Journey details copied to clipboard.");}).catch(function(){toast(text);});}else toast(text);});
  $("arrivalAlarm").addEventListener("click",function(){alarmEnabled=!alarmEnabled;this.setAttribute("aria-pressed",String(alarmEnabled));this.textContent=alarmEnabled?"♧ Alarm enabled (preview)":"♧ Arrival alarm";toast(alarmEnabled?"Arrival alarm preference enabled in this preview. No live alert service is connected.":"Arrival alarm preference disabled.");});
  $("broadcast").addEventListener("click",function(){toast("Live position: approaching Guindy–Mount Overpass · 42 km/h");});
})();

/* Course Detail: tab kategori + profil elevasi (SVG) dari data GPX */
(()=>{
  const COURSES={
    hm:{label:"Half Marathon",distance:"21,32 km",start:"04.30",cutoff:"08.30 (4 jam)",gain:"81 m",range:"Belum dicantumkan di halaman web",age:"17–65 tahun",cps:"KM 11,8 dalam 2 jam 15 menit; KM 19,4 dalam 3 jam 45 menit",water:"Water station & refreshment tersedia. Lokasi lengkap ada di gambar rute resmi.",img:"assets/kphm/race-05.webp",note:"Halaman kategori di web menulis start 05.00 dan jarak 21,097 km pada deskripsi; kami mengikuti halaman Race Day Info (04.30; 21,32 km)."},
    "10k":{label:"10K",distance:"10,19 km",start:"05.00",cutoff:"07.00 (2 jam)",gain:"47 m",range:"16–37 m",age:"14–65 tahun",cps:"KM 5,7 dalam 1 jam 5 menit",water:"Water station & refreshment tersedia. Menurut materi rute: air + medis di KM 2,3 · 4,6 · 7,9; air di KM 6,3; medis di KM 3,2.",img:"assets/kphm/race-03.webp"},
    "5k":{label:"5K",distance:"5,22 km",start:"05.20",cutoff:"06.20 (1 jam)",gain:"22 m",range:"16–33 m",age:"8–65 tahun",cps:"KM 4 dalam 45 menit",water:"Water station & refreshment tersedia. Menurut materi rute: air + medis di KM 1,7 dan KM 4,8; titik putar balik dan checkpoint sekitar KM 4.",img:"assets/kphm/race-04.webp"},
    jd:{label:"Junior Dash",distance:"800 m",start:"06.15",cutoff:"06.30 (15 menit)",gain:"1 m",range:"Belum dicantumkan di halaman web (rute datar)",age:"4–8 tahun",cps:"Tidak ada",water:"Water station & refreshment tersedia. Start dan finis terpisah di alun-alun.",img:"assets/kphm/race-08.webp"}
  };
  const tabs=document.getElementById("courseTabs"),panel=document.getElementById("coursePanel");
  if(!tabs||!panel)return;
  const fmt=(n,d=1)=>n.toFixed(d).replace(".",",");
  function chart(p){
    const W=640,H=260,L=54,R=14,T=16,B=34,pts=p.points,maxX=Math.ceil(p.gpxKm);
    const yMin=15,yMax=35,x=km=>L+(km/maxX)*(W-L-R),y=e=>T+(1-(e-yMin)/(yMax-yMin))*(H-T-B);
    const line=pts.map((q,i)=>(i?"L":"M")+x(q[0]).toFixed(1)+" "+y(q[1]).toFixed(1)).join("");
    const area=line+`L${x(pts[pts.length-1][0]).toFixed(1)} ${y(yMin)}L${x(0)} ${y(yMin)}Z`;
    let grid="";
    for(let e=yMin;e<=yMax;e+=5)grid+=`<line x1="${L}" x2="${W-R}" y1="${y(e)}" y2="${y(e)}" class="g"/><text x="${L-8}" y="${y(e)+4}" text-anchor="end">${e} m</text>`;
    for(let k=0;k<=maxX;k++)grid+=`<text x="${x(k)}" y="${H-10}" text-anchor="middle">${k} km</text>`;
    return `<svg class="elev-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Profil elevasi 5K dari ${p.min} m sampai ${p.max} m sepanjang ${fmt(p.gpxKm,2)} km"><defs><linearGradient id="elevFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6b45e" stop-opacity=".55"/><stop offset="1" stop-color="#d6b45e" stop-opacity=".05"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#elevFill)"/><path d="${line}" class="ln"/><g id="elevCursor" hidden><line id="cLine" y1="${T}" y2="${H-B}" class="cur"/><circle id="cDot" r="5"/><text id="cTxt" y="${T+10}"></text></g><rect id="elevHit" x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}" fill="transparent"/></svg>`;
  }
  function bindChart(p){
    const svg=panel.querySelector(".elev-svg");if(!svg)return;
    const W=640,H=260,L=54,R=14,T=16,B=34,maxX=Math.ceil(p.gpxKm),yMin=15,yMax=35;
    const cur=svg.querySelector("#elevCursor"),cl=svg.querySelector("#cLine"),dot=svg.querySelector("#cDot"),tx=svg.querySelector("#cTxt");
    function move(ev){
      const r=svg.getBoundingClientRect(),px=(ev.clientX-r.left)/r.width*W;
      const km=Math.min(p.gpxKm,Math.max(0,(px-L)/(W-L-R)*maxX));
      let best=p.points[0];for(const q of p.points)if(Math.abs(q[0]-km)<Math.abs(best[0]-km))best=q;
      const cx=L+(best[0]/maxX)*(W-L-R),cy=T+(1-(best[1]-yMin)/(yMax-yMin))*(H-T-B);
      cur.hidden=false;cl.setAttribute("x1",cx);cl.setAttribute("x2",cx);dot.setAttribute("cx",cx);dot.setAttribute("cy",cy);
      tx.textContent=`KM ${fmt(best[0],2)} · ${fmt(best[1])} m`;tx.setAttribute("x",cx>W-150?cx-8:cx+8);tx.setAttribute("text-anchor",cx>W-150?"end":"start");
    }
    const hit=svg.querySelector("#elevHit");
    hit.addEventListener("pointermove",move);hit.addEventListener("pointerdown",move);
    hit.addEventListener("pointerleave",()=>{cur.hidden=true;});
  }
  function render(id){
    const c=COURSES[id],prof=(window.COURSE_PROFILES||{})[id];
    tabs.querySelectorAll("button").forEach(b=>{const on=b.dataset.course===id;b.classList.toggle("active",on);b.setAttribute("aria-selected",on)});
    const stats=[["Jarak",c.distance],["Start (flag-off)",c.start+" WIB"],["Batas finis",c.cutoff],["Tanjakan kumulatif",c.gain],["Rentang elevasi",c.range],["Usia peserta",c.age]];
    const elev=prof?`<div class="elev-card"><h4>Profil elevasi · ${c.label}</h4>${chart(prof)}<p class="elev-meta">Dari file GPX: terendah ${fmt(prof.min)} m, tertinggi ${fmt(prof.max)} m. Sentuh atau geser grafik untuk melihat elevasi di tiap titik.</p><p class="elev-note">Panjang jejak GPX ${fmt(prof.gpxKm,2)} km, sedangkan jarak resmi ${c.distance}. Tanjakan kumulatif resmi: ${c.gain}.</p></div>`:`<div class="elev-card empty"><h4>Profil elevasi · ${c.label}</h4><p>File GPX untuk kategori ini belum tersedia di situs ini. Grafik elevasi ada di gambar rute resmi.</p><a class="text-link" href="${c.img}" data-zoom>Lihat gambar rute &amp; elevasi resmi</a></div>`;
    panel.innerHTML=`<div class="course-stats">${stats.map(s=>`<div><span>${s[0]}</span><b>${s[1]}</b></div>`).join("")}</div><div class="course-extra"><div><h4>Titik cut-off</h4><p>${c.cps}</p></div><div><h4>Water station &amp; refreshment</h4><p>${c.water}</p></div></div>${elev}${c.note?`<p class="course-note">${c.note}</p>`:""}<a class="text-link" href="${c.img}" data-zoom>Lihat peta rute resmi ${c.label}</a>`;
    if(prof)bindChart(prof);
  }
  tabs.innerHTML=Object.keys(COURSES).map(id=>`<button type="button" role="tab" class="course-tab" data-course="${id}">${COURSES[id].label}</button>`).join("");
  tabs.addEventListener("click",e=>{const b=e.target.closest("[data-course]");if(b)render(b.dataset.course)});
  render("5k");
})();

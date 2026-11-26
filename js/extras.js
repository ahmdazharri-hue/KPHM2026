/* Hitung mundur ke flag-off pertama dan tampilan gambar diperbesar */
(()=>{
  const el=document.getElementById("countdown");
  const C=window.RACE_CONFIG||{};
  const start=Date.parse(C.flagOff||"2026-11-29T04:30:00+07:00"), end=Date.parse(C.lastCutOff||"2026-11-29T08:30:00+07:00");
  function tick(){
    const now=Date.now();
    if(now>=end){el.innerHTML="<p>KPHM 2026 telah berlangsung. Terima kasih, sampai jumpa!</p>";return;}
    if(now>=start){el.innerHTML="<p>Race day sedang berlangsung.</p>";return;}
    let s=Math.floor((start-now)/1000);
    const parts=[["hari",86400],["jam",3600],["menit",60],["detik",1]].map(([label,size])=>{const v=Math.floor(s/size);s%=size;return `<span><b>${String(v).padStart(2,"0")}</b>${label}</span>`;});
    el.innerHTML="<small>Menuju flag-off pertama, 04.30 WIB</small>"+parts.join("");
  }
  tick();setInterval(tick,1000);

  const box=document.getElementById("lightbox"), img=document.getElementById("lightboxImg");
  document.addEventListener("click",e=>{
    const link=e.target.closest("a[data-zoom]");
    if(!link||!box.showModal)return;
    e.preventDefault();
    img.src=link.getAttribute("href");
    img.alt=link.querySelector("img")?.alt||link.textContent.trim()||"Materi resmi KPHM 2026";
    box.showModal();box.scrollTop=0;
  });
  box.addEventListener("click",e=>{if(e.target===box)box.close();});
})();

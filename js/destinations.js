window.DestinationUI = {
  activeCategory:"all", query:"", expanded:false,
  render(){
    const grid=document.getElementById("destinationGrid");
    const items=window.DESTINATIONS.filter(d=>(this.activeCategory==="all"||d.category===this.activeCategory)&&(`${d.name} ${d.description} ${d.categoryLabel}`).toLowerCase().includes(this.query.toLowerCase()));
    const limited=this.activeCategory==="all"&&!this.query;
    const more=document.getElementById("showAll");
    more.hidden=!limited||items.length<=6;
    more.textContent=this.expanded?"Tampilkan lebih sedikit":`Lihat semua ${items.length} tempat`;
    more.onclick=()=>{this.expanded=!this.expanded;this.render();if(!this.expanded)document.getElementById("discover").scrollIntoView();};
    const shown=limited&&!this.expanded?items.slice(0,6):items;
    grid.innerHTML=shown.length?shown.map(d=>`<article class="destination-card" data-id="${d.id}" tabindex="0" role="button" aria-label="Lihat ${d.name}"><div class="destination-art ${d.art}">${d.photo?`<img src="${d.photo}" alt="" loading="lazy">`:""}<span class="art-code">${d.code}</span><span class="art-type">${d.categoryLabel}</span></div><div class="destination-info"><div class="destination-topline"><span>${d.categoryLabel}</span><span class="verify-tag">Cek sebelum datang</span></div><h3>${d.name}</h3><p>${d.description.slice(0,105)}…</p><div class="destination-bottom"><span>Lihat detail</span><span>↗</span></div></div></article>`).join(""):`<p class="empty-state">Tidak ada destinasi yang cocok dengan pencarian.</p>`;
    grid.querySelectorAll(".destination-card").forEach(card=>{const open=()=>window.App.openDestination(card.dataset.id);card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}})});
  }
};
window.DestinationUI = {
  activeCategory:"all", query:"",
  render(){
    const grid=document.getElementById("destinationGrid");
    const items=window.DESTINATIONS.filter(d=>(this.activeCategory==="all"||d.category===this.activeCategory)&&(`${d.name} ${d.description} ${d.categoryLabel}`).toLowerCase().includes(this.query.toLowerCase()));
    grid.innerHTML=items.length?items.map(d=>`<article class="destination-card" data-id="${d.id}" tabindex="0" role="button" aria-label="Lihat ${d.name}"><div class="destination-art ${d.art}">${d.photo?`<img src="${d.photo}" alt="" loading="lazy">`:""}<span class="art-code">${d.code}</span><span class="art-type">${d.categoryLabel}</span></div><div class="destination-info"><div class="destination-topline"><span>${d.categoryLabel}</span><span class="verify-tag">NEEDS VERIFICATION</span></div><h3>${d.name}</h3><p>${d.description.slice(0,105)}…</p><div class="destination-bottom"><span>Explore field note</span><span>↗</span></div></div></article>`).join(""):`<p class="empty-state">Tidak ada destinasi yang cocok dengan pencarian.</p>`;
    grid.querySelectorAll(".destination-card").forEach(card=>{const open=()=>window.App.openDestination(card.dataset.id);card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}})});
  }
};
window.MapUI = {
  search(query){
    const q=(query||"Kulon Progo, Yogyakarta").trim();
    if(!q){window.App.toast("Masukkan nama tempat untuk mencari.");return;}
    const url="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q);
    window.open(url,"_blank","noopener");
  },
  directions(destination){
    const url="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(destination);
    window.open(url,"_blank","noopener");
  }
};
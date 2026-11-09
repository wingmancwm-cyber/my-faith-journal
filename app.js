const pageNames = ["home","records","bible","library","settings"];
function showPage(name){
  if(!pageNames.includes(name)) return;
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${name}`));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>showPage(btn.dataset.page)));
document.querySelectorAll("[data-go]").forEach(btn=>btn.addEventListener("click",()=>showPage(btn.dataset.go)));
const d = new Date();
document.getElementById("todayDate").textContent = new Intl.DateTimeFormat("zh-Hant",{year:"numeric",month:"long",day:"numeric",weekday:"long"}).format(d);
document.getElementById("installHint").addEventListener("click",()=>{
  alert("在 iPhone 的 Safari 開啟此網站，按下「分享」圖示，再選擇「加入主畫面」，即可把恩典手帳放在主畫面。");
});
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}

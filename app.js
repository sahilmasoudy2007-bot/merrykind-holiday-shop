const catalog={basket:{name:"The Cozy Night In Basket",price:48},ornament:{name:"Pet Keepsake Ornament",price:24}};
const bag=new Map();
const bagCount=document.querySelector("#bag-count");
const bagItems=document.querySelector("#bag-items");
const bagTotal=document.querySelector("#bag-total");
const drawer=document.querySelector("#bag-drawer");
const backdrop=document.querySelector("#bag-backdrop");
const toast=document.querySelector("#toast");
let toastTimer;
function money(value){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value)}
function renderBag(){
  const count=[...bag.values()].reduce((sum,quantity)=>sum+quantity,0);
  const total=[...bag.entries()].reduce((sum,[id,quantity])=>sum+catalog[id].price*quantity,0);
  bagCount.textContent=count;bagTotal.textContent=money(total);
  if(!count){bagItems.innerHTML='<p class="empty-bag">It’s a little empty in here. Pick a gift to get started.</p>';return}
  bagItems.innerHTML=[...bag.entries()].map(([id,quantity])=>{
    const item=catalog[id];
    return '<div class="bag-row"><div><strong>'+item.name+'</strong><span>Quantity: '+quantity+'</span></div><b>'+money(item.price*quantity)+'</b><button type="button" data-remove="'+id+'">Remove</button></div>';
  }).join("");
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function setDrawer(open){
  drawer.classList.toggle("is-open",open);drawer.setAttribute("aria-hidden",String(!open));backdrop.hidden=!open;document.body.classList.toggle("bag-open",open);
  if(open)document.querySelector("#close-bag").focus();else document.querySelector("#open-bag").focus();
}
document.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{
  const id=button.dataset.product;bag.set(id,(bag.get(id)||0)+1);renderBag();showToast(catalog[id].name+" added to your bag");
}));
document.querySelector("#open-bag").addEventListener("click",()=>setDrawer(true));
document.querySelector("#close-bag").addEventListener("click",()=>setDrawer(false));
backdrop.addEventListener("click",()=>setDrawer(false));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&drawer.classList.contains("is-open"))setDrawer(false)});
bagItems.addEventListener("click",event=>{const button=event.target.closest("[data-remove]");if(!button)return;bag.delete(button.dataset.remove);renderBag()});
renderBag();

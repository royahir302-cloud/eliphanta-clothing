const cartKey="eliphantaCart";
let cart=JSON.parse(localStorage.getItem(cartKey)||"[]");

function updateCartUI(){
  document.querySelectorAll("#cartCount").forEach(el=>el.textContent=cart.length);
  const text=document.getElementById("cartText");
  const btn=document.getElementById("orderBtn");
  if(text&&btn){
    if(!cart.length){text.textContent="Your cart is empty. Add products to create your order.";btn.classList.add("disabled");btn.removeAttribute("href");}
    else{
      const grouped={};
      cart.forEach(x=>grouped[x.name]=(grouped[x.name]||0)+1);
      const items=Object.entries(grouped).map(([name,qty])=>`${name} x${qty}`).join(", ");
      text.textContent=items;
      const msg=`Hello Eliphanta Clothing, I want to order:%0A${encodeURIComponent(items)}`;
      btn.href=`https://wa.me/919510584191?text=${msg}`;
      btn.target="_blank";btn.rel="noopener";btn.classList.remove("disabled");
    }
  }
}
document.querySelectorAll(".add-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    cart.push({name:btn.dataset.product,price:Number(btn.dataset.price)});
    localStorage.setItem(cartKey,JSON.stringify(cart));
    updateCartUI();
    const old=btn.textContent;btn.textContent="Added ✓";setTimeout(()=>btn.textContent=old,1000);
  });
});
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
if(menu)menu.addEventListener("click",()=>nav.classList.toggle("open"));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const form=document.getElementById("contactForm");
if(form)form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const subject=document.getElementById("subject").value.trim();
  const message=document.getElementById("message").value.trim();
  const text=`Hello Eliphanta Clothing,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ARequirement: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/919510584191?text=${text}`,"_blank");
});
updateCartUI();

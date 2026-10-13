const carImages=[
'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85'
];
const brands=['Mercedes','BMW','Porsche','Toyota','Audi','Jeep','Ford','Volvo','Honda','Volkswagen'];
const types=['Sedan','Sport','SUV','Cabriolet','Pickup','Minivan'];
const cars=Array.from({length:100},(_,i)=>({
 id:i+1,brand:brands[i%brands.length],model:`${brands[i%brands.length]} ${String.fromCharCode(65+(i%8))}${(i%5)+1}`,
 type:types[i%types.length],price:25+(i%10)*5,transmission:i%3===0?'Manual':'Automatic',fuel:i%4===0?'Diesel':'Petrol',seats:4+(i%3),image:carImages[i%carImages.length]
}));
function card(c){return `<article class="car-card" data-type="${c.type}"><img loading="lazy" src="${c.image}" alt="${c.model}"><div class="car-meta"><div><h3>${c.model}</h3><span class="type">${c.type}</span></div><div class="price">$${c.price}<small>per day</small></div></div><div class="specs"><span>⚙ ${c.transmission}</span><span>⛽ ${c.fuel}</span><span>❄ Air Conditioner</span></div><a class="card-btn" href="details.html?id=${c.id}">View Details</a></article>`}
function renderCars(list,limit){const el=document.querySelector('[data-cars]');if(!el)return;el.innerHTML=list.slice(0,limit||list.length).map(card).join('')}
function setupCatalog(){const el=document.querySelector('[data-cars]');if(!el)return;const full=document.body.dataset.page==='vehicles';renderCars(cars,full?100:6);document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;renderCars(f==='All'?cars:cars.filter(c=>c.type===f),full?100:6)}))}
function setupDetails(){if(document.body.dataset.page!=='details')return;const id=Number(new URLSearchParams(location.search).get('id')||1);const c=cars.find(x=>x.id===id)||cars[0];document.querySelectorAll('[data-car-name]').forEach(x=>x.textContent=c.model);document.querySelectorAll('[data-car-price]').forEach(x=>x.textContent=`$${c.price}`);document.querySelectorAll('[data-car-image]').forEach(x=>{x.src=c.image;x.alt=c.model});document.querySelectorAll('[data-transmission]').forEach(x=>x.textContent=c.transmission);document.querySelectorAll('[data-fuel]').forEach(x=>x.textContent=c.fuel);document.querySelectorAll('[data-seats]').forEach(x=>x.textContent=c.seats)}
function setupMenu(){document.querySelectorAll('.mobile-menu').forEach(b=>b.addEventListener('click',()=>{const n=document.querySelector('.nav');if(!n)return;n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='68px';n.style.left='3%';n.style.right='3%';n.style.padding='18px';n.style.background='#fff';n.style.zIndex='20';n.style.flexDirection='column';n.style.boxShadow='0 15px 40px rgba(0,0,0,.1)'}))}
document.addEventListener('DOMContentLoaded',()=>{setupCatalog();setupDetails();setupMenu()});
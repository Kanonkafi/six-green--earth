//  cart item  rakahr faka array banala,
let cart = [];

// -----------Add to Cart ----------
const addToCart = (plant) => {
  // check করব cart-a agei ase kina plants modhe plan karon array selo ei plant modhe ei id ase kina seda khujbe  id ,name , catagori chaile agulo delei holo
  const existing = cart.find(item => item.id === plant.id);

  if (existing) {
    // যদি থাকে → শুধু quantity ১ বাড়াবে
    existing.quantity += 1;
  } else {
    // না থাকলে → নতুন করে add করবে
    cart.push({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: 1 //ei je plant er modhe quntity add kors nutun arra te joma hobe
    });
  }

  // cart update করার জন্য আলাদা ফাংশন কল করব
  updateCartUI();
};

// ---------- Remove from Cart ----------
const removeFromCart = (id) => {
  // filter দিয়ে ওই item বাদ দিলাম
  cart = cart.filter(item => item.id !== id);

  // আবার UI update করব
  updateCartUI();
};

// ---------- Update Cart UI ----------
const updateCartUI = () => {
  // cart aside এর ul আর total amount ধরলাম
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // আগের সব clear করলাম
  cartContainer.innerHTML = "";

  // total হিসাবের জন্য একটা variable নিলাম
  let total = 0;

  // প্রতিটা cart item এর জন্য loop চালালাম
  cart.forEach(item => {
    // price × quantity = মোট দাম
    total += item.price * item.quantity;

    // নতুন li বানালাম
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-50 p-3 rounded-md";

    // li এর ভেতরে html বসালাম
    li.innerHTML = `
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-gray-500 text-xs">৳${item.price} × ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})"
        class="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200">✕</button>
    `;

    // ul এ add করলাম
    cartContainer.appendChild(li);
  });

  // মোট price বসালাম
  cartTotal.innerText = `৳${total}`;
};


// 1. Load Categories
const loadCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) =>displayCategories(data.categories))
}
 //   for dispaly Categories
const displayCategories=(categories)=>{
    //1 dhore anlam 
    const categoryContainer=document.getElementById("category-container");  
     categoryContainer.innerHTML= `
        <li>
            <button onclick="loadTreesByCategory('all')"   
                id="ctgorybtnfor-select-all"
                class="removeselected-btn w-full text-left px-3 py-2 rounded-md hover:bg-green-300">
                All Trees
            </button>
        </li>
    `;
   // kisu hosse na jehutu era array tai  for each marbo r eta marle category_name  peye jabo

 categories.forEach(cat => {
    //jehutu create korbo tai crete kotahi create btn div a
    const li=document.createElement("li") // li er modhhe create hobe tai li desi
    li.innerHTML = ` 
                 <button id="ctgorybtnfor-select-${cat.id}" onclick="loadTreesByCategory('${cat.id}')" 
                    class="removeselected-btn w-auto md:w-full text-left px-3 py-2 rounded-md hover:bg-green-300">
                    ${cat.category_name} 
                 </button>`;
     // kisu hosse na tai na ki kora lagebe append kora lagbe
   categoryContainer.appendChild(li);
 });
}

/// active button gulo deactive korar jonn class add kore selam kothai const displayCategories=(categories) butoon er modhe "removeselected-btn" ei nam a r akhon  1ta function banabo
const removeActive= ()=>{
   const removeSelectedBtn = document.querySelectorAll(".removeselected-btn");
   console.log(removeSelectedBtn);
   // jehutu oneek gulo butoom jemon Fruit tree, flowerin tree tai loop chalate hobe
   removeSelectedBtn.forEach(btn=> btn.classList.remove("active"));
};

// 2. Load Trees by Category

const loadTreesByCategory = (id) => {
  // SPINNER kori jokhon load hobe tokhon hide hoye jabe
  manageSpnnier(true);
   // console.log(id);  // button a j ('${cat.id}') eta korle console gia oi Fruit Tree kinba all, ei button gulo clik korle id show hoi
    const url=`https://openapi.programming-hero.com/api/category/${id}`
   // console.log(url); 
   fetch(url)
   .then((res)=> res.json())
   .then((data)=> {
    //  removeActive ai function ta call korbo
    removeActive(); //remove all active button

    // akane category button a click hole secect hoye thak be se kaj
    const clickButton=document.getElementById(`ctgorybtnfor-select-${id}`)
       //console.log(clickButton)
       
       // aknon active name 1 ta class add korbo seta aber css a giye likbo jate selectroto obosthai 1 ta color pai
       clickButton.classList.add("active")// jekhane click hoise shudhu seta active rakbe

      // ei line age thekei seo displayTreesByCategory(data.plants)
      displayTreesByCategory(data.plants)


   }) 
};

const displayTreesByCategory = (plants) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = "";

  // যদি data না থাকে
  if (!plants || plants.length === 0) {
    treeContainer.innerHTML = `
      <div class="col-span-full text-center font-bold text-green-700 py-10">
       🌱 No plants available in this category 🌱 </br>Please click bellow buttons 
      </div>
    `;
    //SPINNER call
    manageSpnnier(false)
    return;
  }

  // যদি data থাকে ei khane modal er kaj kora hoise h4 a onclick="loadPlantsDetailbyModal(${plant.id})"
  plants.forEach((plant) => {
    const treeCard = document.createElement("div");
    treeCard.className = `bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition`;

    treeCard.innerHTML = `
      <div class="h-36 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
        <img src="${plant.image}" alt="${plant.name}" class="h-full w-full rounded-lg object-cover"/>
      </div>
      <h4 onclick="loadPlantsDetailbyModal(${plant.id})" class="font-semibold text-lg mb-2">${plant.name}</h4>
      <p class="text-sm text-gray-600 mb-4 line-clamp-4">${plant.description}</p>

      <div class="flex justify-between items-center mb-2">
        <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">${plant.category}</span>
        <span class="font-semibold">৳${plant.price}</span>
      </div>
        
      <button onclick='addToCart(${JSON.stringify(plant)})' class="w-full mt-2 bg-[#15803D] text-white py-2 rounded-full hover:bg-green-600">
        Add to Cart
      </button>
    `; // uporer buttone onclick add korse jate click korlei your cart a add hoi

    treeContainer.appendChild(treeCard);
  });
  // ekaneo spinner funtion call
  manageSpnnier(false)
};
//aknon oi MODAL ta load korbo eter nam hubuhu loadPlantsDetailbyModal(${plant.id})na hole kaj kore na eat actu vinnovabe korse

const loadPlantsDetailbyModal= async (id)=>{
  const url=`https://openapi.programming-hero.com/api/plant/${id}`
  //console.log(url);
  const res= await fetch(url);
  const details= await res.json();
  //console.log (details);
  displaPlantsDetailbyModal(details.plants);
};
 const displaPlantsDetailbyModal=(plant)=>{
  //console.log(plant);
  const detailsModalBox= document.getElementById("detailsmodal-container");
  // akhane modal kaj hosse
  detailsModalBox.innerHTML=`
    <h4 class="font-semibold text-lg mb-2">${plant.name}</h4>
         <div class="h-36 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
        <img src="${plant.image}" alt="${plant.name}" class="h-full w-full rounded-lg  object-cover"/>
        </div>
        <div class="flex flex-col items-start mb-2">
             <span class="inline-block bg-green-100 text-green-700 py-1 rounded">category: ${plant.category}</span>
             <span class="font-semibold">Price: ৳${plant.price}</span>
         </div>
          <p class="text-sm text-gray-600 mb-4 line-clamp-4">${plant.description}</p>
  `;
  document.getElementById("my_modal_5").showModal();
 };

 ///  <!-- SPINNER addition here -->
       const manageSpnnier=(status)=>{
       if(status== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("tree-container").classList.add("hidden");
       }else{
         document.getElementById("tree-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
       }
       };
loadCategories();

 //// selecting One Button----
fetch("https://openapi.programming-hero.com/api/category/1") // 1Fruit Trees এর সঠিক ID
  .then(res => res.json())
  .then(data => {
      displayTreesByCategory(data.plants.slice(0,3)); // শুধু 3 টা কার্ড দেখাবে
      manageSpnnier(false); // spinner hide করবে
  });


















////  akhne calculation ------- bujhano
// 1️⃣ Cart array - সব item রাখার জন্য
// let cart = []; 
// এখন cart খালি, কোন tree নেই। প্রতিটা tree এখানে object আকারে রাখা হবে।

// 2️⃣ Add to Cart function
// const addToCart = (plant) => {
  
  // 2a. Check if this plant already exists in cart
  // const existing = cart.find(item => item.id === plant.id);
  // cart.find() চেক করে plant.id কার্টে আছে কি না
  // যদি থাকে → existing হবে সেই object
  // যদি না থাকে → existing হবে undefined

  // if (existing) {
    // 2b. যদি plant আগে থেকেই থাকে, quantity ১ বাড়াও
    // existing.quantity += 1; 
    // অর্থাৎ quantity = quantity + 1
    // Cart এ duplicate object তৈরি হয় না
  // } else {
    // 2c. যদি plant নতুন হয়, cart এ push করো + quantity 1 দিয়ে
    // cart.push({
      // ...plant,       // plant object এর সব property এখানে নিয়ে আসো
      // quantity: 1     // নতুন add হলে quantity শুরু হবে 1 থেকে
  //   });
  // }

  // 3️⃣ Update UI
//   updateCartUI();
// };

// 3️⃣ Remove from Cart
// const removeFromCart = (id) => {
  // filter দিয়ে ওই item বাদ দাও
  // cart = cart.filter(item => item.id !== id);

  // UI update
  // updateCartUI();
// };

// 4️⃣ Update Cart UI
// const updateCartUI = () => {
//   const cartContainer = document.getElementById("cart-items");
//   const cartTotal = document.getElementById("cart-total");

  // আগের সব clear
  // cartContainer.innerHTML = "";

  // let total = 0; // মোট দাম হিসাবের জন্য

  // cart.forEach(item => {
//     total += item.price * item.quantity; // price * quantity

//     const li = document.createElement("li");
//     li.className = "flex justify-between items-center bg-gray-50 p-3 rounded-md";

//     li.innerHTML = `
//       <div>
//         <p class="font-medium">${item.name}</p>
//         <p class="text-gray-500 text-xs">৳${item.price} × ${item.quantity}</p>
//       </div>
//       <button onclick="removeFromCart(${item.id})"
//         class="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200">✕</button>
//     `;

//     cartContainer.appendChild(li);
//   });

//   cartTotal.innerText = `৳${total}`;
// };

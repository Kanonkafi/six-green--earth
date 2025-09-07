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
            <button onclick="loadTreesByCategory('all', this)"
                class="w-full text-left px-3 py-2 rounded-md hover:bg-green-300">
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
                    class="w-full text-left px-3 py-2 rounded-md hover:bg-green-300">
                    ${cat.category_name} 
                 </button>`;
     // kisu hosse na tai na ki kora lagebe append kora lagbe
   categoryContainer.appendChild(li);
 });
}


// 2. Load Trees by Category

const loadTreesByCategory = (id) => {
   // console.log(id);  // button a j ('${cat.id}') eta korle console gia oi Fruit Tree kinba all, ei button gulo clik korle id show hoi
    const url=`https://openapi.programming-hero.com/api/category/${id}`
   // console.log(url); 
   fetch(url)
   .then((res)=> res.json())
   .then((data)=> {
    // akane category button a click hole secect hoye thak be se kaj
    const clickButton=document.getElementById(`ctgorybtnfor-select-${id}`)
       //console.log(clickButton)
       
       // aknon active name 1 ta class add korbo seta aber css a giye likbo jate selectroto obosthai 1 ta color pai
       clickButton.classList.add("active")

      // ei line age thekei seo displayTreesByCategory(data.plants)
      displayTreesByCategory(data.plants)


   }) //ei plants ta kintu api er
//   toggleSpinner(true);

//   
// 
//     .then((data) => {
//       displayTrees(data.plants);
//       toggleSpinner(false);

//       // Active Button highlight
//       document.querySelectorAll("#category-container button")
//         .forEach((b) => b.classList.remove("bg-green-600", "text-white"));
//       btn.classList.add("bg-green-600", "text-white");
//     });
};

const displayTreesByCategory = (plants) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = "";

  // যদি data না থাকে
  if (!plants || plants.length === 0) {
    treeContainer.innerHTML = `
      <div class="col-span-full text-center text-gray-500 py-10">
        No plants available in this category 🌱
      </div>
    `;
    return;
  }

  // যদি data থাকে
  plants.forEach((plant) => {
    const treeCard = document.createElement("div");
    treeCard.className =`
      "bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"`;

    treeCard.innerHTML = `
      <div class="h-36 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
        <img src="${plant.image}" alt="${plant.name}" class="h-full w-full object-cover"/>
      </div>
      <h4 class="font-semibold text-lg mb-2">${plant.name}</h4>
      <p class="text-sm text-gray-600 mb-4 line-clamp-4">${plant.description}</p>

      <div class="flex justify-between items-center mb-2">
        <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">${plant.category}</span>
        <span class="font-semibold">৳${plant.price}</span>
      </div>

      <button class="w-full mt-2 bg-green-600 text-white py-2 rounded-full hover:bg-green-700">
        Add to Cart
      </button>
    `;

    treeContainer.appendChild(treeCard);
  });
};

loadCategories();
const loadAllpets = async() => {
    const uri = 'https://openapi.programming-hero.com/api/peddy/pets';
    const res = await fetch(uri);
    const data = await res.json();
    showAllpets(data.pets);
    // console.log(data);
}

const loadAllCategories = async() => {
    const uri = 'https://openapi.programming-hero.com/api/peddy/categories';
    const res = await fetch(uri);
    const data = await res.json();
    showCategoriesButton(data.categories);
}


// const loadBycategories = async(category) => {
//   const uri = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
//   const res = await fetch(uri);
//   const info = await res.json();
//   document.getElementById(`btn-${categories.category}`).classList.add('active');
//   showAllpets(info.data);
//   // console.log(info.data)
// }
const loadBycategories = (category) => {
   fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  .then ((res) => res.json())
  .then ((info) => {
    removeActive();
    document.getElementById(`btn-${category}`).classList.add('active');
    showAllpets(info.data);
  })

  .catch((error) => console.log(error))

  // console.log(info.data)
}

const removeActive = () => {
  const button = document.getElementsByClassName('btn-category');
  for(let btn of button) {
    btn.classList.remove('active')
  }
}

const showAllpets = (data) => {
    // console.log(data)
    const petContainer = document.getElementById('pet-list');
    petContainer.innerHTML = "";
    if(data.length == 0) {
      petContainer.classList.remove('grid');
      petContainer.innerHTML = `
      <div class = "flex flex-col gap-5 justify-center items-center mb-10 mt-10">
      <div>
      <img src="images/error.webp" />
      </div>
      <div class = "flex flex-col gap-2 justify-center">
      <h2 class = "text-2xl font-bold text-center">No Information Available</h2>
      <p class = "text-sm text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      <br>its layout. The point of using Lorem Ipsum is that it has a.</p>
      </div>
      </div>
      `

    }

    else {
      petContainer.classList.add('grid')
    }
    data.forEach((data) => {
        const div = document.createElement('div')
        div.innerHTML = ` 
        <div class="card border border-gray-400">
  <figure class="px-4 pt-4">
    <img
      src="${data.image}"
      alt="${data.pet_name}"
      class="rounded-xl w-[400px] h-[300px] object-cover" />
  </figure>
  <div class="card-body pt-2 pl-4 items-left text-left pb-0">
  <h2 class = "text-2xl font-bold">${data.pet_name}</h2>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=40&id=_qwH4IBPWmqO&format=png" /></div>
    <p> Breed : ${data.breed}</p>

  </div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=80&id=GlEOr5x0aJpH&format=png" /></div>
    <p> Birth : ${data.date_of_birth}</p>

  </div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=50&id=1665&format=png" /></div>
    <p> Gender : ${data.gender}</p>

  </div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=80&id=44366&format=png" /></div>
    <p> Price : ${data.price}💲</p>

  </div>
  </div>
  <div class="divider divider-primary px-4"></div>

  <div class = "grid grid-cols-3 justify-between pl-10 pb-4">
  <div>  <button onclick = "likeButton('${data.image}')"  class = "btn btn-sm "><img class= "w-6 h-6" src="https://img.icons8.com/?size=80&id=114072&format=png" /></button></div>
  <div>  <button class = "btn btn-sm ">Adopt</button></div>
  <div>  <button onclick = "loadDetails(${data.petId})" class = "btn btn-sm ">Details</button></div>
  </div>

  </div>
    
        `
        petContainer.append(div);
    })

}

const likeButton = (data) => {
  const container2 = document.getElementById('cart-list');
  const div = document.createElement('div');
  div.classList.add('m-0', 'p-0')
  div.innerHTML = `
  <img class =  "w-50% h-100% object-cover m-0 p-0"  src = "${data}" />
  `
  container2.appendChild(div)
}





const showCategoriesButton = (categories) => {
    const buttonContainer = document.getElementById('categories');
    categories.forEach((categories)=> {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.innerHTML = `
        <div>
        <button id = "btn-${categories.category}" onclick = "loadBycategories('${categories.category}')" class= "btn btn-category"> <img class = "h-8 w-8" src="${categories.category_icon}" /> ${categories.category}</button>
        </div>
        `;
        
        buttonContainer.append(buttonsDiv);

        // console.log(categories);
    })
}

const loadDetails = async(id) => {

  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(uri);
  const data = await res.json();
  clickModal(data);

}

const clickModal = (detail) => {
  console.log(detail)
  const modalDiv = document.getElementById('modal-div')
  modalDiv.innerHTML = "";
  document.getElementById('modalButton').click();
  const div = document.createElement('div');
  div.innerHTML = `
  <img class = "w-full h-[300px] object-cover" src = "${detail.petData.image}" />
  <h1 class = "text-3xl font-bold mt-5">${detail.petData.pet_name}</h1>
  <div class = "grid grid-cols-2 gap-2 mt-4 mb-2">
  <div >
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=40&id=_qwH4IBPWmqO&format=png" /></div>
    <p> Breed : ${detail.petData.breed}</p>

  </div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=80&id=GlEOr5x0aJpH&format=png" /></div>
    <p> Birth : ${detail.petData.date_of_birth}</p>

  </div>
  </div>
  <div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=50&id=1665&format=png" /></div>
    <p> Gender : ${detail.petData.gender}</p>

  </div>
  <div class = "flex items-center gap-2">
  <div>  <img class= "h-5 w-5" src= "https://img.icons8.com/?size=80&id=44366&format=png" /></div>
    <p> Price : ${detail.petData.price}💲</p>

  </div>
  </div>
  </div>

  <h2 class = "text-2xl font-bold mb-2">Detail information</h2>
  <p class = "text-sm">${detail.petData.pet_details}</p>
  `
  modalDiv.append(div)
}



loadAllpets();
loadAllCategories();
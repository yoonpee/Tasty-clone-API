const form = document.querySelector('form');
const input = form.querySelector('input');
const result = document.querySelector('.search-result');
const cont = document.querySelector('.loading');

const API_ID = "7c5e1a13";
const API_KEYS = "7ac1f21706e4adfe2ecb762407ab5b60";

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    input.value = '';
    console.log(searchQuery);
    fetchAPI();
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEYS}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    generateHTML(data.hits);
}

function generateHTML(re){
    cont.classList.add('remover');
    let generatedHTML = '';
    re.map(ee =>{
        generatedHTML += 
        `
         <div class="item"> 
           <p class="pimg"><img src="${ee.recipe.image}" alt=""></p>
           <div class="flex-item">
               <h2 class="title">${ee.recipe.label}</h2>
               <a href="${ee.recipe.url}" target="_blank" class="btn">Check The recipe</a>
           </div>
           <p>Calories:${Math.floor(ee.recipe.calories)}</p>
           <p>Diet labels:${ee.recipe.dietLabels.length > 0 ? ee.recipe.dietLabels : ee.recipe.dietLabels = "No data found"}</p>
         </div>

        `
        
    })
    result.innerHTML = generatedHTML;
}
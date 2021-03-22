let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderAllToys(){
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyObject => {toyObject.forEach(toy =>          {renderToyCard(toy)})
  })
}

function renderToyCard(toyObject) {

  const toyCard = document.createElement('div')
  toyCard.dataset.id = toyObject.id
  toyCard.classList.add('card')
  
  toyCard.innerHTML = `
      <h2>${toyObject.name}</h2>
      <img src=${toyObject.image} class="toy-avatar" />
      <p>${toyObject.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      
  const toyCollection = document.querySelector('div#toy-collection')
  toyCollection.append(toyCard)

}

const newToyForm = document.querySelector('form.add-toy-form')

newToyForm.addEventListener('submit', function(event) {
  event.preventDefault()

  const name = event.target[0].value
  const image = event.target[1].value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: 
  {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },

  body: JSON.stringify({ name, image, likes: 0 })

  })
  .then(response => response.json())
  .then(newToyObject => {
    renderToyCard(newToyObject)
  })
  newToyForm.reset()

})

const toyCollection = document.querySelector('div#toy-collection')

toyCollection.addEventListener('click', function(event) {
 const toyCard = event.target.closest('div')
  const likesPtag = event.target.previousElementSibling
  const likesNum = parseInt(likesPtag.textContent) + 1
 

  fetch(`http://localhost:3000/toys/${toyCard.dataset.id}`, {
    method: 'PATCH',
    headers: 
  {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },

  body: JSON.stringify({ likes: likesNum })

  })
  .then(response => response.json())
  .then(newToyObject =>  
    {likesPtag.textContent = `${newToyObject.likes} Likes`})

})



// app init
renderAllToys()
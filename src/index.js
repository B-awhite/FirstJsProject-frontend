let editMode = false
const beachesAdapter = new BeachesAdapter("http://localhost:3000")

document.addEventListener("DOMContentLoaded", () => {
    addCreateForm();
    beachesAdapter.getBeaches();
    // fetchBeaches();
    // listenEdit();
    listenEditDelete();
})


function addCreateForm() {
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form")
    form.innerHTML = `<input id="name-input" placeholder='Name' type='text'/><input id="country-input" placeholder='Country' type='text'/><input id="beach-submit" value="Add Beach" type='submit'/>`
    formContainer.append(form)

    form.addEventListener("submit", addBeach)
}

function addBeach(event) {
    event.preventDefault()
    const nameInput = event.target.children[0]
    const countryInput = event.target.children[0]
    if (editMode){
        beachesAdapter.editBeach(editMode, nameInput)
        
    } else {
        beachesAdapter.createBeach(nameInput)
    
    }
}

function newBeach(beach) {
    const beachesContainer = document.getElementById("beaches-container");
    beachesContainer.innerHTML += `<li data-id=${beach.id}><span>${beach.name}, ${beach.country}</span> <button data-action='edit'>Edit</button> <button data-action='delete'>X</button></li><br>`
}

// function listenEdit() {
//     const beachesContainer = document.getElementById("beaches-container");
//     beachesContainer.addEventListener("click", editBeach)
// }

// function editBeach(event) {
//     if (event.target.dataset.action === "edit"){
//         const li = event.target.parentElement
//         editMode = li
//         fetch(`http://localhost:3000/api/v1/beaches/${li.dataset.id}`, {
//             method: "PATCH"
//         })
//     }
// }

function listenEditDelete() {
    const beachesContainer = document.getElementById("beaches-container");
    beachesContainer.addEventListener("click", editDeleteBeach)
}

function editDeleteBeach(event) {
    const li = event.target.parentElement
    if (event.target.dataset.action === "delete"){
        beachesAdapter.deleteBeach(li)
        
    } else if (event.target.dataset.action === "edit"){
        editMode = li 
        document.getElementById('beach-submit').value = "Update Beach"
        document.getElementById('name-input').value = li.children[0].innerText
        document.getElementById('country-input').value = li.children[0].innerText
    }
}


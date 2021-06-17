let editMode = false
const beachesAdapter = new BeachesAdapter("http://localhost:3000")

document.addEventListener("DOMContentLoaded", () => {
    addCreateForm();
    beachesAdapter.getBeaches();
    listenEditDelete();
})


function addCreateForm() {
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form")
    form.innerHTML = `<input id="name-input" placeholder='Name' type='text'/><input id="country-input" placeholder='Country' type='text'/><input id="beach-submit" value="Create Beach" type='submit'/>`
    formContainer.append(form)

    form.addEventListener("submit", addBeach)
}

function addBeach(event) {
    event.preventDefault()
    const nameInput = event.target.children[0]
    const countryInput = event.target.children[1]
    if (editMode){
        beachesAdapter.editBeach(editMode, nameInput, countryInput)
        
    } else {
        beachesAdapter.createBeach(nameInput, countryInput)
    }
}

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
        document.getElementById('country-input').value = li.children[1].innerText
    }
}


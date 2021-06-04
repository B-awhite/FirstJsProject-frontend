document.addEventListener("DOMContentLoaded", () => {
    addCreateForm();
    fetchBeaches();
})



function fetchBeaches() { 
    const beachesContainer = document.getElementById("beaches-container")
    fetch("http://localhost:3000/api/v1/beaches")
    .then(r => r.json())
    .then(data => {
       data.forEach(function(beach){
           beachesContainer.innerHTML += `<li>${beach.name}</li>`
       })
    })
    .catch(err => console.warn(err))
}

function addCreateForm() {
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form")
    form.innerHTML = `<input placeholder='Name' type='text'/><input placeholder='County' type='text'/><input value="Add Beach" type='submit'/>`
    formContainer.append(form)

    form.addEventListener("submit", addBeach)

}

function addBeach(event) {
    event.preventDefault()
    const nameInput = event.target.children[0]
    
    fetch("http://localhost:3000/api/vi/beaches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value
        })
    })
}
document.addEventListener("DOMContentLoaded", () => {
    addCreateForm();
    fetchBeaches();
    listenDelete();
})



function fetchBeaches() { 
    const beachesContainer = document.getElementById("beaches-container")
    fetch("http://localhost:3000/api/v1/beaches")
    .then(r => r.json())
    .then(data => {
       data.forEach(addBeach)
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
    const countryInput = event.target.children[0]

    fetch("http://localhost:3000/api/v1/beaches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            country: countryInput.value
        })
    })
    .then(response => response.json())
    .then(info => {
        console.log("Created not saved", info)
        if (info.status === 201){
            addBeach(info.beach)
        } else {
            alert(info.errors)
        }
    })
    .catch(err => console.error("Not created", err))
}

function addBeach(beach) {
    const beachesContainer = document.getElementById("beaches-container");
    beachesContainer.innerHTML += `<li data-id=${beach.id}>${beach.name} ${beach.country} <button data-action='delete'>X</button></li>`
}

function listenDelete() {
    const beachesContainer = document.getElementById("beaches-container");

    beachesContainer.addEventListener("click", deleteBeach)
}

function deleteBeach(event) {
    if (event.target.dataset.action === "delete"){
        const li = event.target.parentElement

        fetch(`http://localhost:3000/api/v1/beaches/${li.dataset.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message === "Beach deleted"){
                li.remove()
            } else {
                alert(data.message)
            }
        })
        .catch(err => console.error(err))
    } 
}
let editMode = false

document.addEventListener("DOMContentLoaded", () => {
    addCreateForm();
    fetchBeaches();
    // listenEdit();
    listenEditDelete();
})


function fetchBeaches() { 
    const beachesContainer = document.getElementById("beaches-container")

    fetch("http://localhost:3000/api/v1/beaches")
    .then(r => r.json())
    .then(data => {
       data.forEach(newBeach)
    })
    .catch(err => console.warn(err))
}

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
        fetch(`http://localhost:3000/api/v1/beaches/${editMode.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                country: countryInput.value
            })
        })
        .then(resp => resp.json())
        .then(info => {
            if (info.status === 200) {
              editMode.children[0].innerText = info.beach.name
              editMode = false
              document.getElementById('beach-submit').value = "Create Beach"
              nameInput.value = ""
            } else {
                alert(info.errors)
            }
        })
        .catch(err => console.error(err))
    } else {
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
              newBeach(info.beach)
          } else {
              alert(info.errors)
          }
          nameInput.value = ""
      })
      .catch(err => console.error("Not created", err))
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
    } else if (event.target.dataset.action === "edit"){
        editMode = li 
        document.getElementById('beach-submit').value = "Update Beach"
        document.getElementById('name-input').value = li.children[0].innerText
        document.getElementById('country-input').value = li.children[0].innerText
    }
}

// function deleteBeach(event) {
//     if (event.target.dataset.action === "delete"){
//         const li = event.target.parentElement

//         fetch(`http://localhost:3000/api/v1/beaches/${li.dataset.id}`, {
//             method: "DELETE"
//         })
//         .then(resp => resp.json())
//         .then(data => {
//             if (data.message === "Beach deleted"){
//                 li.remove()
//             } else {
//                 alert(data.message)
//             }
//         })
//         .catch(err => console.error(err))
//     } 
// }
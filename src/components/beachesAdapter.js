class BeachesAdapter {
    constructor(baseURL){
        this.baseBeachURL = `${baseURL}/api/v1/beaches`
    }
    getBeaches(){
        fetch(this.baseBeachURL)
        .then(r => r.json())
        .then(beaches => console.log(beaches))
        .catch(error => console.log(error))

        // function fetchBeaches() { 
        //     // const beachesContainer = document.getElementById("beaches-container")
        
        //     fetch("http://localhost:3000/api/v1/beaches")
        //     .then(r => r.json())
        //     .then(data => {
        //        data.forEach(newBeach)
        //     })
        //     .catch(err => console.warn(err))
        // }
    }

    editBeach(editMode, nameInput){
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
            //   editMode.children[0].innerText = info.beach.name
            //   editMode = false
            //   document.getElementById('beach-submit').value = "Create Beach"
            //   nameInput.value = ""
            } else {
                alert(info.errors)
            }
        })
        .catch(err => console.error(err))
    }

    createBeach(nameInput){
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
            //   newBeach(info.beach)
          } else {
              alert(info.errors)
          }
          nameInput.value = ""
      })
      .catch(err => console.error("Not created", err))
    }
    deleteBeach(li){
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
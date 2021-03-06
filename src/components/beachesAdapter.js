class BeachesAdapter {

    constructor(baseURL){
        this.baseBeachURL = `${baseURL}/api/v1/beaches`
    }

    getBeaches() {
        fetch(this.baseBeachURL)
        .then(r => r.json())
        .then(beaches => { 
            beaches.forEach(beach => {
                const b = new Beach(beach)
                b.addToDom()
            })
        })
        .catch(err => console.error(err))

    }

    editBeach(editMode, nameInput, countryInput){
        fetch(`${this.baseBeachURL}/${editMode.dataset.id}`, {
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
              editMode.children[1].innerText = info.beach.country
              editMode = false
              document.getElementById('beach-submit').value = "Create Beach"
              nameInput.value = ""
              countryInput.value = ""
            } else {
                alert(info.errors)
            }
        })
        .catch(err => console.error(err))
    }

    createBeach(nameInput, countryInput){
        fetch(this.baseBeachURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
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
             const b = new Beach(info.beach)
             b.addToDom()
          } else {
              alert(info.errors)
          }
          nameInput.value = ""
          countryInput.value = ""
      })
      .catch(err => console.error("Not created", err))
    }

    deleteBeach(li){
        fetch(`${this.baseBeachURL}/${li.dataset.id}`, {
            method: "DELETE"
        })
        .then(resp => {
            console.log(resp)
            return resp.json()
        })
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
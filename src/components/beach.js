class Beach {

    constructor({id, name, country, comments}) {
        this.id = id
        this.name = name
        this.country = country 
        this.comments = comments.map(c => new Comment(c))
    }

    // render(){
    //     const beachesContainer = document.getElementById("beaches-container");
    //     beachesContainer.innerHTML += `<li data-id=${this.id}>
    //         <span>${this.name}</span>, <span>${this.country}</span>
    //         <button data-action='edit'>Edit</button>
    //         <button data-action='delete'>X</button>
    //         </li><br>`
    // }
    render(){
        return(`<li id="beach-${this.id}" data-id=${this.id}>
                <span>${this.name}</span>, <span>${this.country}</span>
                <button data-action='edit'>Edit</button> 
                <button data-action='delete'>X</button>
                <br>
                <button data-action='display'>Comments</button>
                <br>
                <br>
            </li>`
        )
    }

    addToDom(){
        const beachesContainer = document.getElementById("beaches-container");
        beachesContainer.innerHTML += this.render()
    }


    renderComments(){
        const li = document.getElementById(`beach-${this.id}`)
        const ul = document.createElement('ul')

        this.comments.forEach(c => ul.innerHTML += c.render())
        li.append(ul)
        currentProducts = ul
    }
}
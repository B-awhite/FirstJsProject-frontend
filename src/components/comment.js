class Comment {

    static all = []

    constructor({id, content, beach_id}){
        this.id = id
        this.content
        this.beach_id = beach_id

        Product.all.push(this)
    }

    render(){
        return(
            `<li data-id=${this.id}>${this.content} <button data-action="comments">Add Comment</button></li>`
        )
    }
}
class Comment {

    static all = []

    constructor({id, content, beach_id}){
        this.id = id
        this.content - content
        this.beach_id = beach_id

        Comment.all.push(this)
    }

    render(){
        return(
            `<li data-id=${this.id}>${this.content} <button data-action="comments">Add Comment</button></li>`
        )
    }
}
export default class Todo {
    id = Date.now()

    constructor (title, desc, dueDate, priority) {
        this.title = title
        this.desc = desc
        this.dueDate = dueDate
        this.priority = priority
    }

    get title() {
        return this._title
    }
    set title(newTitle) {
        this._title = newTitle
    }

    get desc() {
        return this._desc
    }
    set desc(newDesc) {
        this._desc = newDesc
    }

    get dueDate() {
        return this._dueDate
    }
    set dueDate(newDueDate) {
        this._dueDate = newDueDate
    }

    get priority() {
        return this._priority
    }
    set priority(newPriority) {
        this._priority = newPriority
    }

    get id() {
        return this._id
    }

    toJSON() {
        return {
            title: this.title,
            desc: this.desc,
            dueDate: this.dueDate,
            priority: this.priority,
            id: this.id
        }
    }
}
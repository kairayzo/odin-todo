import todoList from "..";


export default function listProjects() {
    const arr = []
    for (const idx in todoList) {
        arr.push(Object.keys(todoList[idx])[0])
    }
    
    return arr
}

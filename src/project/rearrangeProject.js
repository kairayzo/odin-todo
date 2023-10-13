import todoList from "..";
import getProjectIdx from "./getProjectIdx";

export default function rearrangeProject(oldIdx,newIdx) {
    const projectObj = todoList[oldIdx]
    todoList.splice(oldIdx,1)
    todoList.splice(newIdx,0,projectObj)
}
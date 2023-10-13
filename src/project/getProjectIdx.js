import todoList from "..";
import listProjects from "./listProjects";

export default function getProjectIdx(projectName) {
    const projList = listProjects()
    for (const idx in projList) {
        if (projList[idx] == projectName) {
            return idx
        }
    }
}
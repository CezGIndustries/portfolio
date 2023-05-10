export let LANG = "fr";
export function setLang(lang) {
    LANG = lang;
}

export let CURRENT_FOLDER = [];
export function setCurrentFolder(folder) {
    CURRENT_FOLDER = folder;
}

export const cmdInput = document.getElementById("cmd-input-text-input");
export const cmdContent = document.getElementById("cmd-content-container")
export const cmdFolder = document.getElementById("cmd-input-folder");
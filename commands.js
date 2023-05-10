import { fileTree } from "./filetree.js";
import { LANG, CURRENT_FOLDER, setCurrentFolder } from "./globalelements.js";


// Command for the cmd

export const commands = {
    "help": {
        "available": true,
        "name": {
            "en": "help",
            "fr": "help"
        },
        "description": {
            "en": "Display all commands",
            "fr": "Affiche toutes les commandes"
        },
        "function": commandHelp,
    },
    "cd": {
        "available": true,
        "name": {
            "en": "cd [folder]",
            "fr": "cd [dossier]"
        },
        "description": {
            "en": "Change the current folder</br>\
            .. to go back to the parent folder</br>\
            If no folder is specified, go back to the root folder",
            "fr": "Change le dossier courant</br>\
            .. pour retourner au dossier parent</br>\
            Si aucun dossier n'est spécifié, retourne au dossier racine"
        },
        "function": commandCd,
    },
    "clear": {
        "available": false,
        "name": {
            "en": "clear",
            "fr": "clear"
        },
        "description": {
            "en": "Clear the terminal",
            "fr": "Efface le terminal"
        },
        "function": commandClear,
    },
    "ls": {
        "available": true,
        "description": {
            "en": "List all files and folders in the current folder",
            "fr": "Liste tous les fichiers/dossiers du dossier courant"
        },
        "function": commandLs,
    },
}

function commandHelp(argumentTab) {
    if (argumentTab.length > 0) {
        return badResponse("Too many arguments");
    }
    let help = "Commandes:</br>";
    for (const command in commands) {
        if (!commands[command].available) { continue };
        help += ` - ${command} - ${commands[command].description[LANG]}</br>`;
    }
    return goodResponse(help);
}

function commandCd(argumentTab) {
    if (argumentTab.length > 1) {
        return badResponse("Too many arguments");
    }
    if (argumentTab.length === 0) {
        setCurrentFolder([]);
        return goodResponse("");
    }
    if (argumentTab[0] === "..") {
        setCurrentFolder(CURRENT_FOLDER.slice(0, -1));
        return goodResponse("");
    }
    if (argumentTab[0] === ".") {
        return goodResponse("");
    }
    if (CURRENT_FOLDER.length === 0 && argumentTab[0] in fileTree) {
        if (fileTree[argumentTab[0]].type === "folder") {
            setCurrentFolder([argumentTab[0]]);
            return goodResponse("");
        } else {
            return badResponse("Not a folder")
        }
    }
    return badResponse("Folder not found")
}

function commandClear(argumentTab) {
    return {
        "text": "clear",
        "error": false,
    };
}

function commandLs(argumentTab) {
    if (argumentTab.length > 0) {
        return badResponse("Too many arguments");
    }
    let ls = "";
    if (CURRENT_FOLDER.length === 0) {
        for (const file in fileTree) {
            if (typeof fileTree[file].type === "undefined") { continue; }
            if (fileTree[file].type === "folder") {
                ls += "📁 ";
            } else {
                ls += "📄 ";
            }
            ls += `${file}</br>`;
        }
        return goodResponse(ls);
    }
    for (const file in fileTree[CURRENT_FOLDER[0]]) {
        if (typeof fileTree[CURRENT_FOLDER[0]][file].type === "undefined") { continue; }
        if (fileTree[CURRENT_FOLDER[0]][file].type === "folder") {
            ls += "📁 ";
        } else {
            ls += "📄 ";
        }
        ls += `${file}</br>`;
    }
    return goodResponse(ls);
}

// Response for the cmd

function goodResponse(text) {
    return {
        "text": text,
        "error": false,
    };
}

function badResponse(text) {
    return {
        "text": text,
        "error": true,
    };
}
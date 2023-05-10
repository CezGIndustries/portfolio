import { commands } from "./commands.js";
import { CURRENT_FOLDER, cmdContent, cmdInput, cmdFolder } from "./globalelements.js";

cmdFolder.innerHTML = CURRENT_FOLDER.join("/");

cmdInput.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "Enter":
            const userInput = this.value;
            const userInputTab = userInput.split(" ");
            const command = userInputTab.shift();
            if (command in commands && commands[command].available) {
                const response = commands[command].function(userInputTab);
                addOutputLine(
                    userInput,
                    response["text"],
                    response["error"]
                );
            } else {
                addOutputLine(
                    userInput,
                    `Command not found: ${command}`,
                    true
                );
            }
            this.value = "";
            cmdFolder.textContent = CURRENT_FOLDER.join("/");
            break;
        case "ArrowUp":
            e.preventDefault();
            break;
        case "ArrowDown":
            e.preventDefault();
            break;
        case "Tab":
            e.preventDefault();
            break;
        default:
            // console.log(e.key);
            break;
    }
});

function addOutputLine(command, text, error = false) {
    cmdContent.innerHTML += `\
    <div class="cmd-content-output cmd-content-both">\
        <div class="cmd-content-output-line">\
            <span>Vernet Benjamin/${CURRENT_FOLDER}> ${command}</span>\
        </div>\
        <div class="cmd-content-output-text">\
            <span class="cmd-content-output-error-${error}">${text}</span>\
        </div>\
    </div>\
    `;
    cmdContent.scrollTop = cmdContent.scrollHeight;
};
const language = ["FR", "EN"]

const commands = {

}

function getLanguage() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=")
        if (cookie[0] == "language") {
            return cookie[1]
        }
    }
    return null
}

function setLanguage() {

}

function addUserInput() {
    const user_input = document.getElementById('user-input')
    user_input.addEventListener("keydown", (e) => {
        const user_input_value = document.getElementById('user-input').value
        switch (e.key) {
            case "Enter":
                if (user_input_value !== "") {
                    const cmd_response = document.getElementById("cmd-responses")
                    const element = createElement("div", "cmd-out", user_input_value)
                    cmd_response.replaceChildren(element, ...cmd_response.children)
                }
                break;
            case "Tab":
                e.preventDefault()
                break;
            case "ArrowUp":
                console.log("Up")
                break;
            case "ArrowDown":
                console.log("Down")
                break;
        }
    })
}

function createElement(type, classes, value) {
    const element = document.createElement(type)
    element.classList.add(classes)
    element.textContent = value
    return element
}

addUserInput()


// language.includes(onPage())
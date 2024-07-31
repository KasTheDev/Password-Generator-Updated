const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=",
    "{","[","}","]",",","|",":",";","<",">",".","?","/"
]

let generateBtn = document.getElementById("generate-btn")
let passwordOne = document.getElementById("password-one")
let passwordTwo = document.getElementById("password-two")
let toggleSymbols = document.getElementById("toggle-symbols")
let toggleNumbers = document.getElementById("toggle-numbers")
let passwordLengthInput = document.getElementById("password-length")

generateBtn.addEventListener("click", () => {
    let length = parseInt(passwordLengthInput.value, 10)
    if (isNaN(length) || length < 1) {
        length = 15
    }
    passwordOne.textContent = generatePassword(length)
    passwordTwo.textContent = generatePassword(length)
})

passwordOne.addEventListener("click", () => {
    if (passwordOne.textContent.trim()) {
        copyToClipboard(passwordOne.textContent, "Password one copied.")
    } else {
        alert("No password to copy.")
    }
})

passwordTwo.addEventListener("click", () => {
    if (passwordTwo.textContent.trim()) {
        copyToClipboard(passwordTwo.textContent, "Password two copied.")
    } else {
        alert("No password to copy.")
    }
})

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length)
}

function generatePassword(length) {
    let filteredCharacters = getFilteredCharacters()
    let password = ""
    for (let i = 0; i < length; i++) {
        password += filteredCharacters[getRandomIndex(filteredCharacters)]
    }
    return password
}

function getFilteredCharacters() {
    if (toggleSymbols.checked && toggleNumbers.checked) {
        return characters
    } else if (toggleSymbols.checked) {
        return characters.filter(char => isNaN(char))
    } else if (toggleNumbers.checked) {
        return characters.filter(char => /[\d]/.test(char) || /[A-Za-z]/.test(char))
    } else {
        return characters.filter(char => /[A-Za-z]/.test(char))
    }
}

function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        alert(message)
    }).catch(err => {
        console.error('Failed to copy: ', err)
    })
}

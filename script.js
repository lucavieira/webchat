let addButton = document.getElementById("addButton")
let fieldContacts = document.getElementById("fieldContacts")
let contacts = document.getElementsByClassName('contact')

for(let index = 1; index <= localStorage.length; index++) {
    let contact = localStorage.getItem(`contact-${index}`)

    fieldContacts.insertAdjacentHTML('beforeend', contact)
}

addButton.addEventListener('click', () => {
    let newContact = document.createElement('div')
    newContact.classList.add('contact')
    newContact.id = localStorage.length

    let perfilImage = document.createElement('img')

    let genre = prompt('Are you man or woman?').toLowerCase()
    
    while(genre != "man" && genre != "woman") {
        genre = prompt('Are you man or woman?')
    }

    let name = prompt("What's your name?")

    perfilImage.src = `assets/images/user-${genre}.png`
    perfilImage.classList.add("perfil-image")

    let contactName = document.createElement('h3')
    contactName.classList.add('contact-name')
    contactName.innerHTML = name

    newContact.appendChild(perfilImage)
    newContact.appendChild(contactName)

    newContact.addEventListener('click', fieldChat)

    localStorage.setItem(`contact-${localStorage.length + 1}`, newContact.outerHTML)

    fieldContacts.appendChild(newContact)
})

const fieldChat = () => {
    alert('OK')
}

for(let contact of contacts) {
    contact.addEventListener('click', fieldChat)
}
let addButton = document.getElementById("addButton")
let fieldContacts = document.getElementById("fieldContacts")

addButton.addEventListener('click', () => {
    let newContact = document.createElement('div')
    newContact.classList.add('contact')

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

    fieldContacts.appendChild(newContact)
})
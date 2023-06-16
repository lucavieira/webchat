let addButton = document.getElementById("addButton")
let fieldContacts = document.getElementById("fieldContacts")
let contacts = document.getElementsByClassName('contact')

for(let index = 1; index <= localStorage.length; index++) {
    let contact = localStorage.getItem(`contact-${index}`)

    fieldContacts.insertAdjacentHTML('beforeend', contact)
}

addButton.addEventListener('click', () => {
    let name = prompt("What's your name?")
    let number = prompt("What's your phone number?")

    let idContactNumber = document.getElementById(number)

    if(idContactNumber == null || number != idContactNumber.id) {
        let newContact = document.createElement('div')
        newContact.classList.add('contact')
        newContact.id = localStorage.length
    
        let perfilImage = document.createElement('img')
    
        perfilImage.src = `assets/images/user.png`
        perfilImage.classList.add("perfil-image")
    
        let fieldInformations = document.createElement('div')
        fieldInformations.classList.add('informations')
    
        let contactName = document.createElement('h3')
        contactName.classList.add('contact-name')
        contactName.innerHTML = name
    
        let contactNumber = document.createElement('span')
        contactNumber.classList.add('contact-number')
        contactNumber.id = number
        contactNumber.innerHTML = number

        let fieldActions = document.createElement('div')
        fieldActions.classList.add('actions')

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('delete')
        deleteButton.addEventListener('click', () => deleteContact(number))

        let editButton = document.createElement('button')
        editButton.src = "./assets/images/edit-icon.png"
        editButton.classList.add('edit')
        editButton.addEventListener('click', editContact)

        fieldActions.appendChild(deleteButton)
        fieldActions.appendChild(editButton)
    
        fieldInformations.appendChild(contactName)
        fieldInformations.appendChild(contactNumber)
    
        newContact.appendChild(perfilImage)
        newContact.appendChild(fieldInformations)
        newContact.appendChild(fieldActions)
    
        newContact.addEventListener('click', fieldChat)
    
        localStorage.setItem(`contact-${localStorage.length + 1}`, newContact.outerHTML)
    
        fieldContacts.appendChild(newContact)
    } else {
        alert('Este número ja existe')
    }

})

const fieldChat = () => {
    alert('OK')
}

const deleteContact = (idNumber) => {
    let contact = document.getElementById(idNumber)
    let contactErased = localStorage.key(contact)
    localStorage.removeItem(contactErased)
    location.reload()
}

const editContact = () => {
    alert('edit')
}

for(let contact of contacts) {
    contact.addEventListener('click', fieldChat)
}
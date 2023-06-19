let addButton = document.getElementById("addButton")
let fieldContacts = document.getElementById("fieldContacts")
let contacts = document.getElementsByClassName('contact')
let actionDelete = document.getElementsByClassName('delete')
let actionEdit = document.getElementsByClassName('edit')

let listContacts = []

for(let index = 0; index <= localStorage.length; index++) {
    let key = localStorage.key(index)
    if(key != null) {
        let contact = localStorage.getItem(key)
        fieldContacts.insertAdjacentHTML('beforeend', contact)
    }
}

addButton.addEventListener('click', () => {
    let name = prompt("What's your name?")
    let number = prompt("What's your phone number?")

    let idContactNumber = document.getElementById(number)

    if(idContactNumber == null || number != idContactNumber.id) {
        let contactContainer = document.createElement('div')
        contactContainer.classList.add('containerContact')
        contactContainer.id = `contact-${number}`

        let newContact = document.createElement('div')
        newContact.classList.add('contact')
    
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
        contactNumber.innerHTML = number

        let fieldActions = document.createElement('div')
        fieldActions.classList.add('actions')

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('delete')

        let editButton = document.createElement('button')
        editButton.classList.add('edit')

        fieldActions.appendChild(deleteButton)
        fieldActions.appendChild(editButton)
    
        fieldInformations.appendChild(contactName)
        fieldInformations.appendChild(contactNumber)
    
        newContact.appendChild(perfilImage)
        newContact.appendChild(fieldInformations)
        
        contactContainer.appendChild(newContact)
        contactContainer.appendChild(fieldActions)

        localStorage.setItem(`contact-${number}`, contactContainer.outerHTML)

        fieldContacts.appendChild(contactContainer)

        location.reload()

    } else {
        alert('Este número ja existe')
    }

})

const fieldChat = () => {
    alert('OK')
}

const deleteContact = (idNumber) => {
    localStorage.removeItem(idNumber)
    location.reload()
}

const editContact = () => {
    alert('edit')
}

for(let contact of contacts) {
    contact.addEventListener('click', fieldChat)
}

for(let action of actionDelete) {
    action.addEventListener('click', () => deleteContact(action.parentElement.parentElement.id))
}

for(let action of actionEdit) {
    action.addEventListener('click', editContact)
}
let addButton = document.getElementById("addButton")
let fieldContacts = document.getElementById("fieldContacts")
let containerChat = document.getElementById("container-chat")
let contacts = document.getElementsByClassName('contact')
let actionDelete = document.getElementsByClassName('delete')
let actionEdit = document.getElementsByClassName('edit')
let containerData = document.getElementById('dataContainer')
let inputName = document.querySelector("#formName")
let inputNumber = document.getElementById('formNumber')
let saveButton = document.getElementById('saveButton')
let closeButton = document.querySelector('#closeButton')
let fieldChats = document.querySelector('#fieldChats')

let backButton = document.createElement('div')
backButton.classList.add('back-button')
backButton.id = 'backButton'

backButton.addEventListener('click', () => {
    containerChat.children[0].style.display = 'flex'
    containerChat.children[1].style.display = 'none'
})

for(let index = 0; index <= localStorage.length; index++) {
    let key = localStorage.key(index)
    if(key != null) {
        let contact = localStorage.getItem(key)
        fieldContacts.insertAdjacentHTML('beforeend', contact)
    }
}

addButton.addEventListener('click', () => {
    containerData.style.display = 'flex'
    setData()
})

closeButton.addEventListener('click', () => {
    containerData.style.display = 'none'
    location.reload()
})

function setData() {
    saveButton.addEventListener('click', () => saveContact(inputName.value, inputNumber.value))
}

function saveContact(name, number, edit=false) {
    let erros = 0

    if(number.length < 11 || number.length > 11 || isNaN(number)) {
        alert('Número Inválido')
        erros++
    }

    if(erros === 0) {
        let idContactNumber = document.getElementById(number)

        if(idContactNumber == null || number != idContactNumber.id || edit == true) {
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
            contactNumber.id = number
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
    }
}

const showFieldChat = (idNumber) => {
    if (window.matchMedia("(max-width:500px)").matches) {
        fieldChats.style.display = 'none'
    }

    let contactSelect = document.querySelector(`#${idNumber}`)
    let imagePerfil = contactSelect.children[0].children[0].src
    let perfilName = contactSelect.children[0].children[1].children[0].textContent

    let fieldChat = document.createElement('div')
    fieldChat.classList.add('field-chat')

    let contactBar = document.createElement('div')
    contactBar.classList.add('contact-bar')

    let contactImage = document.createElement('img')
    contactImage.classList.add('perfil-image')
    contactImage.src = imagePerfil

    let contactName = document.createElement('h3')
    contactName.classList.add('contact-name')
    contactName.innerHTML = perfilName

    let fiedlTyping = document.createElement('div')
    fiedlTyping.classList.add('field-typing')

    let inputTyping = document.createElement('input')
    inputTyping.type = 'text'
    inputTyping.id = 'fieldTyping'
    inputTyping.placeholder = 'Mensagem...'

    let sendButton = document.createElement('button')
    sendButton.classList.add('btn-send')

    let sendIcon = document.createElement('img')
    sendIcon.src = "assets/images/send-icon.png"

    sendButton.appendChild(sendIcon)

    fiedlTyping.appendChild(inputTyping)
    fiedlTyping.appendChild(sendButton)

    contactBar.appendChild(contactImage)
    contactBar.appendChild(contactName)
    contactBar.appendChild(backButton)

    fieldChat.appendChild(contactBar)
    fieldChat.appendChild(fiedlTyping)

    if(containerChat.children.length > 1) {
        containerChat.removeChild(containerChat.children[1])
    }

    containerChat.appendChild(fieldChat)
}

const deleteContact = (idNumber) => {
    localStorage.removeItem(idNumber)
    location.reload()
}

const editContact = (idNumber) => {
    let selectedContact = document.getElementById(idNumber)
    let name = selectedContact.children[0].children[1].children[0].textContent
    let number = selectedContact.children[0].children[1].children[1].textContent

    inputName.value = name
    inputNumber.value = number

    containerData.style.display = 'flex'
    saveButton.addEventListener('click', () => {
        if(number != inputNumber.value || name != inputName.value) {
            deleteContact(idNumber)
            saveContact(inputName.value, inputNumber.value, true)
        }
    })
}

for(let contact of contacts) {
    contact.addEventListener('click', () => showFieldChat(contact.parentElement.id))
}

for(let action of actionDelete) {
    action.addEventListener('click', () => deleteContact(action.parentElement.parentElement.id))
}

for(let action of actionEdit) {
    action.addEventListener('click', () => editContact(action.parentElement.parentElement.id))
}
import { tokensToRegExp } from "path-to-regexp";

const storage = window.localStorage

const renderContacts = () => {
    const contacts = JSON.parse(storage.getItem('contacts'))
    let div = document.querySelector('.contact-list')

    if (contacts) {
        div.innerHTML = ''
        const ul = document.createElement('ul')
        contacts.forEach(contact => {
            let li = document.createElement('li')
            li.innerHTML = `
            <div class="card">
                <div class="content">
                    <h1>${ contact.name}</h1>
                    <h2>${ contact.company}</h2>
                    <p>${ contact.notes}</p>
                    ${ contact.email} |
                    <button class="delete-contact">Delete Contact</button>
                    <button class="edit-contact">Edit Contact</button>
                    <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>

                    </div>
            </div>
        `
            ul.appendChild(li)
            let button = document.createElement('button');
            button.classList += "delete-contact";
            button.innerHTML = 'X';
            li.appendChild(button)
            
            ul.appendChild(li)
        })
        div.appendChild(ul)
    } else {
        div.innerHTML = '<p>You have no contacts in your address book</p>'
    }
}

    let delete_button = document.querySelector('.contact-list')

    delete_button.addEventListener('click',event => {
        let id = event.target.parentNode.id
        let contacts = JSON.parse(storage.getItem('contacts') || []
        console.log(contacts)
        contacts.forEach(contact => {

            contact.id == id ? contacts.splice(contacts.indexOf(contact),1) : false
        })

        console.log(contacts)

        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
        )
    })

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const addContactForm = document.querySelector('.new-contact-form')

    addContactForm.addEventListener('submit', event => {
        event.preventDefault()

        const storage = window.localStorage    

        const {
            name,
            email,
            phone,
            company,
            notes,
            twitter,
        } = addContactForm.elements

        const contact = {
            id: Date.now(),
            name: name.value,
            email: email.value,
            phone: phone.value,
            company: company.value,
            notes: notes.value,
            twitter: twitter.value,
        }
        //console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
        let contacts = JSON.parse(storage.getItem('contacts')) || []
        contacts.push(contact)
        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
        addContactForm.reset()
    })
})
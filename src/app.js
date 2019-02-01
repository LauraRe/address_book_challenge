import { tokensToRegExp } from "path-to-regexp";

const storage = window.localStorage

const renderContacts = () => {
    const contacts = JSON.parse(storage.getItem('contacts'))
    let div = document.querySelector('.contact-list')

    if (contacts && contacts.length > 0) {
        div.innerHTML = ''
        const ul = document.createElement('ul')
        contacts.forEach(contact => {
            let li = document.createElement('li')
            li.innerHTML = `
            <div class="card">
                <div id="${contact.id}" class="content text-center sm:text-left sm:flex-grow">
                    <img class="image block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="https://pngimage.net/wp-content/uploads/2018/06/login-icon-vector-png-5.png" alt="Portrait_Placeholder">
                    <p class="text-xl text-black font thin leading-tight">${ contact.name}<p>
                    <p class="text-xl text-black font-thin leading-tight">${ contact.company}<p>
                    <p class="text-sm text-black font-thin leading-tight">${ contact.notes}</p>
                    <p class="text-sm text-black font-thin leading-tight">${ contact.email}</p>
                    <button class="delete-contact text-xs text-red-dark font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-black">Delete Contact</button>
                    <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
                </div>
            </div>
            `
            ul.appendChild(li)
            let delete_button = li.querySelector('.delete-contact')
            delete_button.addEventListener('click', event => {
                let id = event.target.parentNode.id
                let contacts = JSON.parse(storage.getItem('contacts')) || []
                debugger
                contacts.forEach(contact => {
                    contact.id == id ? contacts.splice(contacts.indexOf(contact), 1) : false
                })

                console.log(contacts)

                storage.setItem('contacts', JSON.stringify(contacts))
                renderContacts()
            })

        })
        div.appendChild(ul)

    } else {
        div.innerHTML = '<p class="text-xl text-red-dark font thin leading-tight">You have no contacts in your address book.</p>'
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    debugger
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
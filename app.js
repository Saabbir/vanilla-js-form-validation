const rules = {
    userName: { 
        required: true,
        minlength: 3,
        maxlength: 20
    },
    userEmail: {
        required: true
    }
}

function validateForm(e, rules) {
    const form = e.target
    const errors = []
    const errorFields = []
    const formFields = document.querySelectorAll('.form__control')
    const errorMsg = document.createElement('p')
    errorMsg.setAttribute('id', 'errorMsg')
    
    if (document.querySelector('#errorMsg')) {
        document.querySelector('#errorMsg').remove()
    }

    formFields.forEach(field => field.style.borderColor = '')

    function addErrorField(field) {
        if (!errorFields.includes(field)) {
            errorFields.push(field)
        }
    }

    function validateUserName() {
        if (rules.userName.required) {
            const userNameEl = form.elements.userName
            const userNameVal = userNameEl.value.trim()

            if (userNameVal === '') {
                errors.push('The name field is required. You can\'t leave it empty.')
                addErrorField(userNameEl)
            } else if (userNameVal.length < rules.userName.minlength) {
                errors.push(`Your name must be at least ${rules.userName.minlength} characters.`)
                addErrorField(userNameEl)
            } else if (userNameVal.length > rules.userName.maxlength) {
                errors.push(`Your name can contain maximum ${rules.userName.maxlength} characters.`)
                addErrorField(userNameEl)
            }
                        
        }
    }

    function validateUserEmail() {
        if (rules.userEmail.required) {
            const userEmailEl = form.elements.userEmail
            const userEmailVal = userEmailEl.value.trim().toLowerCase()
            const userEmailName = userEmailVal.slice(0, userEmailVal.indexOf('@'));
            const userEmailDomain = userEmailVal.slice(userEmailVal.indexOf('@') + 1);
            const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com'];
            const slangWords = ['LOL', 'OMG', 'WTF', 'LMAO', 'RIP', 'FUCK'];            
            const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            const isEmailValid = emailRegExp.test(userEmailVal)
            
            if (userEmailVal === '') {
                errors.push('The email field is required. You can\'t leave it empty.')
                addErrorField(userEmailEl)
            } else if (!isEmailValid) {
                errors.push(`<strong>${userEmailVal}</strong> is not a valid email address.`)
                addErrorField(userEmailEl)
            } else if (validEmailDomains.indexOf(userEmailDomain) === -1) {
                errors.push(`<strong>${userEmailDomain}</strong> is not a valid email domain.`)
                addErrorField(userEmailEl)
            } else if (slangWords.indexOf(userEmailName.toUpperCase()) !== -1) {
                errors.push(`Your user name <strong>${userEmailName}</strong> contains slang word.`)
                addErrorField(userEmailEl)
            }
        }
    }

    validateUserName()
    validateUserEmail()

    errorFields.forEach(field => field.style.borderColor = 'red')

    errorMsg.innerHTML = errors.join('<br>')
    form.appendChild(errorMsg)

    if (errors.length !== 0) {
        e.preventDefault()
    }
}

// Query myForm
const myForm = document.querySelector('#myForm')

// Listen for submit event on myForm
myForm.addEventListener('submit', function(event) {
    validateForm(event, rules)
});
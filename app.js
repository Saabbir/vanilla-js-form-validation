const rules = {
    name: { 
        required: true,
        min: 3,
        max: 20
    },
    email: {
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

    function validateName() {
        if (rules.name.required) {
            const userNameEl = form.elements.userName
            const userNameVal = userNameEl.value.trim()

            if (userNameVal === '') {
                errors.push('The name field is required. You can\'t leave it empty.')
                addErrorField(userNameEl)
            } else if (userNameVal.length < rules.name.min) {
                errors.push(`Your name must be at least ${rules.name.min} characters.`)
                addErrorField(userNameEl)
            } else if (userNameVal.length > rules.name.max) {
                errors.push(`Your name can contain maximum ${rules.name.max} characters.`)
                addErrorField(userNameEl)
            }
                        
        }
    }

    function validateEmail() {
        if (rules.email.required) {
            const userEmailEl = form.elements.userEmail
            const userEmailVal = userEmailEl.value.trim()
            
            if (userEmailVal === '') {
                errors.push('The email field is required. You can\'t leave it empty.')
                addErrorField(userEmailEl)
            }            
        }
    }

    validateName()
    validateEmail()

    errorFields.forEach(field => field.style.borderColor = 'red')

    errorMsg.innerHTML = errors.join('<br>')
    form.appendChild(errorMsg)

    // Errors Array
    console.log('Errors Array')
    console.log('=======================')
    console.log(errors)

    // ErrorFields Array
    console.log('ErrorFields Array')
    console.log('=======================')
    console.log(errorFields)

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
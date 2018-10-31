(function(){
// Rules for form validation
const rules = {
    userName: { 
        required: true,
        minlength: 3,
        maxlength: 10
    },
    userEmail: {
        required: true
    },
    userPassword: {
        required: true,
        minlength: 8
    },
    userDOB: {
        required: true
    },
    userPhoneNumber: {
        required: true
    },
    userPhoto: {
        required: true,
        accept: ['image/jpeg', 'image/png'],
        size: (1024 * 100)
    }
}

// Query myForm
const myForm = document.querySelector('#myForm')

// Query userPhotoLabel
const userPhotoLabel = myForm.querySelector('#userPhotoLabel')

// Validate Form
function validateForm(e, rules) {
    const form = e.target
    const errors = []
    const errorFields = []    

    function addErrorField(field) {
        if (!errorFields.includes(field)) {
            errorFields.push(field)
        }
    }

    function validateUserName() {
        if (rules.userName.required) {
            const userNameEl = form.elements.userName
            const userNameVal = userNameEl.value.trim().toLowerCase()

            if (userNameVal === '') {
                errors.push('Username is <strong>required</strong>. You can\'t leave it empty.')
                addErrorField(userNameEl)
            } else if (!isNaN(userNameVal.charAt(0))) {
                errors.push(`Username can't start with a number (<strong>${userNameVal.charAt(0)}</strong>)`)
                addErrorField(userNameEl)
            } else if (userNameVal.length < rules.userName.minlength) {
                errors.push(`Username must be at least <strong>${rules.userName.minlength}</strong> characters.`)
                addErrorField(userNameEl)
            } else if (userNameVal.length > rules.userName.maxlength) {
                errors.push(`Username can contain maximum <strong>${rules.userName.maxlength}</strong> characters.`)
                addErrorField(userNameEl)
            } else if (userNameVal.includes(' ')) {
                errors.push(`Username can't contain a <strong>space</strong>.`)
                addErrorField(userNameEl)
            }
                        
        }
    }

    function validateUserEmail() {
        if (rules.userEmail.required) {
            const userEmailEl = form.elements.userEmail
            const userEmailVal = userEmailEl.value.trim().toLowerCase()
            const userEmailName = userEmailVal.slice(0, userEmailVal.indexOf('@'))
            const userEmailDomain = userEmailVal.slice(userEmailVal.indexOf('@') + 1)
            const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'mail.ru']
            const slangWords = ['LOL', 'OMG', 'WTF', 'LMAO', 'RIP', 'FUCK']
            const searchSlangWord = slangWords.filter(function(slangWord) {
                return userEmailName.includes(slangWord.toLowerCase())
            })            
            const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            const isEmailValid = emailRegExp.test(userEmailVal)
            
            if (userEmailVal === '') {
                errors.push('Email address is <strong>mandatory</strong>. You can\'t leave it empty.')
                addErrorField(userEmailEl)
            } else if (!isEmailValid) {
                errors.push(`<strong>${userEmailVal}</strong> is not a valid email address.`)
                addErrorField(userEmailEl)
            } else if (!validEmailDomains.includes(userEmailDomain)) {
                errors.push(`<strong>${userEmailDomain}</strong> is not a valid email domain.`)
                addErrorField(userEmailEl)
            } else if (searchSlangWord.length) {
                errors.push(`Your email username contains slang word <strong>${searchSlangWord.join(', ')}</strong>. Which we do not accept.`)
                addErrorField(userEmailEl)
            }
        }
    }

    function validateFile() {
        if (rules.userPhoto.required) {
            const userPhotoEl = form.elements.userPhoto
            const userPhotos = userPhotoEl.files
            const userPhoto = userPhotoEl.files[0]

            function returnFileSize(number) {
                if ( number < 1024 ) {
                    return number.toFixed(1) + 'Bytes';
                } else if ( number >= 1024 && number < (1024 * 1024) ) {
                    return ( number / 1024 ).toFixed(1) + 'KB';
                } else if ( number >= (1024 * 1024) ) {
                    return ( number / (1024 * 1024).toFixed(1) ) + 'MB';
                }
            }        

            if (userPhotos.length === 0 || userPhoto === undefined) {
                errors.push('You didn\'t <strong>choose</strong> any photo.')
                errorFields.push(userPhotoLabel)
            } else if (!rules.userPhoto.accept.includes(userPhoto.type)) {
                errors.push(`The file you selected (${userPhoto.name}) is not a valid type. Valid file types are: <strong>${rules.userPhoto.accept.join(', ')}</strong>.`)
                errorFields.push(userPhotoLabel)
            } else if (userPhoto.size > rules.userPhoto.size) {
                errors.push(`Your file size (${returnFileSize(userPhoto.size)}) is too large. The maximum allowed file size is <strong>100KB</strong>.`)
                errorFields.push(userPhotoLabel)
            }
        }
    }

    function validatePassword() {
        if (rules.userPassword.required) {
            const userPasswordEl = form.elements.userPassword
            const userPasswordVal = userPasswordEl.value.trim()

            if (userPasswordVal.length < rules.userPassword.minlength) {
                errors.push('Password must be at least <strong>8</strong> characters long.')
                addErrorField(userPasswordEl)
            } else if (
                !(/[a-z]/.test(userPasswordVal) &&
                /[A-Z]/.test(userPasswordVal) &&
                /[\d]/.test(userPasswordVal) &&
                /[\W]/.test(userPasswordVal))
            ) {
                errors.push(`Password must include at least <strong>1</strong> lowercase letter, <strong>1</strong> uppercase letter, <strong>1</strong> digit, and <strong>1</strong> special character.`)
                addErrorField(userPasswordEl)
            }
        }
    }

    function validatePasswordConfirm() {
        const userPasswordConfirmEl = form.elements.userPasswordConfirm
        const userPasswordConfirmVal = userPasswordConfirmEl.value.trim()

        if (form.elements.userPassword.value.trim() !== userPasswordConfirmVal) {
            errors.push('Those passwords didn\'t <strong>match</strong>. Try again.')
            addErrorField(userPasswordConfirmEl)
        }
    }

    function validatePhoneNumber() {
        if (rules.userPhoneNumber.required) {
            const userPhoneNumberEl = form.elements.userPhoneNumber
            const userPhoneNumberVal = userPhoneNumberEl.value.trim()
            const userPhoneNumberRegex = /^\d{3}-?\d{2}-?\d{3}-?\d{3}$/

            if (userPhoneNumberVal.length < 11) {
                errors.push('The phone number must be at least <strong>11</strong> digit long.')
                addErrorField(userPhoneNumberEl)
            } else if (!userPhoneNumberRegex.test(userPhoneNumberVal)) {
                errors.push('The phone number format is incorrect. We accept <strong>017-89-124-139</strong> or <strong>01789124139</strong> format.')
                addErrorField(userPhoneNumberEl)
            }
        }
    }

    function validateDOB() {
        if (rules.userDOB.required) {
            const userDOBEl = form.elements.userDOB
            const userDOBVal = userDOBEl.value.trim()
            const userDOBRegex = /^\d\d?-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/
            
            if (!userDOBRegex.test(userDOBVal)) {
                errors.push('The date format is incorrect. We accept <strong>21-Sep-1994</strong> in this format.')
                addErrorField(userDOBEl)
            }            
        }
    }

    function hideError() {
        const errorsList = form.querySelector('#errorsList')
        if (errorsList) {
            errorsList.remove()
        }

        const hasBorderFields = form.querySelectorAll('.hasBorder')
        hasBorderFields.forEach(field => field.style.borderColor = '')
    }

    function showError() {
        const ol = document.createElement('ol')
        ol.setAttribute('id', 'errorsList')
        errorFields.forEach(field => field.style.borderColor = 'red')
        errors.forEach(function(error) {
            const li = document.createElement('li')
            li.innerHTML = error
            ol.appendChild(li)
        })
        const boxFooter = document.querySelector('.box__footer')
        boxFooter.parentNode.insertBefore(ol, boxFooter)
    }    

    hideError()
    validateUserName()
    validateUserEmail()
    validatePassword()
    validatePasswordConfirm()
    validatePhoneNumber()
    validateDOB()
    validateFile()
    showError()

    if (errors.length !== 0) {
        e.preventDefault()
    }
}

// Listen for submit event on myForm
myForm.addEventListener('submit', function(event) {
    validateForm(event, rules)
});

// Listen for change event on userPhoto
myForm.elements.userPhoto.onchange = function(event) {
    const photo = event.target.files[0]
    userPhotoLabel.textContent = photo.name
}    
}())

// Listen for blur event on userPhoneNumber
myForm.elements.userPhoneNumber.onblur = function(event) {
    event.target.value = event.target.value.replace(/^(\d{3})-?(\d{2})-?(\d{3})-?(\d{3})$/, '$1-$2-$3-$4')
}
function displayErrorMessages(errors) {
    // Remove class 'is-invalid' from all input fields.
    var inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(element) {
        element.classList.remove("is-invalid");
    });

    // Add it to all fields which returned an error.
    errors.forEach(error => {
        const inputId = error.path;
        const errorMessage = error.msg;
        const element = document.getElementById(`${inputId}`);
        element.classList.add("is-invalid");
        const feedbackElement = document.getElementById(`${inputId}-feedback`);
        feedbackElement.textContent = errorMessage;
    });
}

// Use this by setting the event handler onSubmit to this function.
// eg. onsubmit="submitForm(event)"
async function submitForm (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    disableForm(form);

    const clientValid = clientSideValidation(formData);
    if(clientValid.length > 0)
    {
        displayErrorMessages(clientValid);
        enableForm(form);
        return;
    }

    // Encode the form data.
    const encodedFormData = new URLSearchParams(formData).toString();
    const endpoint = form.action;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Event listener for when the request completes.
    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.href = xhr.responseText;
        }
        else {
            var errorResponse = JSON.parse(xhr.responseText);
            if(xhr.status == 500) {
                const alert = createAlert("alertPlaceholder");
                alert("Something went wrong. Please try again later.", 'danger')
            } else {
                displayErrorMessages(errorResponse.errors);
            }
            enableForm(form);
        }
    };
    
    // Event listener for when an error occurs.
    xhr.onerror = function() {
        console.error('An error occurred while submitting the form.');
        const alert = createAlert("alertPlaceholder");
        alert("Something went wrong. Please try again later.", 'danger')
        enableForm(form);
    };
    
    // Send the request with form data.
    xhr.send(encodedFormData);
}

function clientSideValidation (formData, checkEmail)
{
    let errors = [];

    const email = formData.get("email");
    if(email)
    {
        if(!validateEmail(email))
        {
            errors.push({
                msg: "E-mail is not valid.",
                path: "email"
            });
        }
    }

    const password = formData.get("password");
    if(!validatePassword(password))
    {
        errors.push({
            msg: "Password must be at least 8 characters.",
            path: "password"
        });
    }

    return errors;
}

function validateEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function disableForm(form) {
    var formElements = form.elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }
}

function enableForm(form) {
    var formElements = form.elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
}
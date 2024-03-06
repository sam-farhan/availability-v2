    function onClickAvailability(event, element) {
        const year = element.getAttribute("data-year");
        const week = element.getAttribute("data-week");
        window.location.href = `/squad/${squadId}/availability/${year}/${week}`
    }

async function submitFormAddMember (event) {
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
        if (xhr.status === 201) {
            location.reload();
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

    const name = formData.get("user");
    if(name)
    {
        if(name == "empty")
        {
            errors.push({
                msg: "Select a member to add.",
                path: "user"
            });
        }
    }

    return errors;
}

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

window.onload = (event) => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        popoverTriggerEl.addEventListener('shown.bs.popover', function () {
            const removeUserElement = document.querySelector(`[id^="link-remove-user-"]`);
            removeUserElement.addEventListener('click', function(event) {
                removeUserElement.disabled = true;
                const userId = popoverTriggerEl.getAttribute("data-user-id");
                removeUser(userId, removeUserElement);
            });

            const makeCoachElement = document.querySelector(`[id^="link-make-coach-"]`);
            if(makeCoachElement) {
                makeCoachElement.addEventListener('click', function(event) {
                    makeCoachElement.disabled = true;
                    const userId = popoverTriggerEl.getAttribute("data-user-id");
                    makeCoach(userId, makeCoachElement);
                });
            }
            

            const makeRowerElement = document.querySelector(`[id^="link-make-rower-"]`);
            if(makeRowerElement) {
                makeRowerElement.addEventListener('click', function(event) {
                    makeRowerElement.disabled = true;
                    const userId = popoverTriggerEl.getAttribute("data-user-id");
                    makeRower(userId, makeRowerElement);
                });
            }
        });
        return new bootstrap.Popover(popoverTriggerEl);
    })
};

function removeUser (userId, element) {
    console.log(`Removing user ${userId}.`);
    
    const data = JSON.stringify({
        user: userId
    });

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/squad/${squadId}/users`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Event listener for when the request completes.
    xhr.onload = function() {
        if (xhr.status === 200) {
            location.reload();
        }
        else {
            const text = xhr.responseText;
            const alert = createAlert("alertPlaceholder");
            alert(text, 'danger')
            element.disabled = false;
        }
    };
    
    // Event listener for when an error occurs.
    xhr.onerror = function() {
        console.error('An error occurred while submitting the form.');
        const alert = createAlert("alertPlaceholder");
        alert("Something went wrong. Please try again later.", 'danger')
        element.disabled = false;
    };
    
    // Send the request.
    xhr.send(data);
}

function makeCoach (userId, element) {
    console.log(`Making user ${userId} a coach.`);

    const data = JSON.stringify({
        user: userId,
        role: "Coach"
    });

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `/squad/${squadId}/users`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Event listener for when the request completes.
    xhr.onload = function() {
        if (xhr.status === 200) {
            location.reload();
        }
        else {
            const text = xhr.responseText;
            const alert = createAlert("alertPlaceholder");
            alert(text, 'danger')
            element.disabled = false;
        }
    };
    
    // Event listener for when an error occurs.
    xhr.onerror = function() {
        console.error('An error occurred while submitting the form.');
        const alert = createAlert("alertPlaceholder");
        alert("Something went wrong. Please try again later.", 'danger')
        element.disabled = false;
    };
    
    // Send the request.
    xhr.send(data);
}

function makeRower (userId, element) {
    console.log(`Making user ${userId} a rower.`);

    const data = JSON.stringify({
        user: userId,
        role: "Rower"
    });

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `/squad/${squadId}/users`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Event listener for when the request completes.
    xhr.onload = function() {
        if (xhr.status === 200) {
            location.reload();
        }
        else {
            const text = xhr.responseText;
            const alert = createAlert("alertPlaceholder");
            alert(text, 'danger')
            element.disabled = false;
        }
    };
    
    // Event listener for when an error occurs.
    xhr.onerror = function() {
        console.error('An error occurred while submitting the form.');
        const alert = createAlert("alertPlaceholder");
        alert("Something went wrong. Please try again later.", 'danger')
        element.disabled = false;
    };
    
    // Send the request.
    xhr.send(data);
}
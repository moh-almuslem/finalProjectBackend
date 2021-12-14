function registerUser() {
    let formData = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "phone": ""
    }

   // 1.1 use document to get all of the text input elements
    let textElements = document.getElementsByClassName('field');

    // 1.1.2. create variables for each text field
    let firstName = textElements[0];
    let lastName = textElements[1];
    let email = textElements[2];
    let password = textElements[3];
    let phone = textElements[4];

    // 1.2
    // let checkBox = document.getElementsByClassName('checkbox')[0];

    // 3. validate the form data
    let errors = [];

    if(firstName.value === '') {
        errors.push('Please enter first name')
    }

    if(lastName.value === '') {
        errors.push('Please enter last name')
    }

    if(email.value === '') {
        errors.push('Please enter email')
    }

    if(password.value === '') {
        errors.push('Please enter password')
    }
    // if (checkBox.checked === false) {
    //     errors.push('Please accept the terms & conditions')
    // }

    // Get the hidden div layers
    let errorBox = document.getElementsByClassName('user-errors')[0];
    let successBox = document.getElementsByClassName('user-success')[0];
    if(errors.length > 0) {
        
        // Get the hidden div layer with class 'user-errors'

        // hide the success box because an error has occcured
        successBox.style.display = "none";
        // Unhide by changing its CSS to 'display: block'
        errorBox.style.display = "block";
        // put the errors as html int the 'user-errors' div
        errorBox.innerHTML = errors.join("<br/>");

    } else {
        // hide the error box because no error has occcured
        errorBox.style.display = "none";
        
        successBox.style.display = "block";
    }
    // 4. send formData to backend
    formData['firstName'] = firstName.value;
    formData['lastName'] = lastName.value;
    formData['email'] = email.value;
    formData['phone'] = phone.value;
    formData['password'] = password.value;

    // module.exports = formData;
}



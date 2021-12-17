function BookingForm() {
    let bookingData = {
        "Name":"",
        "Phone Number":"",
        "E-Mail":"",
        "City":"",
        "Baby's Birthday":"",
        "Baby's Name":""
    }

    // 1.1 use document to get all of the text input elements
    let textElements = document.getElementsByClassName('field');

     // 1.1.2. create variables for each text field
     let Name = textElements[0];
     let phoneNumber = textElements[1];
     let Email = textElements[2];
     let City = textElements[3];
     let BabyBirthday = textElements[4];
     let BabyName = textElements[5]
 
     // 1.2
    // let checkBox = document.getElementsByClassName('checkbox')[0];

    // 3. validate the form data
    let errors = [];

    if(Name.value === '') {
        errors.push('Please enter your full name')
    }

    if(phoneNumber.value === '') {
        errors.push('Please enter your mobile number')
    }

    if(Email.value === '') {
        errors.push('Please enter your email')
    }

    if(City.value === '') {
        errors.push('City')
    }

    if(BabyBirthday.value === '') {
        errors.push('Please enter the birthday')
    }    

    if(BabyName.value === '') {
        errors.push('Please enter the name of the child')
    }
    // if (checkBox.checked === false) {
    //     errors.push('Please accept the terms & conditions')
    // }

    // Get the hidden div layers
    let errorBox = document.getElementsByClassName('booking-errors')[0];
    let successBox = document.getElementsByClassName('booking-success')[0];
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
    bookingData['Name'] = Name.value;
    bookingData['Phone Number'] = phoneNumber.value;
    bookingData['E-mail'] = Email.value;
    bookingData['City'] = City.value;
    bookingData["Baby's Birthday"] = BabyBirthday.value;
    bookingData["Baby's Name"] = BabyName.value
}

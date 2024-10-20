// Helper function for validation
function validateForm(form) {
    // Get form elements based on the form passed
    const firstName = form.querySelector("#first-name");
    const lastName = form.querySelector("#last-name");
    const email = form.querySelector("#email");
    const contact = form.querySelector("#contact");
    const password = form.querySelector("#pass");

    // Clear previous error messages
    clearInlineErrors(form);

    // Helper function to set inline error message and make the input border red
    function setError(input, message) {
        input.style.border = "2px solid red";  // Set border color to red
        const errorSpan = document.createElement("span");
        errorSpan.className = "error-message";
        errorSpan.style.color = "red";
        errorSpan.style.fontSize = "12px";
        errorSpan.innerText = message;
        input.parentNode.appendChild(errorSpan);  // Append the error message next to the input
        return false;
    }

    // Helper function to reset the input border and remove error messages
    function clearError(input) {
        input.style.border = "";  // Reset border to default
    }

    let isValid = true;

    // Email pattern for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate First Name
    if (firstName && firstName.value.trim() === "") {
        isValid = setError(firstName, "First Name is required.");
    } else {
        clearError(firstName);
    }

    // Validate Last Name
    if (lastName && lastName.value.trim() === "") {
        isValid = setError(lastName, "Last Name is required.");
    } else {
        clearError(lastName);
    }

    // Validate Email
    if (email.value.trim() === "") {
        isValid = setError(email, "Email is required.");
    } else if (!emailPattern.test(email.value)) {
        isValid = setError(email, "Please enter a valid email address.");
    } else {
        clearError(email);
    }

    // Validate Phone Number (if exists)
    if (contact && contact.value.trim() === "") {
        isValid = setError(contact, "Phone number is required.");
    } else if (contact && contact.value.length !== 11) {
        isValid = setError(contact, "Phone number must be 11 digits long.");
    } else if (contact) {
        clearError(contact);
    }

    // Validate Password
    if (password.value.length < 8) {
        isValid = setError(password, "Password must be at least 8 characters long.");
    } else {
        const hasLetter = /[a-zA-Z]/.test(password.value);
        const hasNumber = /\d/.test(password.value);
        const hasSymbol = /[!@#$%^&*]/.test(password.value);

        if (!hasLetter || !hasNumber || !hasSymbol) {
            isValid = setError(password, "Password must contain letters, numbers, and symbols.");
        } else {
            clearError(password);
        }
    }

    return isValid;
}

// Clear any inline error messages from the form
function clearInlineErrors(form) {
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
        errorMessage.remove();  // Remove all previous error messages
    });
}

// Validation for Signup Form
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm(this)) {
        alert("Signup Form submitted successfully!");
        this.submit();  // Submit the form after validation passes
    }
});


const loginFormHandler = async(event) => {
    event.preventDefault();

    // Collect values from the login form
    const emailAddress = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (emailAddress && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ emailAddress, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard
            document.location.replace('/');
        } else {
            alert(response.statusText);

        }
    }
};

// Handle user signup
const signupFormHandler = async(event) => {
    event.preventDefault();

    const emailAddress = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();

    if (emailAddress && password && firstName && lastName) {
        // Check if the email is already registered
        const emailExists = await checkEmailExists(emailAddress);

        if (emailExists) {
            alert('This email is already registered. Please use a different email.');
            return;
        }

        // If the email is unique, proceed with signup

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ emailAddress, password, firstName, lastName}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const checkEmailExists = async(emailAddress) => {
    try {
        const response = await fetch(`/api/users/email/${emailAddress}`);
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false; // Assume email does not exist in case of an error
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
const loginFormHandler = async(event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        // Check if the email is already registered
        const emailExists = await checkEmailExists(email);

        if (emailExists) {
            alert('This email is already registered. Please use a different email.');
            return;
        }

        // If the email is unique, proceed with signup
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

const checkEmailExists = async(email) => {
    try {
        const response = await fetch(`/api/users/email/${email}`);
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
// Set the base URL for all authentication-related API calls
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// ===========================================
// SIGN UP - Register a new user
// ===========================================
const signUp = async (formData) => {
  try {
    // Send a POST request to /auth/sign-up with the user's form data
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Sending JSON
      body: JSON.stringify(formData), // Convert form data to JSON string
    });

    // Parse the JSON response
    const data = await res.json();

    // If the server returned an error, throw it
    if (data.err) {
      throw new Error(data.err);
    }

    // If we receive a token (successful signup)
    if (data.token) {
      // Save the token to localStorage so the user stays logged in
      localStorage.setItem('token', data.token);

      // Decode the token to extract user info (payload)
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    // If no token and no specific error, throw a generic error
    throw new Error('Invalid response from server');
  } catch (err) {
    // Log and rethrow the error so it can be caught elsewhere
    console.log(err);
    throw new Error(err);
  }
};

// ===========================================
// SIGN IN - Log in an existing user
// ===========================================
const signIn = async (formData) => {
  try {
    // Send a POST request to /auth/sign-in with the user's login info
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Sending JSON
      body: JSON.stringify(formData), // Convert form data to JSON string
    });

    // Parse the JSON response
    const data = await res.json();

    // If the server returned an error, throw it
    if (data.err) {
      throw new Error(data.err);
    }

    // If we receive a token (successful login)
    if (data.token) {
      // Save the token to localStorage
      localStorage.setItem('token', data.token);

      // Decode the token to extract user info (payload)
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    // If something went wrong and there's no token, throw a generic error
    throw new Error('Invalid response from server');
  } catch (err) {
    // Log and rethrow the error
    console.log(err);
    throw new Error(err);
  }
};

// Export the auth functions to be used in your components
export {
  signUp,
  signIn,
};
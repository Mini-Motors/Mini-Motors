import axios from 'axios';

export const BASE_URL = 'localhost:4000/api';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}


// AJAX Fetch REQUESTS HERE:


// USERS
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        user,
      )
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registeredUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        user
      )
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const myData = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

  export const myCarts = async (username, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}/allCarts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

  export const myActiveCarts = async (username, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}/activeCarts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };


// CARS
export const allCars = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cars`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};


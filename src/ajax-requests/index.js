import axios from 'axios';
const  BASEAPI_URL  = process.env;

export const BASE_URL = BASEAPI_URL || `http://localhost:4000/api`;

// export const BASE_URL = `http://localhost:4000/api`;

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

export const getCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cars/${id}`, {
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

export const getCartsByCarId= async (carId, token) => {
  try{
    const response = await fetch(`${BASE_URL}/cars/${carId}/cart`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    const result = await response.json();
    return result
  }catch(error){
    console.error(error)
  }
}

export const createCar = async (manufacturer, model, type, color, price, token) => {
  try{
    const response = await fetch (`${BASE_URL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        manufacturer: manufacturer,
        model: model,
        type: type,
        color: color,
        price: price, 
      })
    })
    const result = await response.json();
    return result;
  }catch(error){
    console.error(error)
  }
}

export const updateCar = async(token, carId, newManufacturer, newModel, newType, newColor, newPrice) => {
  try{
    const response = await fetch(`${BASE_URL}/cars/${carId}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }, 
      body: JSON.stringify({
        manufacturer: newManufacturer,
        model: newModel,
        type: newType,
        color: newColor,
        price: newPrice
      })
    })
    const result = await response.json();
    return result
  }catch(error){
    console.error(error)
  }
}

export const deleteCar = async(carID, token) => {
  try{
    const response = await fetch(`${BASE_URL}/cars/${carID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      } 
    })
    const result = await response.json();
    return result
  }catch(error){
    console.error(error)
  }
}

// CART ITEMS 

export const updateCartItem = async (cartItemId, token, currentPrice) => {
  try {
    const response = await fetch(`${BASE_URL}/cart_items/${cartItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPrice: currentPrice,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = async (cartItemId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/cart_items/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

//Cart
export const getCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      // method: "GET",
      headers: {
      'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    return result;
    } catch (err) {
    console.error(err);
    }
  }

  export const createCart = async (cart, token) => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          cart
        )
      });

      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  export const updateCart = async (token, cartId, carId) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${cartId}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        carId
      )
      });
      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  export const deleteCart = async (cartId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  export const attachCart = async (cartId, userId) => {
    try {
      const response = await fetch (`${BASE_URL}/cart/${cartId}/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          userId
        )
      });

      const result = await response.json();
      console.log(result);
      return result;
      
    } catch (err) {
      console.error(err);
    }
  }
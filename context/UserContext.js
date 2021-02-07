import React from 'react';
import { useReducer } from 'react';

const LOGIN_TYPE = 'SIGN_IN';
const LOGOUT_TYPE = 'SIGN_OUT';

export const UserContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_TYPE:
      state = {
        ...state,
        ...action.payload
      };
      break;
    case LOGOUT_TYPE:
      state = {};
      break;
  }
  return state;
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    authLoaded: false,
    user: null
  });

  const loginUser = (user) => {
    return new Promise(async (resolve, reject) => {
      let response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(user)
      });
      if (response.ok) {
        let user = await response.json();
        dispatch({
          type: LOGIN_TYPE,
          payload: {
            user: user,
            authLoaded: true
          }
        });
        resolve(response);
      } else {
        reject('Failed to login user');
      }
    });
  };

  const logoutUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch('/api/auth/logout');
        if (response.ok) {
          dispatch({
            type: LOGOUT_TYPE,
            payload: {}
          });
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  async function registerUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(user)
        });
        if (response.ok) {
          let user = await response.json();
          dispatch({
            type: LOGIN_TYPE,
            payload: {
              user: user,
              authLoaded: true
            }
          });
          resolve(response);
        } else {
          reject('Failed to register user');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <UserContext.Provider value={{ logoutUser, loginUser, user, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

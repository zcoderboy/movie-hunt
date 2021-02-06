import React from 'react';
import supabase from '../lib/supabaseClient';
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
    user: null,
    accessToken: ''
  });

  const loginUser = (user) => {
    let { email, password } = user;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await supabase.auth.signIn({ email: email, password: password });
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY') setAuthView('update_password');
          if (event === 'USER_UPDATED') setTimeout(() => setAuthView('sign_in'), 1000);
          // Send session to /api/auth route to set the auth cookie.
          // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session })
          }).then((res) => res.json());
        });
        dispatch({
          type: LOGIN_TYPE,
          payload: {
            user: response.user,
            accessToken: response.data.access_token,
            authLoaded: true
          }
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const logoutUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await supabase.auth.signOut();
        dispatch({
          type: LOGOUT_TYPE,
          payload: {}
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  async function registerUser(user) {
    let { email, password } = user;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await supabase.auth.signUp({ email: email, password: password });
        dispatch({
          type: LOGIN_TYPE,
          payload: {
            user: response.user,
            accessToken: response.data.access_token,
            authLoaded: true
          }
        });
        resolve(response);
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

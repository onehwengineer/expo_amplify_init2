import React, {useReducer, useContext, createContext} from 'react';
// import { authReducer } from '../reducers/authReducer';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

function reducer(prevState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null
      };
    default:
      return prevState;
  }
};


function AuthProvider({ children }) {

  // Reference on useReducer : https://reactjs.org/docs/hooks-reference.html#usereducer
  // useReducer( reducer, initialState )
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}
function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };
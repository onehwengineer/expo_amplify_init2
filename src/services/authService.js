//import { Auth } from 'aws-amplify';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const signIn = async (email, password) => {
  try {
    const response = await Auth.signIn(email, password);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUp = async (username, password) => { 
  try {
    const response = await Auth.signUp({ username, password });
    return response;
  } catch (error) {
    throw new Error(error.message);
    //console.log('error', error)
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await Auth.forgotPassword(email);
    return response;
  } catch (error) {
    throw new Error(error.message);
    //console.log('error', error)
  }
};

const forgotPasswordSubmit = async (email, code, newPassword) => {
  try {
    const response = await Auth.forgotPasswordSubmit(email, code, newPassword);
    return response;
  } catch (error) {
    throw new Error(error.message);
    //console.log('error', error)
  }
};

const confirmSignUp = async (email, code) => { 
  try {
    const response = await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signOut = async () => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    const { attributes, signInUserSession } = response;
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { 
  signIn, 
  signOut, 
  checkAuth, 
  signUp, 
  confirmSignUp, 
  forgotPassword,
  forgotPasswordSubmit,
 };
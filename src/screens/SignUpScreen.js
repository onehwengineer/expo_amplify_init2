import React, { useState } from 'react';
import { 
  Text, TouchableOpacity, View, 
  TextInput, StyleSheet, ActivityIndicator,
  Keyboard, TouchableWithoutFeedback } from 'react-native';

import { signUp, confirmSignUp } from '../services/authService';
// import { useAuthDispatch } from '../contexts/authContext';

import {FormStyles} from '../styles/Styles';  


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


const SignUpScreen = ({ navigation }) => {
  // const dispatch = useAuthDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [signed, setSigned] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState();

  const signUpUser = () => { 
    setSignUpLoading(true);
    signUp(email, password)
      .then((data) => {
        console.log(data);
        setSigned(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setSignUpLoading(false));
  };

  const confirm = () => {
    setVerifyLoading(true);
    confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        /*
        signIn(email, password).then(() =>
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
        );
        */
        navigation.navigate('SignInNoHeader');
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setVerifyLoading(false));
  };

  return (
    <DismissKeyboard>
      <View style={FormStyles.container}>
        {!signed && (
          <View style={FormStyles.containerSub}>
            <Text style={FormStyles.title}>Sign Up</Text>
            <TextInput
              style={FormStyles.textInput}
              placeholder="Enter Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            <TextInput
              style={FormStyles.textInput}
              placeholder="Enter Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
              keyboardType="default"
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
            />
            <TouchableOpacity style={FormStyles.btn} onPress={signUpUser}>
              {signUpLoading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text style={FormStyles.btnText}>Sign Up </Text>
              }
            </TouchableOpacity>
            {error && <Text style={FormStyles.error}>{error}</Text>}
          </View>
        )}
        {signed && (
          <View style={FormStyles.containerSub}>
            <Text style={FormStyles.title}>Confirm Sign Up</Text>
            <TextInput
              style={FormStyles.textInput}
              placeholder="Enter Verification Code"
              value={code}
              onChangeText={(text) => setCode(text)}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TouchableOpacity style={FormStyles.btn} onPress={confirm}>
              {verifyLoading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text style={FormStyles.btnText}>Verify </Text>
              }
            </TouchableOpacity>
            {error && <Text style={FormStyles.error}>{error}</Text>}
          </View>
        )}
      </View>
    </DismissKeyboard>
  );
};

export default SignUpScreen;
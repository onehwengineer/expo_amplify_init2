import React, { useState } from 'react';
import { 
  Text, TouchableOpacity, View, 
  TextInput, ActivityIndicator,
  Keyboard, TouchableWithoutFeedback } from 'react-native';

import { forgotPassword, forgotPasswordSubmit } from '../services/authService';

import {FormStyles} from '../styles/Styles';  


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const [getCodeSent, setgetCodeSent] = useState(false);
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSetNewPassword, setLoadingSetNewPassword] = useState(false);
  const [error, setError] = useState();

  const getCode = () => { 
    setLoadingGetCode(true);
    forgotPassword(email)
      .then((data) => {
        console.log(data);
        setgetCodeSent(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setLoadingGetCode(false));
  };

  const setNewPassword = () => {
    setLoadingSetNewPassword(true);
    forgotPasswordSubmit(email, code, password)
      .then(() => {
        navigation.navigate('SignInNoHeader');
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setLoadingSetNewPassword(false));
  };

  return (
    <DismissKeyboard>
      <View style={FormStyles.container}>
        {!getCodeSent && (
          <View style={FormStyles.containerSub}>
            <Text style={FormStyles.title}>Forgot Password</Text>
            <TextInput
              style={FormStyles.textInput}
              placeholder="Enter Email to Receive Code"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            <TouchableOpacity style={FormStyles.btn} onPress={getCode}>
            {loadingGetCode ?
              <ActivityIndicator size="small" color="white" /> : 
              <Text style={FormStyles.btnText}>Send </Text>
            }
            </TouchableOpacity>
            {error && <Text style={FormStyles.error}>{error}</Text>}
          </View>
        )}
        {getCodeSent && (
          <View style={FormStyles.containerSub}>
            <Text style={FormStyles.title}>Change Password</Text>
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
              placeholder="Enter Verification Code"
              value={code}
              onChangeText={(text) => setCode(text)}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TextInput
              style={FormStyles.textInput}
              placeholder="Enter NEW Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
              keyboardType="default"
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
            />
            <TouchableOpacity style={FormStyles.btn} onPress={setNewPassword}>
            {loadingSetNewPassword ?
              <ActivityIndicator size="small" color="white" /> : 
              <Text style={FormStyles.btnText}>Submit </Text>
            }
            </TouchableOpacity>
            {error && <Text style={FormStyles.error}>{error}</Text>}
          </View>
        )}
      </View>
    </DismissKeyboard>
  );
};

export default ForgotPasswordScreen;
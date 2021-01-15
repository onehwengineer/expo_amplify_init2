import React, { useState } from 'react';
import { 
  Text, TouchableOpacity, View, 
  TextInput, ActivityIndicator,
  Keyboard, TouchableWithoutFeedback } from 'react-native';

import { signIn } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';

import {FormStyles, colors, sizes} from '../styles/Styles';  


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SignInScreen = ({ navigation }) => {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInLoading, setSignInLoading] = useState(false);
  const [error, setError] = useState();

  const signInUser = async () => {
    setSignInLoading(true);
    signIn(email, password)
      .then((r) => {
        console.log(r);
        dispatch({ type: 'SIGN_IN', token:  r.signInUserSession.accessToken.jwtToken });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setSignInLoading(false));
  };

  return (
    <DismissKeyboard>
      <View style={FormStyles.container}>
        <View style={FormStyles.containerSub}>
          <Text style={FormStyles.title}>Sign In</Text>
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
          <TouchableOpacity style={FormStyles.btn} onPress={signInUser}>
            { signInLoading ?
              <ActivityIndicator size="small" color="white" /> : 
              <Text style={FormStyles.btnText}>Sign In </Text>
            }
          </TouchableOpacity>
          {error && <Text style={FormStyles.error}>{error}</Text>}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={{ color: colors.gray2, fontSize: sizes.body }}>Forgot or Reset Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={{ color: colors.gray2, fontSize: sizes.body }}>Back to Welcome Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default SignInScreen;
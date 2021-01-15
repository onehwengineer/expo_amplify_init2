import React from 'react';
import { Image } from 'react-native';

import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import {colors} from '../styles/Styles';  

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({ isSignout }) => (
  <Stack.Navigator 
    initialRouteName="Welcome" 
    //headerMode="none"
    screenOptions={{
      //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      //headerShown: false,
      headerStyle: {
        height: 16 * 5,
        backgroundColor: colors.white,
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: () => <Image source={require('../../assets/icons/back.png')} />,
      headerBackTitleVisible: false,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: 16 * 2,
        paddingRight: 16,
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: 16,
      },              
    }}
  >
    
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        title: 'Welcome',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        //animationTypeForReplace: isSignout ? 'pop' : 'push',
        title: false, headerTransparent: true,
      }}
    />
    {/* Note that same "SignInScreen" is used with different name, "SignInNoHeader" */}
    <Stack.Screen 
      name="SignInNoHeader"
      component={SignInScreen}
      options={{
        title: "SignInNoHeader", headerShown: false,
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{
        title: false, headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        title: false, headerTransparent: true,
      }}
    />

  </Stack.Navigator>
);

export default AuthNavigator;
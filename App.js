// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerificationScreen from './screens/VerificationScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import MainScreen from './screens/MainScreen';


import MainDishesScreen from './screens/MainDishesScreen';
import SnacksScreen from './screens/SnacksScreen';
import DessertsScreen from './screens/DessertsScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen}options={{ headerShown: false }} />
       
        <Stack.Screen name="Ana Yemekler" component={MainDishesScreen} />
        <Stack.Screen name="Atıştırmalıklar" component={SnacksScreen} />
        <Stack.Screen name="Tatlılar" component={DessertsScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={({ route }) => ({ title: route.params.recipe.recipe })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

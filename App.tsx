import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import Welcome from './src/components/Welcome';
import ProfileScreen from './src/components/ProfileScreen';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_REDIRECT_URI } from '@env';

enableScreens();

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { user } = useAuth0();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Welcome" component={Welcome} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Auth0Provider 
        domain={AUTH0_DOMAIN} 
        clientId={AUTH0_CLIENT_ID}
        redirectUri={AUTH0_REDIRECT_URI}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Auth0Provider>
    </SafeAreaProvider>
  );
};

export default App;

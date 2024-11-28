// // // /**
// // //  * Sample React Native App
// // //  * https://github.com/facebook/react-native
// // //  *
// // //  * @format
// // //  */

// // // import React from 'react';
// // // import type {PropsWithChildren} from 'react';
// // // import {
// // //   SafeAreaView,
// // //   ScrollView,
// // //   StatusBar,
// // //   StyleSheet,
// // //   Text,
// // //   useColorScheme,
// // //   View,
// // // } from 'react-native';

// // // import {
// // //   Colors,
// // //   DebugInstructions,
// // //   Header,
// // //   LearnMoreLinks,
// // //   ReloadInstructions,
// // // } from 'react-native/Libraries/NewAppScreen';

// // // type SectionProps = PropsWithChildren<{
// // //   title: string;
// // // }>;

// // // function Section({children, title}: SectionProps): React.JSX.Element {
// // //   const isDarkMode = useColorScheme() === 'dark';
// // //   return (
// // //     <View style={styles.sectionContainer}>
// // //       <Text
// // //         style={[
// // //           styles.sectionTitle,
// // //           {
// // //             color: isDarkMode ? Colors.white : Colors.black,
// // //           },
// // //         ]}>
// // //         {title}
// // //       </Text>
// // //       <Text
// // //         style={[
// // //           styles.sectionDescription,
// // //           {
// // //             color: isDarkMode ? Colors.light : Colors.dark,
// // //           },
// // //         ]}>
// // //         {children}
// // //       </Text>
// // //     </View>
// // //   );
// // // }

// // // function App(): React.JSX.Element {
// // //   const isDarkMode = useColorScheme() === 'dark';

// // //   const backgroundStyle = {
// // //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// // //   };

// // //   return (
// // //     <SafeAreaView style={backgroundStyle}>
// // //       <StatusBar
// // //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// // //         backgroundColor={backgroundStyle.backgroundColor}
// // //       />
// // //       <ScrollView
// // //         contentInsetAdjustmentBehavior="automatic"
// // //         style={backgroundStyle}>
// // //         <Header />
// // //         <View
// // //           style={{
// // //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
// // //           }}>
// // //           <Section title="Step One">
// // //             Toki <Text style={styles.highlight}>App.tsx</Text> to change this
// // //             screen and then come back to see your edits.
// // //           </Section>
// // //           <Section title="See Your Changes">
// // //             <ReloadInstructions />
// // //           </Section>
// // //           <Section title="Debug">
// // //             <DebugInstructions />
// // //           </Section>
// // //           <Section title="Learn More">
// // //             Read the docs to discover what to do next:
// // //           </Section>
// // //           <LearnMoreLinks />
// // //         </View>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   sectionContainer: {
// // //     marginTop: 32,
// // //     paddingHorizontal: 24,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 24,
// // //     fontWeight: '600',
// // //   },
// // //   sectionDescription: {
// // //     marginTop: 8,
// // //     fontSize: 18,
// // //     fontWeight: '400',
// // //   },
// // //   highlight: {
// // //     fontWeight: '700',
// // //   },
// // // });

// // // export default App;

// // //App.tsx
// // import React from 'react';
// // import { SafeAreaView } from 'react-native';
// // import Welcome from './src/components/Welcome';

// // const App = () => {
// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <Welcome />
// //     </SafeAreaView>
// //   );
// // };

// // export default App;


// // App.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { enableScreens } from 'react-native-screens';
// import { AuthProvider, useAuth } from './src/context/AuthContext';
// import Welcome from './src/components/Welcome';
// import ProfileScreen from './src/components/ProfileScreen';

// // Enable react-native-screens for performance improvements
// enableScreens();

// const Stack = createStackNavigator();

// const AppNavigator: React.FC = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {!isAuthenticated ? (
//         <Stack.Screen name="Welcome" component={Welcome} />
//       ) : (
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       )}
//     </Stack.Navigator>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         <NavigationContainer>
//           <AppNavigator />
//         </NavigationContainer>
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import Welcome from './src/components/Welcome';
import ProfileScreen from './src/components/ProfileScreen';

// Enable react-native-screens for performance improvements
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
        domain="dev-mr0rccx8miz375v2.us.auth0.com" 
        clientId="Mck17XNhVQnGV8smNuSg2spbbBO61jPi"
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Auth0Provider>
    </SafeAreaProvider>
  );
};

export default App;
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from 'pages/WelcomePage';

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
      </Stack.Navigator>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </NavigationContainer>
  </SafeAreaView>
);

export default App;

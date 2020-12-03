import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import Heroes from 'pages/Heroes';
import theme from 'globals/styles/defaultTheme';
import Hero from 'pages/Hero';
import AppContainer from 'components/AppContainer/AppContainer';
import AddHero from 'pages/AddHero';
import { setConsole } from 'react-query';
import ErrorHandler from 'globals/ErrorHandler/ErrorHandler';

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
  },
};

// https://react-query.tanstack.com/docs/react-native
setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

export default function App(): JSX.Element {
  /*
  There is an issue with Firebase and react-native. It's showing a warning about long timers. For now there are two
  ways to handle this, and this is the best developer/user experience.
  */
  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <ErrorHandler>
          <AppContainer>
            <NavigationContainer theme={MyTheme}>
              <Stack.Navigator
                initialRouteName="Heroes"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Heroes" component={Heroes} />
                <Stack.Screen name="Hero" component={Hero} />
                <Stack.Screen name="AddHero" component={AddHero} />
              </Stack.Navigator>
              {/* eslint-disable-next-line react/style-prop-object */}
              <StatusBar style="light" backgroundColor="#065143" />
            </NavigationContainer>
          </AppContainer>
        </ErrorHandler>
      </ThemeProvider>
    </SafeAreaView>
  );
}

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import Heroes from 'pages/Heroes';
import theme from 'globals/styles/defaultTheme';
import Hero from 'pages/Hero';
import AppContainer from 'components/AppContainer/AppContainer';

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Heroes"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Heroes" component={Heroes} />
              <Stack.Screen name="Hero" component={Hero} />
            </Stack.Navigator>
            {/* eslint-disable-next-line react/style-prop-object */}
            <StatusBar style="light" backgroundColor="#065143" />
          </NavigationContainer>
        </AppContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
}


import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import Root from './Root/Root';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  
const Stack = createNativeStackNavigator();
  return (
    <>

    <SafeAreaProvider>
    <StatusBar style='light'/>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />

  </Stack.Navigator>
  </NavigationContainer>
  </SafeAreaProvider>
  </>

  );
}


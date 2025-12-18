import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewGameScreen from '../screens/NewGameScreen';
import LoadingScreen from '../screens/LoadingScreen';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import ConfigScreen from '../screens/ConfigScreen';

// //definir parametros
export type RootStackParams = {
  NewGame: undefined;
  Loading: undefined;
  Game: undefined;
  Result: undefined;
  Config: undefined;
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id="NewGame">
        <Stack.Screen name="NewGame"
          component={NewGameScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Game"
          component={GameScreen}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen name="Result"
          component={ResultScreen}
          options={{ headerShown: false }}
        />


        <Stack.Screen name="Config"
          component={ConfigScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

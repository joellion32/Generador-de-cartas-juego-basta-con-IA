import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/presentation/navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { getItem, setItem } from './src/core/services/local-storage.service';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './src/config/theme';


// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});


export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {

    if (scheme === 'dark') {
      NavigationBar.setBackgroundColorAsync(colors.background);
      NavigationBar.setButtonStyleAsync('light');
    } else {
      NavigationBar.setBackgroundColorAsync('#FFFFFF');
      NavigationBar.setButtonStyleAsync('dark');
    }

    setInitConfig()
  }, [])

  // guardar configuracion 10 cartas por defecto, si no hay total de cartas guardados
  const setInitConfig = async () => {
    const totalCards = await getItem({ key: "totalCards" });
    if (totalCards == null || totalCards.length === 0) {
      await setItem({ key: "totalCards", value: process.env.EXPO_PUBLIC_DEFAULT_CARDS })
    }
  }
  return (
    <>
      <StatusBar style={scheme == 'dark' ? 'dark' : 'light'} />
      <Navigation />
    </>
  );
}


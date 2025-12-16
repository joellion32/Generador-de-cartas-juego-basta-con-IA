import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/presentation/navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}


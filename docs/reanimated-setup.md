# Reanimated 2 — Setup y recomendaciones

Instalación
```bash
yarn add react-native-reanimated
```

Babel
Asegura que `babel.config.js` contenga el plugin (al final del array `plugins`):

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

Android / iOS
- Rebuild completo después de instalar: `yarn android` o `yarn ios`.
- En iOS corre `cd ios && pod install`.

Testing
- Reanimated necesita mocks en Jest; añade el mock recomendado en la documentación oficial.

Buenas prácticas
- Usa `useSharedValue`, `useAnimatedStyle`, `withTiming`/`withSpring`.
- Evita llamar a funciones JS costosas dentro de `worklet`s; usa `runOnJS` solo cuando sea necesario.
- Mantén las animaciones independientes del render de React tanto como sea posible.

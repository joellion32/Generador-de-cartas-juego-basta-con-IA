# Getting Started

Este documento explica cómo configurar y ejecutar el proyecto localmente.

Requisitos
- Node.js 16+ (recomendado 18)
- Yarn o npm
- Expo CLI (si usas Expo) o entorno React Native CLI configurado
- Xcode (macOS) para iOS
- Android Studio para Android

Instalación
```bash
# clona el repo
git clone <tu-repo-url> basta-card-ia
cd basta-card-ia

# instalar dependencias
yarn install
# o
npm install
```

Instalación de dependencias nativas requeridas
```bash
yarn add react-native-reanimated react-native-gesture-handler
# luego sigue pasos de instalación nativa según la plataforma
```

Configuración de Babel (Reanimated)
Asegúrate de tener el plugin de Reanimated en `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

Ejecutar la app
- iOS:
```bash
npx pod-install ios
yarn ios
```
- Android:
```bash
yarn android
```
- Metro (reset cache si hay problemas):
```bash
yarn start --reset-cache
```

Notas
- Si usas Expo Managed, sigue la documentación de Expo para instalar `react-native-reanimated` y `react-native-gesture-handler`.
- Reinicia Metro bundler después de instalar `react-native-reanimated`.

# react-native-gesture-handler — Setup

Instalación
```bash
yarn add react-native-gesture-handler
```

Configuración (iOS)
- `cd ios && pod install`
- Asegúrate de envolver la App en `GestureHandlerRootView` (si usas RN puro):

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ... */}
    </GestureHandlerRootView>
  );
}
```

Configuración (Android)
- No olvidar añadir la dependencia en `MainActivity` según la documentación si usas versión nativa antigua.

Notas
- Rebuild nativo después de la instalación.
- Para Expo Managed, sigue la guía de Expo.

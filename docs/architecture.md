# Arquitectura

Visión general

La aplicación sigue una arquitectura modular simple separando presentación, lógica de negocio e infraestructura:

- Presentación (`src/presentation`) — UI, pantallas, navegación y hooks de UI.
- Core (`src/core`) — modelos, servicios (lógica del dominio), persistencia ligera.
- Infrastructure (`src/infrastructure`) — adaptadores a librerías externas (ej. AsyncStorage).

Flujo de datos
- Los componentes consumen datos desde `stores` (p. ej. `src/presentation/store/player-store.ts`) y llaman a `services` para operaciones complejas o persistencia.
- Los `hooks` encapsulan lógica para composición (ej. `useGeminiModel`, `useTinderCarouselHook`).

Modelos clave
- `Card` — modelo de carta con propiedades usadas por el carousel.
- `Player` — modelo de jugador con estado y acciones.

Consideraciones de rendimiento
- El `TinderCarousel` usa `react-native-reanimated` para animaciones a 60 FPS y `react-native-gesture-handler` para gestos.
- Mantener render mínimos por tarjeta y usar `useCallback` / `memo` cuando corresponda.

Extensiones futuras
- Añadir capa de caché o persistencia avanzada.
- Separar lógica más compleja en un dominio claramente definido.

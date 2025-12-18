# Desarrollo

Resumen del flujo de trabajo de desarrollo y estructura del proyecto.

Estructura relevante
- `src/presentation/` – Pantallas y componentes UI
  - `components/` – Componentes reutilizables (ButtonComponent, CardComponent, TinderCarousel, ...)
  - `hooks/` – Hooks personalizados
  - `navigation/` – Navegación de la app
  - `screens/` – Vistas principales (GameScreen, ResultScreen, ...)
- `src/core/` – Modelos y servicios de negocio
  - `models/` – Tipos y modelos (`card.model.ts`, `player.model.ts`)
  - `services/` – Integración con APIs / lógica (e.g., `gemini-model.service.ts`)
- `src/infrastructure/` – Interfaces y adaptadores (ej. almacenamiento asíncrono)
- `src/config/` – Temas y utilidades de configuración

Buenas prácticas
- Mantén componentes puros y sin lógica de negocio; extrae lógica compleja a hooks o servicios.
- Usa TypeScript para tipar modelos y props.
- Mantén los estilos en `StyleSheet.create` y evita cálculos pesados en render.

Scripts útiles (package.json)
- `yarn start` – iniciar Metro
- `yarn ios` – compilar y ejecutar iOS
- `yarn android` – compilar y ejecutar Android

Formato de commits
- Usa mensajes de commit claros: `feat:`, `fix:`, `chore:`, `docs:`

Revisión de PR
- Incluye descripción, pasos para reproducir y capturas si aplica.
- Ejecuta pruebas y linters antes de crear PR.

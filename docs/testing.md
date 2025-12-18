# Testing

Estado actual
- Actualmente el proyecto no incluye una suite de pruebas configurada por defecto.

Recomendación
- Añadir `jest` + `@testing-library/react-native` para pruebas de componentes.

Instalación sugerida
```bash
yarn add -D jest @types/jest @testing-library/react-native react-test-renderer
```

Ejemplo básico de configuración (`package.json` scripts)
```json
"scripts": {
  "test": "jest"
}
```

Escritura de tests
- Testear componentes con `render` de `@testing-library/react-native`.
- Mockear módulos nativos y Reanimated según la guía oficial de `react-native-reanimated`.

Notas sobre Reanimated en tests
- Reanimated requiere mocks especiales en Jest; revisa la guía de Reanimated para la configuración de Jest.

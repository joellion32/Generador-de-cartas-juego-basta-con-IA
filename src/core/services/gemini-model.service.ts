/**
 * Genera contenido utilizando Gemini. Intenta cargar la SDK en tiempo de ejecución.
 * Si falla (por ejemplo, en React Native), devuelve un JSON de respaldo.
 */
export async function main(
  numberOfCards: number,
  categories?: string[]
) {
  try {
    // Carga perezosa para evitar evaluar el módulo en entornos no compatibles
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Genera ${numberOfCards} cartas tipo observación/deducción (ej: "Algo que veas alrededor").

    Salida: SOLO JSON válido.
      Array de ${numberOfCards} objetos con estructura exacta:
      {"id":1,"title":"Un actor"}

    Reglas:
    - id: 1..${numberOfCards} (sin saltos)
    - title: corto, español neutro, apto todo público
    - Contextos todos distintos (personas, objetos, acciones, emociones, lugares, conceptos, etc.)
    - No repetir títulos
    - Sin descripciones, emojis ni puntuación final
`,
    });

    // Algunas versiones del SDK exponen text() como método
    // y en otras como propiedad; contemplamos ambas.
    const text = typeof (response as any).text === 'function'
      ? (response as any).text()
      : (response as any).text;
    return text;
  } catch (err) {
    console.error('[Gemini fallback]', err);
    // Fallback: genera un JSON válido de ejemplo con numberOfCards elementos
    const stub = Array.from({ length: numberOfCards || 10 }, (_, i) => ({
      id: i + 1,
      title: `Carta de ejemplo ${i + 1}`,
    }));
    return JSON.stringify(stub);
  }
}

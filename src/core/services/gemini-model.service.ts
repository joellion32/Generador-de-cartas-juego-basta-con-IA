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
      contents: `Genera JSON (array de ${numberOfCards} objetos) para juego Basta. Estructura: {"id":1..${numberOfCards},"title":"Algo que encuentras en el baño"} 
      Reglas:
        -Títulos cortos, español neutro, ATP.
        -Contextos variados (objetos, lugares, emociones, etc).
        -Que no se repitan y que sean aleatorias
        -Sin puntos finales, emojis ni texto extra. Salida: SOLO JSON.
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

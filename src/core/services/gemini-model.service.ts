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
      contents: `Genera ${numberOfCards} cartas de un juego de observación y deducción, similares a la carta que dice "Algo que veas alrededor".

Cada carta debe cumplir las siguientes condiciones:
- Tener un titulo corto y claro.
- Representar un contexto diferente, como personas, peliculas, objetos, acciones, emociones, lugares, situaciones cotidianas o conceptos abstractos.
- Estar redactada en español neutro.
- Ser apta para todo publico.
- No repetir titulos ni contextos.

Formato de salida obligatorio:
- Devuelve unicamente un JSON valido, sin texto adicional.
- El JSON debe ser un array de ${numberOfCards} objetos.
- Cada objeto debe tener exactamente esta estructura:
{"id": 1, "title": "Un actor"}

Reglas adicionales:
- El campo id debe ir del 1 al ${numberOfCards}, sin saltos.
- El campo title debe ser una frase corta, sin signos de puntuacion al final.
- No incluyas descripciones, solo el title.
- No uses emojis.`,
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

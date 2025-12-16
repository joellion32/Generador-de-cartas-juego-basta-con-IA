import { useState } from "react";
import { main } from "../../core/services/gemini-model.service";

export const useGeminiModel = () => {
    /**
     * Genera el contenido utilizando el modelo Gemini.
     * @param prompt 
     * @param numberOfQuestions 
     * @param difficulty 
     */
    const generateContent = async (numberOfCards?: number) => {
        const model = await main(numberOfCards);
        return model.replace('json', '').replace(/```/g, '').trim();
    }

    return {
        generateContent
    }

}
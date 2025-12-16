import { create } from 'zustand';
import { Card } from '../../core/models/card.model';

export interface CardState {
    cards: Card[]; // Lista de cartas
    setCards: (cards: Card[]) => void; // Establecer las cartas
}

export const useCardStore = create<CardState>()((set, get) => ({
    cards: [],
    setCards: (cards) => set({ cards }),
}));
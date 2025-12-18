import { create } from 'zustand';
import { Card } from '../../core/models/card.model';

export interface CardState {
    cards: Card[]; // Lista de cartas
    setCards: (cards: Card[]) => void; // Establecer las cartas
    // Eliminar una o varias cartas por su id
    removeById: (id: Card['id'] | Card['id'][]) => void;
    // Eliminar cartas cuyo `typeof id` coincida con el tipo provisto
    removeByIdType: (type: 'string' | 'number' | 'undefined' | 'object' | 'boolean' | 'symbol' | 'bigint') => void;
}

export const useCardStore = create<CardState>()((set, get) => ({
    cards: [],
    setCards: (cards) => set({ cards }),
    removeById: (id) => {
        const ids = Array.isArray(id) ? id : [id];
        set((state) => ({
            cards: state.cards.filter((c) => !ids.includes(c.id)),
        }));
    },
    removeByIdType: (type) => {
        set((state) => ({
            cards: state.cards.filter((c) => typeof c.id !== type),
        }));
    },
}));
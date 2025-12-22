import React, {useState} from 'react'
import { usePlayersStore } from '../store/player-store';
/**
 * Hook para gestionar la adición de nuevos jugadores.
 * @returns - Un objeto que contiene la lista de nombres de jugadores y una función para añadir un nuevo jugador.
 */
export const useNewPlayer = () => {
    const {players} = usePlayersStore()


    const addPlayer = (name: string, points: number) => {
        // Actualiza el estado global usando Zustand    
        usePlayersStore.getState().setPlayers([...players, {name, points}]);
        console.log(usePlayersStore.getState().players);
    }

    return {
        addPlayer
    }
}
import { create } from 'zustand';
import { Player } from '../../core/models/player.model';

interface PlayersStore {
  players: Player[];

  getPoints: (name: string) => number; // Obtener puntos de un jugador por su nombre
  addPlayer: (name: string) => void; // Agregar un nuevo jugador
  removePlayer: (name: string) => void; // Eliminar un jugador por su nombre
  setPlayers: (players: Player[]) => void; // Establecer la lista de jugadores
  addPoints: (name: string, points: number) => void; // Sumar puntos a un jugador específico
  subtractPoints: (name: string, points: number) => void; // Restar puntos a un jugador específico
  resetPoints: () => void; // Reiniciar puntos de todos los jugadores a 0
}

export const usePlayersStore = create<PlayersStore>((set, get) => ({
  players: [],

  // Obtener puntos de un jugador por su nombre
  getPoints: (name: string) => {
    const player = get().players.find((p) => p.name === name);
    return player ? player.points : 0;
  },
  // Establecer la lista de jugadores
  setPlayers: (players) => set({ players }),

  // Agregar un nuevo jugador con 0 puntos
  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, { name, points: 0 }],
    })),

  // Eliminar un jugador por su nombre
  removePlayer: (name) =>
    set((state) => ({
      players: state.players.filter((player) => player.name !== name),
    })),

  // Sumar puntos a un jugador específico
  addPoints: (name, points) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.name === name
          ? { ...player, points: player.points + points }
          : player
      ),
    })),

  // Restar puntos a un jugador específico (sin permitir negativos)
  subtractPoints: (name, points) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.name === name
          ? { ...player, points: Math.max(0, player.points - points) }
          : player
      ),
    })),

  // Reiniciar puntos de todos los jugadores a 0  
  resetPoints: () =>
    set((state) => ({
      players: state.players.map((player) => ({
        ...player,
        points: 0,
      })),
    })),
}));

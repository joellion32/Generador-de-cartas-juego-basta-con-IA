/**
 * Función para seleccionar el jugador con más puntos.
 * @param players
 * @returns El jugador ganador o null si hay empate, todos tienen 0 o no hay jugadores.
 */
export const selectPlayerWinner = (players: { name: string; points: number }[]) => {
    if (players.length === 0) return null;

    // Obtener el puntaje máximo
    const maxPoints = Math.max(...players.map(p => p.points));

    // Si todos tienen 0 puntos
    if (maxPoints === 0) return null;

    // Filtrar los jugadores con el puntaje máximo
    const topPlayers = players.filter(p => p.points === maxPoints);

    // Si hay empate
    if (topPlayers.length > 1) return 1;

    // Ganador único
    return topPlayers[0];
};

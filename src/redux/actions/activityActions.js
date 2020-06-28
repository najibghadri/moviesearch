export const CARD = "CARD";
export const GAME_UPDATE = "GAME_UPDATE";

export function card(card) {
  return { type: CARD, card: card };
}

export function game_update(gameUpdate) {
  return { type: GAME_UPDATE, gameUpdate: gameUpdate };
}

import { BattlePokemon } from "./types.js";
import { Pokemon } from "../pokeapi/pokeapi.js";
export function calculateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
): number {
  return Math.max(1, attacker.attack - defender.defense);
}
export function getStat(
  pokemon: Pokemon,
  name: string,
): number {
  return pokemon.stats.find((entry) => entry.stat.name === name)?.base_stat ?? 0;
}
export function applyDamage(
  defender: BattlePokemon,
  damage: number,
): BattlePokemon {
  return {
    ...defender,
    hp: Math.max(0, defender.hp - damage),
  };
}
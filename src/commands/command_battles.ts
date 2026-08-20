import { calculateDamage, getStat} from "../game/battles.js";
import { State } from "../pokeapi/state.js";
import type { BattlePokemon } from "../game/types.js";
export async function commandBattle(
  state: State,
  ...args: string[]
): Promise<void> {
    const [attackerName, defenderName] = args;

if (!attackerName || !defenderName) {
  console.log("Usage: battle <attacker> <defender>");
  return;
}

const attackerPokemon = state.caughtPokemon[attackerName];
const defenderPokemon = state.caughtPokemon[defenderName];

if (!attackerPokemon || !defenderPokemon) {
  console.log("Both Pokémon must be in your Pokédex.");
  return;
  }
  const attacker: BattlePokemon = {
    name: attackerPokemon.name,
    hp: 100,
    attack: getStat(attackerPokemon, "attack"),
    defense: getStat(attackerPokemon, "defense"),
  };
  
const defender: BattlePokemon = {
  name: defenderPokemon.name,
  hp: 100,
  attack: getStat(defenderPokemon, "attack"),
  defense: getStat(defenderPokemon, "defense"),
};
const damage = calculateDamage(attacker, defender);
const defenderHp =
  state.caughtPokemonHealth[defender.name] ??
  getStat(defenderPokemon, "hp");
const remainingHp = Math.max(0, defenderHp - damage);
state.caughtPokemonHealth[defender.name] = remainingHp;
console.log(
  `${attacker.name} attacks ${defender.name} for ${damage} damage!`,
);
console.log(`${defender.name} has ${remainingHp} HP remaining.`);

}

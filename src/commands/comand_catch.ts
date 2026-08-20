import { State } from "../pokeapi/state.js";
import { getStat } from "../game/battles.js";

export async function commandCatch(state: State, ...args: string[]) {
    const rawName = args[0]
    const now = Date.now();
    if (!rawName) {
        console.log("Please provide a Pokémon name");
        return;
        }
        const pokemonName = rawName.toLowerCase()
        const windowMs = 60_000;
        const maxAttempts = 3;

        const record = state.catchAttempts[pokemonName];

        if (state.caughtPokemon[pokemonName]) {
        console.log(`${pokemonName} is already caught.`);
        return;
        }

        if (!record || now - record.startedAt >= windowMs) {
        state.catchAttempts[pokemonName] = {
            count: 0,
            startedAt: now,
        };
        }

        const attempts = state.catchAttempts[pokemonName];

        if (attempts.count >= maxAttempts) {
        console.log("Too many attempts. Try again later.");
        return;
        }

        attempts.count++;
    
    
    try{
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonName)
         console.log(`Throwing a Pokeball at ${pokemonName}...`)
         const chance = Math.floor((Math.random() * pokemon.base_experience))
         if (chance > 40){
            console.log(`${pokemonName} escaped!`)
         }
         if (chance <= 40){
            console.log(`${pokemonName} was caught!`)
            console.log(`you may now inspect ${pokemonName} with the inspect command`)
            const hp = getStat(pokemon, "hp")
            state.caughtPokemon[pokemon.name] = pokemon;
            state.caughtPokemonHealth[pokemon.name] = hp;
         }
    }catch(error){
        console.log((error as Error).message)
    }
}
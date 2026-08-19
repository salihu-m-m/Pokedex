import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    const pokemonName = args[0]
    if (!pokemonName){
        console.log("Please provide a pokemon name")
        return;
    }
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
            state.caughtPokemon[pokemon.name] = pokemon;
         }
    }catch(error){
        console.log((error as Error).message)
    }
}
import type {State} from "./state.js"

export async function commandExplore(state:State, ...args: string[]){
     const locationName = args[0];
     if (!locationName){
        console.log("provide a location name")
        return;
     }
    try{
        const location = await state.pokeAPI.fetchLocation(locationName)
        console.log(`Exploring ${locationName}...`)
        console.log("Found Pokemon:")
        for (const encounter of location.pokemon_encounters) {
            console.log(` - ${encounter.pokemon.name}`)
        }
    }catch (error){
        console.log((error as Error).message);
    }
}

import { Interface } from "node:readline";
import * as readline from 'readline'
import { getCommands } from "../commands/commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};
export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    caughtPokemon: Record<string, Pokemon>;
    caughtPokemonHealth: Record<string, number>;
    pokeAPI : PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    catchAttempts: Record<
  string,
  {
    count: number;
    startedAt: number;
  }
>;
}
export function initState(): State{
 const r1 = readline.createInterface({
      input : process.stdin,
      output: process.stdout,
      prompt : "Pokedex > "
});
  return {
    readline: r1,
    commands: getCommands(),
    pokeAPI: new PokeAPI(2000),
    nextLocationsURL: "",
    prevLocationsURL: "",
    caughtPokemon: {},
    caughtPokemonHealth: {},
    catchAttempts: {}

  }
}
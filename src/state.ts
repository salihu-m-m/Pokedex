import { Interface } from "node:readline";
import * as readline from 'readline'
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};
export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    
    pokeAPI : PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
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
    prevLocationsURL: ""
  }
}
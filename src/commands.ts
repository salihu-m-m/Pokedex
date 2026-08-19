import { commandExit } from "./command_exit.js";
import type { CLICommand } from "./state.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map : {
      name: "map",
      description: "Go to next location",
      callback : commandMapForward,
    },
    mapb : {
      name : "mapb",
      description: "Go to previous location",
      callback : commandMapBack,
    }
  }
}
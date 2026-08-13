import { commandExit } from "./command_exit.js";
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};
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
  }
  };
export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log(); 

  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
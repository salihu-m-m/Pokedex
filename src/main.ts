// repl.js actually refers to repl.ts
import { startREPL } from "./.repl.js";
import { commandExit } from "./command_exit.js";

function main() {
  startREPL();
}

main();
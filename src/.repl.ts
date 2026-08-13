import { get } from 'http';
import * as readline from 'readline'
import { getCommands } from './command_help.js';
export function cleanInput(input: string): string[] {
  const cleaned = input.toLowerCase().trim();
  const words = cleaned.split(/\s+/)
  return words
}

export const r1 = readline.createInterface({
  input : process.stdin,
  output: process.stdout,
  prompt : "Pokedex > "
})
export function startREPL(){
  r1.prompt()
  r1.on("line",(input) =>{
    const words = cleanInput(input)
    if (words.length == 0){
      r1.prompt()
    }else{
      const commandName = words[0]
     const commands = getCommands()
     const cmd = commands[commandName]
     if (commandName in commands){
      cmd.callback(commands);
     }else{
      console.log("Unknown command")
     }
        r1.prompt()
    }
  })



}
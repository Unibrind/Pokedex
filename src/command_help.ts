import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log(`Welcome to the Pokedex!
Usage:`);
    for (const key in commands){
        console.log(`${commands[key].name}: ${commands[key].description}`)
    }
}
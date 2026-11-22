import { createInterface } from "node:readline";
import { getCommands } from "./registry.js";

export function cleanInput(a:string): string[] {
    let trimmedInput = a.trim();
    
    if (trimmedInput === ""){
        return [];
    }
    let inputLowercase = trimmedInput.toLowerCase().split(/\s+/);
    return inputLowercase;
}


export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    function callback (input:string) {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0){
            rl.prompt();
            return;
        }
        
        const commands = getCommands();
        const command = commands[cleanedInput[0]];
        try {
            if (command != undefined){
                command.callback(commands);
            }
            else {
                console.log("Unknown command");
            }
        }
        catch (err){
            console.log(err);
        }

        rl.prompt();
    }
    rl.on("line", callback);

}


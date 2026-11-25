import type { State } from "./state.js";

export function cleanInput(a:string): string[] {
    const trimmedInput = a.trim();
    
    if (trimmedInput === ""){
        return [];
    }
    const inputLowercase = trimmedInput.toLowerCase().split(/\s+/);
    return inputLowercase;
}


export function startREPL(state: State) {
    const rl = state.readline;
    rl.prompt();
    async function callback (input:string) {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0){
            rl.prompt();
            return;
        }
        
        const command = state.commands[cleanedInput[0]];
        try {
            if (command != undefined){
                await command.callback(state);
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


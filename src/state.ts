import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";

export type State = {
    readline: Interface;
    commands: ReturnType<typeof getCommands>;
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
    const commands  = getCommands();
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: commands
    };
}
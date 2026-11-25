import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI } from "./pokeapi.js";
import type { CLICommand } from "./command.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}
export function initState(): State {
    const commands  = getCommands();
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: commands,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}
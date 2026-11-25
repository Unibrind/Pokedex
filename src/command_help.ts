import type { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log(`Welcome to the Pokedex!
Usage:`);

    for (const key in state.commands) {
        console.log(`${state.commands[key].name}: ${state.commands[key].description}`);
    }
}
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./command.js";
import { map, mapb } from "./command_map.js";


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
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: map,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: mapb,
    },
  };
}
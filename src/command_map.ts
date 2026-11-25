import type { State } from "./state.js";

export async function map(state: State) {
    const response = await state.pokeAPI.fetchLocations(state.nextLocationsURL??undefined);

    for (let zone of response.results){
    console.log(zone.name);
    }
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

}



export async function mapb(state: State) {

    if (state.prevLocationsURL === null){
        console.log("you're on the first page");
        return;
    }

    const response = await state.pokeAPI.fetchLocations(state.prevLocationsURL??undefined);

    for (let zone of response.results){
    console.log(zone.name);
    }
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

}
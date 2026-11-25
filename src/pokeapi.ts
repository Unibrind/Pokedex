export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2/location-area";

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(pageURL??PokeAPI.baseURL);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/${locationName}`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  }
}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous:string | null,
    results: {
        name: string,
        url: string
    }[],
};

export type Location = {
  // add properties here
};
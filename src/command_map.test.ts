
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { map, mapb } from "./command_map.js";
import type { State } from "./state.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("map", () => {
  let state: State;

  beforeEach(() => {
    state = {
      pokeAPI: {
        fetchLocations: vi.fn(),
      } as any,
      nextLocationsURL: null,
      prevLocationsURL: null,
    } as State;

    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  test("should display the next 20 locations", async () => {
    const mockResponse = {
      count: 2,
      results: [
        { name: "canalave-city-area", url: "url1" },
        { name: "eterna-city-area", url: "url2" },
      ],
      next: "next-page-url",
      previous: null,
    };

    vi.mocked(state.pokeAPI.fetchLocations).mockResolvedValue(mockResponse);

    await map(state);

    expect(state.pokeAPI.fetchLocations).toHaveBeenCalledWith(undefined);
    expect(console.log).toHaveBeenCalledWith("canalave-city-area");
    expect(console.log).toHaveBeenCalledWith("eterna-city-area");
    expect(state.nextLocationsURL).toBe("next-page-url");
    expect(state.prevLocationsURL).toBe(null);
  });
});

describe("mapb", () => {
  let state: State;

  beforeEach(() => {
    state = {
      pokeAPI: {
        fetchLocations: vi.fn(),
      } as any,
      nextLocationsURL: "next-page-url",
      prevLocationsURL: "previous-page-url",
    } as State;

    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  test("should display the previous 20 locations", async () => {
    const mockResponse = {
      count: 1,
      results: [
        { name: "canalave-city-area", url: "url1" },
      ],
      next: "next-page-url",
      previous: null,
    };

    vi.mocked(state.pokeAPI.fetchLocations).mockResolvedValue(mockResponse);

    await mapb(state);

    expect(state.pokeAPI.fetchLocations).toHaveBeenCalledWith("previous-page-url");
    expect(console.log).toHaveBeenCalledWith("canalave-city-area");
    expect(state.nextLocationsURL).toBe("next-page-url");
    expect(state.prevLocationsURL).toBe(null);
  });

  test("should display a message when on the first page", async () => {
    state.prevLocationsURL = null;

    await mapb(state);

    expect(console.log).toHaveBeenCalledWith("you're on the first page");
    expect(state.pokeAPI.fetchLocations).not.toHaveBeenCalled();
  });
});

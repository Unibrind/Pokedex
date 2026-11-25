
import { describe, expect, test, vi, afterEach } from "vitest";
import { PokeAPI } from "./pokeapi.js";

describe("PokeAPI", () => {
  const api = new PokeAPI();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("fetchLocations should return location areas", async () => {
    const mockResponse = {
      count: 100,
      next: "next-url",
      previous: null,
      results: [
        { name: "canalave-city-area", url: "url1" },
      ],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }),
    );

    const result = await api.fetchLocations();

    expect(result).toEqual(mockResponse);
  });

  test("fetchLocations should throw an error when request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(api.fetchLocations()).rejects.toThrow("HTTP error: 500");
  });

  test("fetchLocation should return location details", async () => {
    const mockLocation = {
      id: 1,
      name: "canalave-city-area",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockLocation),
      }),
    );

    const result = await api.fetchLocation("canalave-city-area");

    expect(result).toEqual(mockLocation);
  });
});

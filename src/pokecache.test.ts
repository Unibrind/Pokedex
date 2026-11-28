
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("should add and retrieve an entry", () => {
    const cache = new Cache(1000);

    try {
      cache.add<string>("pokemon", "Pikachu");

      const result = cache.get<string>("pokemon");

      expect(result).toBe("Pikachu");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("should return undefined for a missing key", () => {
    const cache = new Cache(1000);

    try {
      const result = cache.get<string>("missing");

      expect(result).toBeUndefined();
    } finally {
      cache.stopReapLoop();
    }
  });

  test("should replace an existing value", () => {
    const cache = new Cache(1000);

    try {
      cache.add<string>("pokemon", "Pikachu");
      cache.add<string>("pokemon", "Charizard");

      const result = cache.get<string>("pokemon");

      expect(result).toBe("Charizard");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("should store multiple keys without overwriting each other", () => {
    const cache = new Cache(1000);

    try {
      cache.add<string>("pokemon", "Pikachu");
      cache.add<number>("level", 25);
      cache.add<boolean>("captured", true);

      expect(cache.get<string>("pokemon")).toBe("Pikachu");
      expect(cache.get<number>("level")).toBe(25);
      expect(cache.get<boolean>("captured")).toBe(true);
    } finally {
      cache.stopReapLoop();
    }
  });

  test("should keep fresh entries available", () => {
    const cache = new Cache(1000);

    try {
      cache.add<string>("pokemon", "Pikachu");

      expect(cache.get<string>("pokemon")).toBe("Pikachu");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("should eventually remove old entries", async () => {
    const cache = new Cache(50);

    try {
      cache.add<string>("pokemon", "Pikachu");

      await expect.poll(
        () => cache.get<string>("pokemon"),
        { timeout: 1000 },
      ).toBeUndefined();
    } finally {
      cache.stopReapLoop();
    }
  });
});

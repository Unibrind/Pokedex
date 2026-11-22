import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";



describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "pika pika pIIIIII KKKKAAAAAAAA TCHOUUUUUUUUUUUUUUUUUUUU",
    expected: ["pika", "pika", "piiiiii", "kkkkaaaaaaaa", "tchouuuuuuuuuuuuuuuuuuuu"],
  },

  {
    input: "in carnage  i bloom LIKE flower    in the daWn",
    expected: ["in", "carnage", "i", "bloom", "like", "flower", "in", "the", "dawn"],
  },

  {
    input: "",
    expected: [],
},

])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    // TODO : appeler cleanInput avec input ici
    const actual = cleanInput(input);

    // Les fonctions expect et toHaveLength viennent de Vitest.
    // Elles feront échouer le test si la condition n'est pas respectée.
    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      // De même, toBe fera échouer le test
      // si les valeurs ne sont pas identiques.
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
import React from "react";
// import { render } from '@testing-library/react'
// import Index from '../pages/index'
import { extractGistLanguges, computeGistTitle } from "../components/GistsList";

describe("GistsList", () => {
  describe("Gist Title", () => {
    test("Computing Gist Title", () => {
      const fixture = {
        owner: {
          login: "abusada",
        },
        files: {
          "one.html": {
            language: "HTML",
          },
        },
      };
      const expected = "abusada/one.html";
      const actual = computeGistTitle(fixture.owner.login, fixture.files);
      expect(expected).toEqual(actual);
    });
  });

  describe("Extracting Gist Languages from Files", () => {
    test("One File", () => {
      const fixture = {
        files: {
          "one.html": {
            language: "HTML",
          },
        },
      };
      const expected = ["HTML"];
      const actual = extractGistLanguges(fixture.files);
      expect(expected).toEqual(actual);
    });

    test("Two files -- Duplicate language", () => {
      const fixture = {
        files: {
          "one.html": {
            language: "HTML",
          },
          "two.html": {
            language: "HTML",
          },
        },
      };
      const expected = ["HTML"];
      const actual = extractGistLanguges(fixture.files);
      expect(expected).toEqual(actual);
    });

    test("Multiple files -- includes null (text/plain)", () => {
      const fixture = {
        files: {
          "one.html": {
            language: null,
          },
          "two.html": {
            language: "HTML",
          },
        },
      };
      const expected = ["HTML"];
      const actual = extractGistLanguges(fixture.files);
      expect(expected).toEqual(actual);
    });

    test("Multiple files -- includes duplicates and empty string", () => {
      const fixture = {
        files: {
          one: {
            language: "",
          },
          "two.html": {
            language: "HTML",
          },
          "three.js": {
            language: "JAVASCRIPT",
          },
          "three.js": {
            language: "JAVASCRIPT",
          },
        },
      };
      const expected = ["HTML", "JAVASCRIPT"];
      const actual = extractGistLanguges(fixture.files);
      expect(expected).toEqual(actual);
    });
  });
});

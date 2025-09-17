const { sortPagesObj } = require("../utils/report");
const { test, expect } = require("@jest/globals");

test("sortPagesObj easy", () => {
  const input = {
    "https://example.com": 1,
    "https://example.com/path": 3,
  };
  const expected = [
    ["https://example.com/path", 3],
    ["https://example.com", 1],
  ];
  const actual = sortPagesObj(input);
  expect(actual).toEqual(expected);
});

test("sortPagesObj complex", () => {
  const input = {
    "https://example.com": 1,
    "https://example.com/path": 7,
    "https://example.com/path/to": 2,
    "https://example.com/about": 5,
    "https://example.com/tags": 3,
    "https://example.com/path/to/there": 6,
    "https://example.com/contact": 9,
    "https://example.com/profile": 4,
  };
  const expected = [
    ["https://example.com/contact", 9],
    ["https://example.com/path", 7],
    ["https://example.com/path/to/there", 6],
    ["https://example.com/about", 5],
    ["https://example.com/profile", 4],
    ["https://example.com/tags", 3],
    ["https://example.com/path/to", 2],
    ["https://example.com", 1],
  ];
  const actual = sortPagesObj(input);
  expect(actual).toEqual(expected);
});

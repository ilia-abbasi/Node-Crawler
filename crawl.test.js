const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const inputs = [
    "https://example.com",
    "http://karsanj.net/login",
    "https://my.sanjesh.org",
  ];
  const expecteds = ["example.com", "karsanj.net/login", "my.sanjesh.org"];
  for (let i = 0; i < inputs.length; i++) {
    const actual = normalizeURL(inputs[i]);
    expect(actual).toEqual(expecteds[i]);
  }
});

test("normalizeURL strip trailing slash", () => {
  const inputs = [
    "https://example.com/to/the/path/",
    "http://karsanj.net/login/",
    "https://my.sanjesh.org/",
  ];
  const expecteds = [
    "example.com/to/the/path",
    "karsanj.net/login",
    "my.sanjesh.org",
  ];
  for (let i = 0; i < inputs.length; i++) {
    const actual = normalizeURL(inputs[i]);
    expect(actual).toEqual(expecteds[i]);
  }
});

test("normalizeURL capitals", () => {
  const inputs = [
    "https://EXAMPLE.COM/SOMETHING",
    "http://kArSaNj.NeT/lOgIn",
    "https://My.Sanjesh.oRG",
  ];
  const expecteds = [
    "example.com/SOMETHING",
    "karsanj.net/lOgIn",
    "my.sanjesh.org",
  ];
  for (let i = 0; i < inputs.length; i++) {
    const actual = normalizeURL(inputs[i]);
    expect(actual).toEqual(expecteds[i]);
  }
});

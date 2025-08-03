const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://karsanj.net/">To Karsanj</a>
    </body>
  </html>`;
  const inputBaseURL = "https://example.com";
  const expected = ["karsanj.net"];
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">To Path</a>
    </body>
  </html>`;
  const inputBaseURL = "https://example.com";
  const expected = ["example.com/path"];
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML mixed", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://karsanj.net/">To Karsanj</a>
      <a href="/path/">To Path</a>
    </body>
  </html>`;
  const inputBaseURL = "https://example.com";
  const expected = ["karsanj.net", "example.com/path"];
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">This link is broken</a>
    </body>
  </html>`;
  const inputBaseURL = "https://example.com";
  const expected = [];
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  expect(actual).toEqual(expected);
});
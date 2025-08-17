# Node-Crawler
**Project for using HTTP knowledge - FreeCodeCamp course**

This program can crawl a website and list all the links in its html code.

Node-Crawler recursively crawls all the webpages within that website and
skips any duplicate or external links. Then it will print out a sorted list
containing the links and how many times they were used in the website.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ilia-abbasi/Node-Crawler.git
   cd Node-Crawler
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

You must have **Node.js**, **NPM** and **NVM** already installed.

## Running

### Source Code

- Run source code with:
   ```sh
   npm run start target-url
   ```

- Run test suites with (uses jest):
   ```sh
   npm run test
   ```

- Use this command to get a list of options:
  ```sh
  npm run start h
  ```

## Dependencies

- jest (dev dependency)
- jsdom

The source code is formatted with [Prettier](https://prettier.io/).


---


Node Crawler is licensed under the [GPL-3.0 license](https://github.com/ilia-abbasi/Node-Crawler/blob/main/LICENSE).

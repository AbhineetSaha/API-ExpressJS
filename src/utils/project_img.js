const cheerio = require('cheerio');

class ParseOSCrepo {
  constructor() {
    this.token = null;
  }

  handle_starttag(tag, attrs) {
    if (this.token) {
      return;
    }
    if (tag !== "meta") {
      return;
    }
    let token = null;
    for (let [index, [i, j]] of attrs.entries()) {
      if (i === "content") {
        token = j;
      }
      if (i === "property" && j === "og:image") {
        if (token) {
          this.token = token;
          return;
        }
        for (let [inner_index, [ni, nj]] of attrs.slice(index).entries()) {
          if (ni === "content") {
            this.token = nj;
            return;
          }
        }
      }
    }
  }
}

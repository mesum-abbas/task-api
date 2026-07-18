const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeWebsite() {
  try {
    const response = await axios.get("https://quotes.toscrape.com");

    const $ = cheerio.load(response.data);
    const quotes = [];
    $(".quote").each((index, element) => {
      const quote = $(element).find(".text").text();
      const author = $(element).find(".author").text();

      quotes.push({ quote, author });
    });
    console.table(quotes);
    fs.writeFileSync("quotes.json", JSON.stringify(quotes, null, 2));

    console.log("Data saved successfully!");
  } catch (error) {
    console.error(error.message);
  }
}

scrapeWebsite();

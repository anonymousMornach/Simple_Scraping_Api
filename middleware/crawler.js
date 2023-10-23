const jumiaCrawler = require("./jumiaCrawler");

async function crawler(req, res) {
  const { query } = req.body;

  console.log(query);

  // Destructuring
  if (query) {
    const amazonData = await jumiaCrawler(query);
    res.status(200).json(amazonData);
  } else {
    res.status(401).end("No query provided");
  }
}

module.exports = crawler;

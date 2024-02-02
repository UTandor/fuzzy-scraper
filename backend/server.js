const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.post("/scrape/", async (req, res) => {
  const { url } = req.body;

  const fetchData = async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const html = await page.content();
      const innerText = await page.evaluate(() => document.body.innerText);
      await browser.close();

      return { html, innerText };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  try {
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

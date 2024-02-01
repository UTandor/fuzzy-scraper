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

      // Extract HTML content
      const html = await page.content();

      // Take a screenshot of the whole page
      const screenshotBuffer = await page.screenshot({ fullPage: true });

      await browser.close();

      return { html, screenshot: screenshotBuffer.toString('base64') };
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
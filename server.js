// server.js
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5500;

// statik dosyalar (root ve assets)
app.use(express.static(__dirname));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// ana sayfa (xaviers.html'i servis et)
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "xaviers.html"));
});

// API: rastgele çizgi roman
app.get("/api/random-comic", async (_req, res) => {
  try {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const url = `https://marvel.fandom.com/wiki/Category:X-Men_Comic_Books?from=${randomLetter}`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const items = $(".category-page__member-link").toArray();
    if (!items.length) {
      return res.status(404).json({ error: "No comics found" });
    }

    const item = items[Math.floor(Math.random() * items.length)];
    const href = $(item).attr("href") || "/";
    const fullUrl = href.startsWith("http")
      ? href
      : "https://marvel.fandom.com" + href;

    res.json({ title: $(item).text().trim(), url: fullUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

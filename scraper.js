import axios from "axios";
import * as cheerio from "cheerio";

async function getRandomComic(){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const url = `https://marvel.fandom.com/wiki/Category:X-Men_Comic_Books?from=${randomLetter}`;

    let { data } = await axios.get(url);
    let $ = cheerio.load(data);
    let items = $(".category-page__member-link").toArray();
    
    if (items.length === 0) {
    console.log("Hiç link bulunamadi!");
    return;
    }
    
    let randomItem = items[Math.floor(Math.random() * items.length)];

      let href = $(randomItem).attr("href");
      let fullUrl = href.startsWith("http") ? href : "https://marvel.fandom.com" + href;

    console.log($(randomItem).text());
    //res.redirect(fullUrl);
  }
  getRandomComic();
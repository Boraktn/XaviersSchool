// assets/js/client.js
async function getRandomComic() {
  try {
    const res = await fetch("/api/random-comic");
    if (!res.ok) throw new Error("Request failed");
    const { url, title } = await res.json();
    console.log("Random comic:", title, url);
    window.open(url, "_blank"); // yeni sekmede aç
  } catch (err) {
    console.error(err);
    alert("Şu an getirilemedi, lütfen tekrar deneyin.");
  }
}

// inline onclick için global yap
window.getRandomComic = getRandomComic;

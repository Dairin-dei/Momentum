export function setQuoteOnTheScreen() {
  let buttonChangeQuote = document.querySelector(".change-quote");

  getQuotes();

  buttonChangeQuote.addEventListener("click", () => getQuotes());
}

export async function getQuotes() {
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");
  let quotes;
  let count;
  let currentLanguage = localStorage.getItem("userLanguage");

  if (currentLanguage == "english") {
    quotes = "./assets/quotes/quotes.json";
  } else {
    quotes = "./assets/quotes/quotes_rus.json";
  }

  const res = await fetch(quotes);
  const data = await res.json();

  count = JSON.parse(JSON.stringify(data)).length;
  let currentQuote = Math.floor(Math.random() * count) + 1;
  try {
    quote.textContent = data[currentQuote].text;
    author.textContent = data[currentQuote].author;
  } catch {}
}

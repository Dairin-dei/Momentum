export function setQuoteOnTheScreen(currentLanguage) {
  let buttonChangeQuote = document.querySelector(".change-quote");

  getQuotes(currentLanguage);

  buttonChangeQuote.addEventListener("click", () => getQuotes(currentLanguage));
}

export async function getQuotes(currentLanguage) {
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");
  let quotes;
  let count;

  if (currentLanguage == "english") {
    quotes = "./assets/quotes/quotes.json";
  } else {
    quotes = "./assets/quotes/quotes_rus.json";
  }

  const res = await fetch(quotes);
  const data = await res.json();

  count = JSON.parse(JSON.stringify(data)).length;
  let currentQuote = Math.floor(Math.random() * 10) + 1;
  try {
    quote.textContent = data[currentQuote].text;
    author.textContent = data[currentQuote].author;
  } catch {}
}

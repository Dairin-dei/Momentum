let body = document.getElementsByTagName("body")[0];
let currentNumberImageFromUnsplash;
let listOfImagesFromUnsplash = [];

export function listImages(currentSourceOfImages) {
  let buttonRight = document.querySelector(".slide-next");
  let buttonLeft = document.querySelector(".slide-prev");

  let finishAnimation = true;

  if (currentSourceOfImages == "github") {
    buttonLeft.addEventListener("click", () =>
      changeImage("left", finishAnimation)
    );
    buttonRight.addEventListener("click", () =>
      changeImage("right", finishAnimation)
    );
  } else if (currentSourceOfImages == "unsplash") {
    buttonLeft.addEventListener("click", () =>
      changeImagesFromUnsplash("left", finishAnimation)
    );
    buttonRight.addEventListener("click", () =>
      changeImagesFromUnsplash("right", finishAnimation)
    );
  }
}

export function managePicture(currentSourceOfImages, timeOfDay) {
  if (currentSourceOfImages == "github") {
    let baseLinkPictures =
      "https://raw.githubusercontent.com/Dairin-dei/stage1-tasks/assets/images/";

    let randomDigit = Math.floor(Math.random() * 20) + 1;
    let randomPicture =
      baseLinkPictures +
      (timeOfDay == "day" ? "afternoon" : timeOfDay) +
      "/" +
      String(randomDigit).padStart(2, "0") +
      ".jpg";
    body.style.backgroundImage = "url(" + randomPicture + ")";
    body.style.backgroundSize = "cover";
  } else if (currentSourceOfImages == "unsplash") {
    getLinkToImage();
  }
}

export function changeImage(direction, finishAnimation) {
  if (finishAnimation) {
    finishAnimation = false;

    let baseLinkPictures =
      "https://raw.githubusercontent.com/Dairin-dei/stage1-tasks/assets/images/";
    let regexp = /(\w+)(?:\/)(\d+)(?:\.\w+"\))$/;

    let timeOfDay = body.style.backgroundImage.match(regexp)[1];

    let currentNumber = Number(body.style.backgroundImage.match(regexp)[2]);

    let nextNumber;
    if (direction == "left") {
      nextNumber =
        Number(currentNumber) == 1
          ? 20
          : String(currentNumber - 1).padStart(2, "0");
    } else {
      nextNumber =
        Number(currentNumber) == 20
          ? "01"
          : String(currentNumber + 1).padStart(2, "0");
    }

    body.style.backgroundImage =
      "url(" + baseLinkPictures + timeOfDay + "/" + nextNumber + ".jpg)";
    body.style.backgroundSize = "cover";
    finishAnimation = true;
  }
}

export async function changeImagesFromUnsplash(direction, finishAnimation) {
  let countOfImagesFromUnsplash = "0";
  if (finishAnimation) {
    if (localStorage.getItem("countOfImagesFromUnsplash") != null) {
      if (localStorage.getItem("countOfImagesFromUnsplash") != undefined) {
        countOfImagesFromUnsplash = localStorage.getItem(
          "countOfImagesFromUnsplash"
        );
      }
    }

    if (
      listOfImagesFromUnsplash.length == 0 ||
      countOfImagesFromUnsplash == "0"
    ) {
      listOfImagesFromUnsplash = [];
      const getAsyncUnsplash = getLinksToImages(listOfImagesFromUnsplash);
      await getAsyncUnsplash;
      let randomDigit = Math.floor(Math.random() * 20) + 1;

      body.style.backgroundImage =
        "url(" + listOfImagesFromUnsplash[randomDigit] + ")";
      body.style.backgroundSize = "cover";
      currentNumberImageFromUnsplash = randomDigit;
      finishAnimation = true;
    } else {
      let nextNumber;
      if (direction == "left") {
        nextNumber =
          currentNumberImageFromUnsplash == 1
            ? 20
            : currentNumberImageFromUnsplash - 1;
      } else {
        nextNumber =
          currentNumberImageFromUnsplash == 20
            ? 1
            : currentNumberImageFromUnsplash + 1;
      }
      currentNumberImageFromUnsplash = nextNumber;

      body.style.backgroundImage =
        "url(" + listOfImagesFromUnsplash[nextNumber] + ")";
      body.style.backgroundSize = "cover";
      finishAnimation = true;
    }
  }
}

export async function getLinkToImage() {
  let tagForImages;
  if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      tagForImages = localStorage.getItem("tagForImages");
    }
  }
  const url =
    "https://api.unsplash.com/photos/random?orientation=landscape&query=" +
    tagForImages +
    "&client_id=gwgvrGWZVCQCBSmGoolAzqScbmx7zvN2Wde1gFFxrzw";
  const res = await fetch(url);
  const data = await res.json();
  if (data.urls.regular != null) {
    body.style.backgroundImage = "url(" + data.urls.regular + ")";
  }
}

export async function getLinksToImages() {
  let tagForImages;
  if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      tagForImages = localStorage.getItem("tagForImages");
    }
  }
  console.log("download");
  const url =
    "https://api.unsplash.com/search/photos?orientation=landscape&page=1&per_page=20&query=" +
    tagForImages +
    "&client_id=gwgvrGWZVCQCBSmGoolAzqScbmx7zvN2Wde1gFFxrzw";
  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length != null) {
    for (let i = 0; i < data.results.length; i++) {
      listOfImagesFromUnsplash.push(data.results[i].urls.regular);
    }
  }
  localStorage.setItem("countOfImagesFromUnsplash", "20");
}

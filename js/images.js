let body = document.getElementsByTagName("body")[0];
let currentNumberImageFromWeb;
let listOfImagesFromWeb = [];

export function listImages() {
  let buttonRight = document.querySelector(".slide-next");
  let buttonLeft = document.querySelector(".slide-prev");

  let finishAnimation = true;

  buttonLeft.addEventListener("click", () =>
    changeImages("left", finishAnimation)
  );
  buttonRight.addEventListener("click", () =>
    changeImages("right", finishAnimation)
  );
}

export function managePicture() {
  let currentSourceOfImages = getCurrentSourceOfImages();
  let timeOfDay = localStorage.getItem("timeOfDay");
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
    setBg(randomPicture);
  } else {
    getLinkToImage();
  }
}

export async function changeImages(direction, finishAnimation) {
  let currentSourceOfImages = getCurrentSourceOfImages();

  if (currentSourceOfImages == "github") {
    if (finishAnimation) {
      finishAnimation = false;
      let timeOfDay = localStorage.getItem("timeOfDay");

      let baseLinkPictures =
        "https://raw.githubusercontent.com/Dairin-dei/stage1-tasks/assets/images/";
      let regexp = /(\w+)(?:\/)(\d+)(?:\.\w+"\))$/;

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

      setBg(
        baseLinkPictures +
          (timeOfDay == "day" ? "afternoon" : timeOfDay) +
          "/" +
          nextNumber +
          ".jpg"
      );

      finishAnimation = true;
    }
  } else {
    let countOfImagesFromWeb = "0";
    if (finishAnimation) {
      if (localStorage.getItem("countOfImagesFromWeb") != null) {
        if (localStorage.getItem("countOfImagesFromWeb") != undefined) {
          countOfImagesFromWeb = localStorage.getItem("countOfImagesFromWeb");
        }
      }

      if (listOfImagesFromWeb.length == 0 || countOfImagesFromWeb == "0") {
        listOfImagesFromWeb = [];
        const getAsyncWeb = getLinksToImages(listOfImagesFromWeb);
        await getAsyncWeb;
        let numberCountOfImagesFromWeb = Number(
          localStorage.getItem("countOfImagesFromWeb")
        );
        let randomDigit =
          Math.floor(Math.random() * numberCountOfImagesFromWeb) + 1;

        setBg(listOfImagesFromWeb[randomDigit]);

        currentNumberImageFromWeb = randomDigit;
        finishAnimation = true;
      } else {
        let nextNumber;
        let numberCountOfImagesFromWeb = Number(
          localStorage.getItem("countOfImagesFromWeb")
        );
        if (direction == "left") {
          nextNumber =
            currentNumberImageFromWeb == 0
              ? numberCountOfImagesFromWeb - 1
              : currentNumberImageFromWeb - 1;
        } else {
          nextNumber =
            currentNumberImageFromWeb == numberCountOfImagesFromWeb - 1
              ? 0
              : currentNumberImageFromWeb + 1;
        }
        currentNumberImageFromWeb = nextNumber;

        setBg(listOfImagesFromWeb[nextNumber]);

        finishAnimation = true;
      }
    }
  }
}

export async function getLinkToImage() {
  let tagForImages = localStorage.getItem("timeOfDay");
  let spanError = document.querySelector(".error");
  let inputTag = document.querySelector(".name-for-images");

  if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      tagForImages = localStorage.getItem("tagForImages");
    }
  }
  let currentLanguage = localStorage.getItem("userLanguage");
  let currentSourceOfImages = getCurrentSourceOfImages();
  if (currentSourceOfImages == "unsplash") {
    const url =
      "https://api.unsplash.com/photos/random?orientation=landscape&query=" +
      tagForImages +
      "&client_id=gwgvrGWZVCQCBSmGoolAzqScbmx7zvN2Wde1gFFxrzw";
    const res = await fetch(url);
    const data = await res.json();
    try {
      if (data.urls.regular != null) {
        setBg(data.urls.regular);
      }
    } catch (error) {
      if (data.errors.length != 0) {
        if (currentLanguage == "english") {
          spanError.innerHTML =
            "Unfortunately, there's no images with this tag...";
        } else {
          spanError.innerHTML =
            "К сожалению, изображений с подобным тегом не найдено...";
        }
        setTimeout(() => {
          spanError.innerHTML = "";
        }, 2000);

        tagForImages = localStorage.getItem("timeOfDay");
        inputTag.value = tagForImages;
        localStorage.setItem("tagForImages", tagForImages);
        const url =
          "https://api.unsplash.com/photos/random?orientation=landscape&query=" +
          tagForImages +
          "&client_id=gwgvrGWZVCQCBSmGoolAzqScbmx7zvN2Wde1gFFxrzw";
        const res = await fetch(url);
        const data = await res.json();
        if (data.urls.regular != null) {
          setBg(data.urls.regular);
        }
      }
    }
  } else {
    const url =
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=1&api_key=ad4eb58274b41eca2b13e42b39fce4e8&tags=" +
      tagForImages +
      "&extras=url_l&format=json&nojsoncallback=1";
    const res = await fetch(url);
    const data = await res.json();

    if (data.photos.photo.length > 0) {
      if (data.photos.photo[0].url_l != null) {
        setBg(data.photos.photo[0].url_l);
      }
    } else {
      if (currentLanguage == "english") {
        spanError.innerHTML =
          "Unfortunately, there's no images with this tag...";
      } else {
        spanError.innerHTML =
          "К сожалению, изображений с подобным тегом не найдено...";
      }
      setTimeout(() => {
        spanError.innerHTML = "";
      }, 2000);

      tagForImages = localStorage.getItem("timeOfDay");
      inputTag.value = tagForImages;
      localStorage.setItem("tagForImages", tagForImages);
      const url =
        "https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=1&api_key=ad4eb58274b41eca2b13e42b39fce4e8&tags=" +
        tagForImages +
        "&extras=url_l&format=json&nojsoncallback=1";
      const res = await fetch(url);
      const data = await res.json();
      if (data.photos.photo[0].url_l != null) {
        setBg(data.photos.photo[0].url_l);
      }
    }
  }
}

export async function getLinksToImages() {
  let tagForImages = localStorage.getItem("timeOfDay");
  if (localStorage.getItem("tagForImages") != null) {
    if (localStorage.getItem("tagForImages") != undefined) {
      tagForImages = localStorage.getItem("tagForImages");
    }
  }
  let currentSourceOfImages = getCurrentSourceOfImages();
  if (currentSourceOfImages == "unsplash") {
    const url =
      "https://api.unsplash.com/search/photos?orientation=landscape&page=1&per_page=20&query=" +
      tagForImages +
      "&client_id=gwgvrGWZVCQCBSmGoolAzqScbmx7zvN2Wde1gFFxrzw";
    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length != null) {
      listOfImagesFromWeb = [];
      for (let i = 0; i < data.results.length; i++) {
        listOfImagesFromWeb.push(data.results[i].urls.regular);
      }
      localStorage.setItem(
        "countOfImagesFromWeb",
        String(listOfImagesFromWeb.length)
      );
    }
  } else {
    const url =
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&api_key=ad4eb58274b41eca2b13e42b39fce4e8&tags=" +
      tagForImages +
      "&extras=url_l&format=json&nojsoncallback=1";
    const res = await fetch(url);
    const data = await res.json();

    if (data.photos.photo.length != null) {
      listOfImagesFromWeb = [];
      for (let i = 0; i < data.photos.photo.length; i++) {
        if (data.photos.photo[i].url_l != undefined) {
          listOfImagesFromWeb.push(data.photos.photo[i].url_l);
        }
      }
      localStorage.setItem(
        "countOfImagesFromWeb",
        String(listOfImagesFromWeb.length)
      );
    }
  }
}

export function getCurrentSourceOfImages() {
  if (localStorage.getItem("currentSourceOfImages") != null) {
    if (localStorage.getItem("currentSourceOfImages") != undefined) {
      return localStorage.getItem("currentSourceOfImages");
    } else {
      return "github";
    }
  } else {
    return "github";
  }
}

function setBg(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    body.style.backgroundImage = "url(" + img.src + ")";
  };
}

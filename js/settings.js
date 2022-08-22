/*export function setSettings(tagForImages, currentSourceOfImages) {
  document.addEventListener(
    "DOMContentLoaded",
    (tagForImages, currentSourceOfImages) => {
      let tagName = document.querySelector(".name");
      console.log("DOMContentLoaded");
      if (localStorage.getItem("tagForImages") != null) {
        if (localStorage.getItem("tagForImages") != undefined) {
          tagForImages = localStorage.getItem("tagForImages");
        }
        if (localStorage.getItem("userName") != null) {
          if (localStorage.getItem("userName") != undefined) {
            tagName.value = localStorage.getItem("userName");
          }
        }
        if (localStorage.getItem("currentSourceOfImages") != null) {
          if (localStorage.getItem("currentSourceOfImages") != undefined) {
            currentSourceOfImages = localStorage.getItem(
              "currentSourceOfImages"
            );
            console.log("DOMContentLoaded", currentSourceOfImages);
          } else {
            currentSourceOfImages = "github";
          }
        } else {
          currentSourceOfImages = "github";
        }
      }
    }
  );
}*/

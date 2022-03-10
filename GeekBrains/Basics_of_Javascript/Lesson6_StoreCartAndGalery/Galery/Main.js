const previewImages = document.getElementsByClassName("preview");
const previewImagesWrapper = document.querySelector(".preview-slides");
const imageObserver = document.getElementById("image-observer");

// Task 1, Junk solution, no way to handle behavior after check
const setUpNewBigImages = (smallImageSrc) => {
  const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

  const image = new Image();

  image.onerror = function () {
    alert("image not exist");
  };

  image.onload = function (event) {
    imageObserver.src = event.target.src;
  }

  image.src = bigImageSrc;
};

const setUpNewActivePreviewImage = (selected, toSelect) => {
  selected.classList.remove("active");

  toSelect.classList.add("active");
};

const galleryHandler = (event) => {
  if (event.target === event.currentTarget) return;

  setUpNewBigImages(event.target.src);
  const activePreviewImage = document.querySelector(".preview-slides .active");
  setUpNewActivePreviewImage(activePreviewImage, event.target.parentElement);
};

const selectNextImage = (index) => {
  return index < previewImages.length - 1 ? index + 1 : 0;
};

const selectPreviousImage = (index) => {
  return index > 0 ? index - 1 : previewImages.length - 1;
};

const handleKeyDown = (event) => {
  let toSelectPreviewIndexHandler;
  switch (event.key) {
    case "ArrowLeft":
      toSelectPreviewIndexHandler = selectPreviousImage;
      break;
    case "ArrowRight":
      toSelectPreviewIndexHandler = selectNextImage;
      break;
  }

  if (toSelectPreviewIndexHandler === undefined) return;

  const activePreviewImage = document.querySelector(".preview-slides .active");
  const selectedIndex = [...previewImages].indexOf(activePreviewImage);

  const toSelectPreview = previewImages.item(toSelectPreviewIndexHandler(selectedIndex));

  setUpNewBigImages(toSelectPreview.querySelector("img").src);
  setUpNewActivePreviewImage(activePreviewImage, toSelectPreview);
};

previewImagesWrapper.addEventListener("click", galleryHandler);
document.addEventListener("keydown", handleKeyDown);
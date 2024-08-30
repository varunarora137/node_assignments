const imageBtn = document.querySelector(".btn-image");
const imageText = document.querySelector(".loading-image");
const image = document.querySelector(".image-display");

const getImage = async () => {
  try {
    image.style.display = "none";
    imageText.innerText = "Loading...";
    const fetchData = await fetch(
      "http://127.0.01:4000/api/image/random-image"
    );
    const data = await fetchData.json();
    imageText.innerText = "";
    image.src = data.image;
    image.style.display = "block";
  } catch (err) {
    console.log(err);
  }
};

imageBtn.addEventListener("click", async () => await getImage());

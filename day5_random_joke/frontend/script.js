const jokeBtn = document.querySelector(".btn-joke");
const jokeText = document.querySelector(".loading-joke");
const imageText = document.querySelector(".loading-image");
const image = document.querySelector(".image-display");
const imageJokeBtn = document.querySelector(".btn-image-joke");

const getBoth = async () => {
  try {
    document.querySelector(".image").style.display = "flex";
    image.style.display = "none";
    imageText.innerText = "Loading...";
    const fetchData = await fetch(
      "http://127.0.0.1:4000/api/joke-image/random"
    );
    const data = await fetchData.json();
    imageText.innerText = "";
    image.src = data.image;
    image.style.display = "block";
    jokeText.innerText = "Loading...";
    jokeText.innerText = data.joke;
  } catch (err) {
    console.log(err);
  }
};

const getJoke = async () => {
  try {
    jokeText.innerText = "Loading...";
    const fetchData = await fetch("http://127.0.0.1:4000/api/joke/random-joke");
    const data = await fetchData.json();
    jokeText.innerText = data.joke;
  } catch (err) {
    console.log(err);
  }
};

jokeBtn.addEventListener("click", async () => await getJoke());

imageJokeBtn.addEventListener("click", async () => {
  await getBoth();
});

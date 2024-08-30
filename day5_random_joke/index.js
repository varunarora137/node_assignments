const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const port = 4000;
const host = "127.0.0.1";

app.use(cors());
app.use(express.json());

const getJoke = async () => {
  try {
    const joke_response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const joke = await joke_response.json();
    return joke.setup + " - " + joke.punchline;
  } catch (err) {
    console.error("Error fetching joke:", error);
    throw new Error("Failed to fetch joke");
  }
};

const getImage = async () => {
  try {
    const image_response = await fetch(
      "https://api.api-ninjas.com/v1/randomimage?category=nature",
      {
        headers: {
          "X-Api-Key": process.env.API_KEY,
          Accept: "image/jpg",
        },
      }
    );

    const imageArrayBuffer = await image_response.arrayBuffer();

    const imageBuffer = Buffer.from(imageArrayBuffer);

    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString(
      "base64"
    )}`;

    return base64Image;
  } catch (err) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
};

app.get("/api/joke/random-joke", async (req, res) => {
  try {
    const joke = await getJoke();
    res.status(200).json({ joke });
  } catch (err) {
    res.send(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/api/joke-image/random", async (req, res) => {
  try {
    const joke = await getJoke();
    const image = await getImage();

    res.status(200).json({
      joke,
      image,
    });
  } catch (err) {
    res.send(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(port, host, () => console.log("Server Started"));

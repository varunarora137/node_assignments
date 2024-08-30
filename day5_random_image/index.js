const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const port = 4000;
const host = "127.0.0.1";

app.use(cors());
app.use(express.json());

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

app.get("/api/image/random-image", async (req, res) => {
  try {
    const image = await getImage();

    res.status(200).json({ image });
  } catch (err) {
    console.error("Error fetching image:", err);
    res.send(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(port, host, () => console.log("Server Started"));

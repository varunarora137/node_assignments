import { nanoid } from "nanoid";
import urlModel from "../model/urlModel.js";

export const getShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const getURL = await urlModel.find(
      { nanoID: id },
      { originalURL: 1, _id: 0 }
    );

    if (getURL.length === 0) {
      return res.status(404).send("URL not found");
    }
    console.log(getURL);
    console.log(getURL[0].originalURL);
    res.redirect(getURL[0].originalURL);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const shortURL = async (req, res) => {
  try {
    const { originalURL } = req.body;
    let nanoID = "";
    const findOriginal = await urlModel.find({ originalURL });
    if (findOriginal.length !== 0) {
      nanoID = findOriginal[0].nanoID;
    } else {
      nanoID = nanoid(10);
      await urlModel.create({
        originalURL,
        nanoID,
      });
      console.log("hello Server");
    }
    res.send({
      link: `https://node-assignments-1.onrender.com/api/url/${nanoID}`,
    });
  } catch (err) {
    console.log(err);
  }
};

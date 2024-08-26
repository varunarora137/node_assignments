const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");

let page = 1;
const data = [];
data.push(["Product Name", "Price", "Ratings", "Availability"]);
let workbook = XLSX.utils.book_new();

const main = async (page) => {
  try {
    const response = await axios.get(
      `https://www.meesho.com/accessories-men/pl/3tp?page=${page}`
    );
    const dump = cheerio.load(response.data);
    dump(".sc-dkrFOg.ProductList__GridCol-sc-8lnc8o-0.cokuZA.eCJiSA").each(
      (index, element) => {
        const productName = dump(element)
          .find(
            ".sc-eDvSVe.gQDOBc.NewProductCardstyled__StyledDesktopProductTitle-sc-6y2tys-5.ejhQZU.NewProductCardstyled__StyledDesktopProductTitle-sc-6y2tys-5.ejhQZU"
          )
          .text()
          .trim();
        const price = dump(element)
          .find(".sc-eDvSVe.dwCrSh")
          .text()
          .split(" ")[0]
          .trim();
        const ratings =
          dump(element).find(".sc-eDvSVe.laVOtN").text().trim() === ""
            ? "N/A"
            : dump(element).find(".sc-eDvSVe.laVOtN").text().trim();
        const availabilty =
          dump(element).find(".sc-eDvSVe.fkvMlU").text().trim() ===
          "Free Delivery"
            ? "In Stock"
            : "Not Available";
        data.push([productName, price, ratings, availabilty]);
      }
    );
  } catch (err) {
    console.error(`Error fetching page ${page}:`, err);
  }
};

const scrapeAllPages = async () => {
  while (page <= 3) {
    await main(page);
    page++;
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "data.xlsx");
};

scrapeAllPages();

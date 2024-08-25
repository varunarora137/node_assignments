const puppeteer = require("puppeteer");
const fs = require("fs");

const seasons = [];
const currYear = new Date().getFullYear();
for (let i = currYear; i > currYear - 5; i--) {
  seasons.push(i);
}
const allData = {};

const startingURL = "https://www.iplt20.com/stats/";

async function scrapeIPLData() {
  const browser = await puppeteer.launch();

  for (const season of seasons) {
    const page = await browser.newPage();

    // Navigate to the IPL stats page for the given season
    const url = `${startingURL}${season}`;
    await page.goto(url, { waitUntil: "networkidle2" });

    // Attempt to click on the cookie accept button, if available
    try {
      await page.waitForSelector(".cookie__accept", {
        visible: true,
        timeout: 10000,
      });
      await page.click(".cookie__accept");
    } catch (error) {
      console.log(
        "Cookie accept button not found or unavailable.Therefore, Skipping this step."
      );
    }

    // Wait for the page to load and necessary elements to appear
    await page.waitForSelector("#battingTAB");

    // Optional: additional wait time for dynamic content
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);

    // Extract player data
    const playersData = await page.evaluate(() => {
      const rows = document.querySelectorAll(
        "#battingTAB > table > tbody > tr"
      );
      return Array.from(rows)
        .map((row) => {
          const columns = row.querySelectorAll("td");
          return {
            POS: columns[0]?.innerText.trim(),
            Player: columns[1]?.innerText.trim().split("\n")[0],
            Runs: columns[2]?.innerText.trim(),
            Sixes: columns[13]?.innerText.trim(),
            Fours: columns[12]?.innerText.trim(),
            Fifties: columns[11]?.innerText.trim(),
            Hundreds: columns[10]?.innerText.trim(),
          };
        })
        .slice(1, 11);
    });

    allData[season] = { players: playersData };
    await page.close();
  }
  fs.writeFileSync("ipl_data.json", JSON.stringify(allData, null, 2));
  await browser.close();
}

scrapeIPLData();
// (async () => {
//   for (let i = currYear; i > currYear - 5; i--) {
//     let url = `https://www.iplt20.com/stats/${i}`;
//     const data = await scrapeIPLData(url);
//     console.log(`Data for ${i}:`, data);
//     allData[i] = { players: data };
//   }

//   fs.writeFileSync("ipl_data.json", JSON.stringify(allData, null, 2));
// })();

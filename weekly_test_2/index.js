const puppeteer = require("puppeteer");
const fs = require("fs");

const seasons = [];
const currYear = new Date().getFullYear();
for (let i = currYear; i > currYear - 5; i--) {
  seasons.push(i);
}
const allData = {};

const startingURL = "https://www.iplt20.com/stats/";

async function oragneCapEvaluate(page) {
  await page.waitForSelector("#battingTAB");

  // Optional: additional wait time for dynamic content
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);

  // Extract player data
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll("#battingTAB > table > tbody > tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          Player: columns[1]?.innerText.trim().split("\n")[0],
          Runs: columns[2]?.innerText.trim(),
        };
      })
      .slice(1, 11);
  });
  return playersData;
}

async function mostFourEvaluate(page) {
  await page.click(".customSelecBox.statsTypeFilter");

  statesFilterSelector = await page.$(".cSBList.active");

  const mostFoursFilterOption = await statesFilterSelector.$(
    ".cSBListItems.batters.selected.ng-binding.ng-scope:nth-child(3)"
  );
  mostFoursFilterOption.click();

  await page.waitForSelector("#battingTAB");

  // Optional: additional wait time for dynamic content
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);

  // Extract player data
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll("#battingTAB > table > tbody > tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          Player: columns[1]?.innerText.trim().split("\n")[0],
          Fours: columns[2]?.innerText.trim(),
        };
      })
      .slice(1, 11);
  });
  return playersData;
}

async function mostSixesEvaluate(page) {
  await page.click(".customSelecBox.statsTypeFilter");

  statesFilterSelector = await page.$(".cSBList.active");

  const mostSixesFilterOption = await statesFilterSelector.$(
    ".cSBListItems.batters.selected.ng-binding.ng-scope:nth-child(5)"
  );
  mostSixesFilterOption.click();

  await page.waitForSelector("#battingTAB");

  // Optional: additional wait time for dynamic content
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);

  // Extract player data
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll("#battingTAB > table > tbody > tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          Player: columns[1]?.innerText.trim().split("\n")[0],
          Sixes: columns[2]?.innerText.trim(),
        };
      })
      .slice(1, 11);
  });
  return playersData;
}

async function mostHundredsEvaluate(page) {
  await page.click(".customSelecBox.statsTypeFilter");

  statesFilterSelector = await page.$(".cSBList.active");

  const mostHundredsFilterOption = await statesFilterSelector.$(
    ".cSBListItems.batters.selected.ng-binding.ng-scope:nth-child(8)"
  );
  mostHundredsFilterOption.click();

  await page.waitForSelector("#battingTAB");

  // Optional: additional wait time for dynamic content
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);

  // Extract player data
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll("#battingTAB > table > tbody > tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          Player: columns[1]?.innerText.trim().split("\n")[0],
          Hundreds: columns[2]?.innerText.trim(),
        };
      })
      .slice(1, 11);
  });
  return playersData;
}

async function mostFiftiesEvaluate(page) {
  await page.click(".customSelecBox.statsTypeFilter");

  statesFilterSelector = await page.$(".cSBList.active");

  const mostFiftiesFilterOption = await statesFilterSelector.$(
    ".cSBListItems.batters.selected.ng-binding.ng-scope:nth-child(7)"
  );
  mostFiftiesFilterOption.click();

  await page.waitForSelector("#battingTAB");

  // Optional: additional wait time for dynamic content
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);

  // Extract player data
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll("#battingTAB > table > tbody > tr");
    return Array.from(rows)
      .map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          Player: columns[1]?.innerText.trim().split("\n")[0],
          Fifties: columns[2]?.innerText.trim(),
        };
      })
      .slice(1, 11);
  });
  return playersData;
}

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
    const orangeCapData = await oragneCapEvaluate(page);

    const mostFour = await mostFourEvaluate(page);

    const mostSixes = await mostSixesEvaluate(page);

    const mostHundreds = await mostHundredsEvaluate(page);

    const mostFifties = await mostFiftiesEvaluate(page);

    const data = {};
    data["Most Fours"] = mostFour;
    data["Most Sixes"] = mostSixes;
    data["Most Hundreds"] = mostHundreds;
    data["Most Fifties"] = mostFifties;
    data["Orange Cap"] = orangeCapData;

    allData[season] = data;
    await page.close();
  }
  fs.writeFileSync("ipl_data.json", JSON.stringify(allData, null, 2));
  await browser.close();
}

scrapeIPLData();

const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");

const data = [];
data.push([
  "Job Title",
  "Company Name",
  "Location",
  "Job Type",
  "Job Description",
  "Posted Date",
]);
const workbook = XLSX.utils.book_new();
const main = async () => {
  try {
    const response = await axios.get(
      "https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35"
    );
    const dump = cheerio.load(response.data);
    dump(".clearfix.job-bx.wht-shd-bx").each((ind, el) => {
      const jobTitle = dump(el).find("h2 a").text().trim();
      const companyName = dump(el).find(".joblist-comp-name").text().trim();
      const location =
        dump(el).find("ul li  span").first().text().trim().length == 0
          ? "N/A"
          : dump(el).find("ul li  span").first().text();
      const jobType = "Full-time";
      const jobDescription = dump(el)
        .find(".list-job-dtl.clearfix li ")
        .first()
        .text()
        .trim()
        .slice(16);
      const postedDate = dump(el)
        .find(".sim-posted span")
        .text()
        .trim()
        .slice(6);
      data.push([
        jobTitle,
        companyName,
        location,
        jobType,
        jobDescription,
        postedDate,
      ]);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  } catch (err) {
    console.log("Error: " + err);
  }
};

main();

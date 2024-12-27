import MonocartReporter from "monocart-reporter";
import fs from "fs";
import path from "path";

(async () => {
  // List of JSON report files
  const reportDataList = [
    JSON.parse(fs.readFileSync(path.resolve("monocart-report-1/index.json"))),
    JSON.parse(fs.readFileSync(path.resolve("monocart-report-2/index.json"))),
    JSON.parse(fs.readFileSync(path.resolve("monocart-report-3/index.json"))),
  ];

  // Merge reports
  await MonocartReporter.merge(reportDataList, {
    name: "Merged Shard Report",
    outputFile: "merged-report/index.html",
  });

  console.log("Merged report generated at merged-report/index.html");
})();

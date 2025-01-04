const { expect } = require("@playwright/test");
import resemble from "resemblejs";
import fs from "fs";
const allure = require("allure-js-commons");
const { ContentType } = require("allure-js-commons");

export class HelperFunction {
  constructor(page) {
    this.page = page;
  }

  async compareScreenshots(currentPath, baselinePath, diffPath) {
    return new Promise((resolve, reject) => {
      resemble(baselinePath)
        .compareTo(currentPath)
        // .ignoreAntialiasing()
        .onComplete((data) => {
          try {
            if (data && data.getBuffer) {
              fs.writeFileSync(diffPath, data.getBuffer(true));
            }
            resolve(data.rawMisMatchPercentage);
          } catch (error) {
            reject({ error, screenshotPath: diffPath });
          }
        });
    });
  }

  async wait() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(4000);
  }

  async captureBase64Screenshot(diffPath) {
    return diffPath.toString("base64");
  }

  async validateMismatch(mismatch, diffPath) {
    try {
      expect(parseFloat(mismatch)).toBeLessThan(1);
    } catch (error) {
      // Log the error message with the base64 encoded screenshot
      const errorMessage = `Mismatch for Home page: ${mismatch}`;

      // Log the error with the HTML image tag
      console.error(errorMessage);
      await allure.attachmentPath("Screenshot", diffPath, {
        contentType: ContentType.PNG,
        fileExtension: "png",
      });

      // Throw a custom error with the HTML content and base64 screenshot
      throw new Error(errorMessage);
    }
  }

  async declareTags(test, tag) {
    test.info().annotations.push({ type: "severity", value: tag });
  }
}

# Playwright-Sharding-Testing


This repository demonstrates how to run Playwright tests with sharding and generate reports using GitHub Actions.

## Workflow Overview

The GitHub Actions workflow defined in playwright.yml is responsible for running Playwright tests in parallel using sharding, and generating both Playwright and Allure reports.

## Workflow Steps

1. Trigger: The workflow is triggered on every push to the main branch.

2. **Job**: playwright-test:

    a. Timeout: The job has a timeout of 60 minutes.

    b. Runs on: The job runs on ubuntu-latest.

    c. Strategy: The job uses a matrix strategy to run tests in 3 shards.

    d. Steps:

        1. Checkout: Checks out the repository.
        2. Setup Node.js: Sets up Node.js using the latest LTS version.
        3. Install dependencies: Installs the project dependencies using npm ci.
        4. Install Playwright Browsers: Installs the necessary Playwright browsers.
        5. Run Playwright tests: Runs the Playwright tests with sharding.
        6. Upload Blob Report: Uploads the blob report as an artifact.
        7. Upload Allure Results: Uploads the Allure results as an artifact.
    e. Continue on Error: The job continues on error to ensure artifacts are uploaded even if tests fail.

3. Job: merge-reports:

    1. Needs: This job depends on the playwright-test job.

    2. Runs on: The job runs on ubuntu-latest.

    3. Steps:

        1. Checkout: Checks out the repository.
        2. Setup Node.js: Sets up Node.js using the latest LTS version.
        3. Install dependencies: Installs the project dependencies using npm ci.
        4. Download Blob Reports: Downloads the blob reports from the previous job.
        5. Merge Playwright Report: Merges the Playwright reports into a single HTML report.
        6. Upload Merged Playwright Report: Uploads the merged Playwright report as an artifact.
        7. Download Allure Results: Downloads the Allure results from the previous job.
        8. Generate Allure Report: Generates the Allure report.
        9. Upload Allure Results: Uploads the Allure results as an artifact.
        10. Upload Allure Report: Uploads the Allure report as an artifact.

## Artifacts

1. Blob Report: The Playwright test results are uploaded as blob reports.
2. Allure Results: The raw results for Allure are uploaded.
3. Merged Playwright Report: The merged Playwright HTML report.
4. Allure Report: The generated Allure report.

## Retention

1. Blob Report: Retained for 30 days.
2. Allure Results: Retained for 30 days.
3. Allure Report: Retained for 30 days.


## Running Locally

To run the tests locally, you can use the following commands:

1. Install dependencies:

`npm ci`

2. Install Playwright Browsers:

`npx playwright install --with-deps`

3. Run Playwright tests:

`npx playwright test`

4. Generate Allure Report:

`npx allure generate --clean --single-file allure-results`

## License

This project is licensed under the MIT License. See the LICENSE file for details.
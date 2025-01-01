#  Playwright-Sharding-Testing 


This repository demonstrates how to run Playwright tests with sharding and generate reports using GitHub Actions.




##  Workflow Overview 

The GitHub Actions workflow defined in `playwright.yml` is responsible for running Playwright tests in parallel using sharding and generating both Playwright and Allure reports.

---

##  Workflow Steps 

### **Job: playwright-test**

1. **Trigger**: The workflow is triggered on every push to the `main` branch.

2. **Timeout**: The job has a timeout of 60 minutes.

3. **Runs on**: `ubuntu-latest`.

4. **Strategy**: Uses a matrix strategy to run tests in **3 shards**.

5. **Steps**:
   - **Checkout**: Checks out the repository.
   - **Setup Node.js**: Sets up Node.js using the latest LTS version.
   - **Install Dependencies**: Installs the project dependencies using `npm ci`.
   - **Install Playwright Browsers**: Installs the necessary Playwright browsers.
   - **Run Playwright Tests**: Executes the Playwright tests with sharding.
   - **Upload Blob Report**: Uploads the blob report as an artifact.
   - **Upload Allure Results**: Uploads the Allure results as an artifact.

6. **Continue on Error**: Ensures artifacts are uploaded even if tests fail.

---

### **Job: merge-reports**

1. **Depends on**: The `playwright-test` job.

2. **Runs on**: `ubuntu-latest`.

3. **Steps**:
   - **Checkout**: Checks out the repository.
   - **Setup Node.js**: Sets up Node.js using the latest LTS version.
   - **Install Dependencies**: Installs the project dependencies using `npm ci`.
   - **Download Blob Reports**: Downloads the blob reports from the previous job.
   - **Merge Playwright Report**: Merges the Playwright reports into a single HTML report.
   - **Upload Merged Playwright Report**: Uploads the merged Playwright report as an artifact.
   - **Download Allure Results**: Downloads the Allure results from the previous job.
   - **Generate Allure Report**: Generates the Allure report.
   - **Upload Allure Results**: Uploads the Allure results as an artifact.
   - **Upload Allure Report**: Uploads the Allure report as an artifact.

---

##  Artifacts 

- **Blob Report**: The Playwright test results are uploaded as blob reports.
- **Allure Results**: The raw results for Allure are uploaded.
- **Merged Playwright Report**: The merged Playwright HTML report.
- **Allure Report**: The generated Allure report.

### **Retention**

- **Blob Report**: Retained for **30 days**.
- **Allure Results**: Retained for **30 days**.
- **Allure Report**: Retained for **30 days**.

---

##  Running Locally 

To run the tests locally, you can use the following commands:

1. **Install Dependencies**:

```bash
npm ci
```

2. **Install Playwright Browsers**:

```bash
npx playwright install --with-deps
```

3. **Run Playwright Tests**:

```bash
npx playwright test
```

4. **Generate Allure Report**:

```bash
npx allure generate --clean --single-file allure-results
```

---

##  License 

This project is licensed under the **MIT License**. See the `LICENSE` file for details.


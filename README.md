
# BrightHR Employee Management Automation Framework

A production-ready automated testing suite built with **Playwright** and **TypeScript** to validate core user and employee lifecycle workflows within the BrightHR application ecosystem. This repository fully satisfies all requirements outlined in the engineering tech assignment. 

---

## Architecture & Engineering Highlights

* **Page Object Model (POM):** Cleanly abstracts UI element identification and behavioral workflows into isolated Page Classes, eliminating brittle scripts and ensuring changes to the application UI only require single-point locator updates.
* **Data-Driven Execution:** Decoupled data profiles out of execution code blocks by engineering an external, centralized JSON data engine (`test-data/employees.json`) for effortless scalability and profile variation adjustments.
* **Resilient Element Identification:** Hardened locators using robust, human-centric user experience attributes (e.g., semantic roles, accessible labels, exact-text targeting filters).
* **Sandbox Contention Handling:** Implemented defensive assertion strategy modifiers (`.first()`) to prevent automated test run breakages caused by strict mode exceptions when encountering overlapping data strings inside a shared cloud multi-tenant database.
* **Continuous Integration Ready:** Outfitted with an integrated GitHub Actions workflow automation runner script configured to provision headless cloud-container instances, automatically inject secure repository execution variables, and archive structured HTML test run reports.

---

## 🛠️ Getting Started Locally

### Prerequisites
Ensure you have **Node.js** (LTS version recommended) installed on your machine.

### Installation

1. **Clone the repository** to your local workspace environment:
   ```bash
   git clone https://github.com
   cd bright-hr-task
   ```

2. **Install framework dependencies** and core package configurations:
   ```bash
   npm install
   ```

3. **Install the browser engine** bin files:
   ```bash
   npx playwright install --with-deps
   ```

### Local Environment Injection
Create a secure text configuration file named `.env` at the root folder level and specify the BrightHR sandbox credentials:

```env
BRIGHTHR_USER=qaAutomationTechTask@grr.la
BRIGHTHR_PASS=A1234567890-
```

---

##  Running Tests

* **Run the automated regression suite** in headless background mode:
  ```bash
  npx playwright test
  ```

* **Run tests in headed visual mode** to watch execution live on screen:
  ```bash
  npx playwright test --headed
  ```

* **Open the interactive graphical user interface** debug canvas:
  ```bash
  npx playwright test --ui
  ```

* **Generate and launch** the local HTML execution summary trace report:
  ```bash
  npx playwright show-report
  ```

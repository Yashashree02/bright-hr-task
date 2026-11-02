import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeePage } from '../pages/EmployeePage';
import employeeData from '../test-data/employees.json';

test.describe('BrightHR Employee Management Lifecycle', () => {
    let loginPage: LoginPage;
    let employeePage: EmployeePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        employeePage = new EmployeePage(page);

        await loginPage.navigate();
        await loginPage.login(
            process.env.BRIGHTHR_USER!, 
            process.env.BRIGHTHR_PASS!
        );
    });

    test('should successfully add multiple employees and verify their listing records', async () => {

        const { employee1, employee2 } = employeeData;

        await test.step('Navigate to Employees section and create Employee 1', async () => {
            await employeePage.navigateToEmployees();
            await employeePage.addEmployee(employee1);
        });

        await test.step('Create Employee 2 in sequence', async () => {
            await employeePage.navigateToEmployees();
            await employeePage.addEmployee(employee2);
        });

        await test.step('Verify both added records appear visible on the grid table', async () => {
            await employeePage.navigateToEmployees();           
            await employeePage.verifyEmployeeIsDisplayed(`${employee1.firstName} ${employee1.lastName}`);
            await employeePage.verifyEmployeeIsDisplayed(`${employee2.firstName} ${employee2.lastName}`);
        });
    });
});

import { type Locator, type Page, expect } from '@playwright/test';

export interface EmployeeData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    jobTitle?: string;
}

export class EmployeePage {
    readonly page: Page;
    readonly employeeTab: Locator;
    readonly addEmployeeButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly jobTitleInput: Locator;
    readonly saveButton: Locator;
    readonly addAnotherButton: Locator;
    readonly closeModalButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.employeeTab = page.getByTestId('sideBar').getByRole('link', { name: 'Employees' });
        this.addEmployeeButton = page.getByRole('button', { name: 'Add employee' });
        
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone number (optional)' });
        this.jobTitleInput = page.getByRole('textbox', { name: 'Job title (optional)' });
        this.saveButton = page.getByRole('button', { name: 'Save new employee' });

        this.addAnotherButton = page.getByRole('button', { name: 'Add another employee' });
        this.closeModalButton = page.getByRole('button', { name: 'Close modal' });
    }

    async navigateToEmployees() {
        await this.employeeTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async addEmployee(employee: EmployeeData) {

        if (await this.firstNameInput.isHidden()) {
            await this.addEmployeeButton.click();
        }
        
        await this.firstNameInput.fill(employee.firstName);
        await this.lastNameInput.fill(employee.lastName);
        await this.emailInput.fill(employee.email);
        
        if (employee.phoneNumber) {
            await this.phoneInput.fill(employee.phoneNumber);
        }
        if (employee.jobTitle) {
            await this.jobTitleInput.fill(employee.jobTitle);
        }
        
        await this.saveButton.click();
        
       
        await this.page.waitForTimeout(500); 
        
        if (await this.addAnotherButton.isVisible()) {
            await this.addAnotherButton.click();
        } else if (await this.closeModalButton.isVisible()) {
            await this.closeModalButton.click();
        }
        await this.page.waitForLoadState('networkidle');
    }

    async verifyEmployeeIsDisplayed(fullName: string) {
        const employeeRecord = this.page.getByText(fullName, { exact: false }).first();
        await expect(employeeRecord).toBeVisible({ timeout: 10000 });
    }
}


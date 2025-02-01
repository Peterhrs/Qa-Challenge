import { Page, Locator } from '@playwright/test';

export class CarrinhoPage {
    private readonly page: Page;
    private readonly checkoutButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly error: Locator;
    private readonly cardBadge: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly continueButton: Locator;
    private readonly carItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.error = page.locator('[data-test="error"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cardBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.carItems = page.locator('[data-test="inventory-item-name"]');
        
    }

    async addProductToCart(productId: string) {
        await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
    }
    async removeProductToCart(productId: string) {
        await this.page.locator(`[data-test="remove-${productId}"]`).click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async getCartItems() {
        return await this.carItems.allTextContents();
    }

    async getCartBadge() {
        return await this.cardBadge.textContent();
    }
    
    async getError() {
        return await this.error.textContent();
    }

    async goToCard() {
        await this.cardBadge.click();
    }
    async goToShoppingCart() {
        await this.shoppingCartLink.waitFor({ state: 'visible' });
        await this.shoppingCartLink.click();
    }
}
// Importando os módulos do Playwright e as páginas
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { CarrinhoPage } from '../../pages/carrinho';

test.describe('Testes de Login', () => {

    // Teste para verificar login bem-sucedido
    test('Deve realizar login com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await loginPage.navigate(); 
        await loginPage.login('standard_user', 'secret_sauce'); 
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    });

    // Teste para verificar erro ao tentar login com credenciais inválidas
    test('Deve mostrar erro ao tentar login com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await loginPage.navigate(); 
        await loginPage.login('email errado', 'senha errada'); 
        const error = await loginPage.getError(); 
        expect(error).toContain('Username and password do not match any user in this service'); 
    });
});

test.describe('Testes de Carrinho', () => {

    let loginPage: LoginPage;
    let carrinhoPage: CarrinhoPage;

    // Antes de cada teste, realiza login e instancia as páginas
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); 
        carrinhoPage = new CarrinhoPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce'); 
      });
      
    // Teste para adicionar e remover produtos do carrinho
    test('Deve adicionar e remover produtos do carrinho corretamente', async ({ page }) => {

        await carrinhoPage.addProductToCart('sauce-labs-backpack');
        expect(await carrinhoPage.getCartBadge()).toBe('1');


        await carrinhoPage.addProductToCart('sauce-labs-bike-light');
        expect(await carrinhoPage.getCartBadge()).toBe('2');

        await carrinhoPage.addProductToCart('sauce-labs-bolt-t-shirt');
        expect(await carrinhoPage.getCartBadge()).toBe('3');

        await carrinhoPage.removeProductToCart('sauce-labs-backpack');
        expect(await carrinhoPage.getCartBadge()).toBe('2');

        await carrinhoPage.removeProductToCart('sauce-labs-bolt-t-shirt');
        expect(await carrinhoPage.getCartBadge()).toBe('1');

        // Obtém os itens do carrinho e verifica se o produto 'Sauce Labs Bike Light' está presente
        await carrinhoPage.getCartItems();
        const items = await carrinhoPage.getCartItems();
        expect(items).toContain('Sauce Labs Bike Light');
    });

    // Teste para bloquear o checkout sem preencher campos obrigatórios
    test('Deve bloquear checkout sem preencher campos obrigatórios', async ({ page }) => {
        await carrinhoPage.goToShoppingCart(); 
        await carrinhoPage.checkout(); 
        await carrinhoPage.continue(); 
        
        const error = await carrinhoPage.getError(); 
        expect(error).toContain('Error: First Name is required');
    });
});
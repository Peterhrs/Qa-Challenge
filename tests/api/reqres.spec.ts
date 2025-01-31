// Importa funções para facilitar as requisições e validações na API.
import { test, expect } from '@playwright/test';
import { checkJsonBody, checkStatus, deleteRequest, getRequest, postRequest, putRequest, validateEmail } from '../../utils/apiHelper';

// URL base para os endpoints da API
const BASE_URL = 'https://reqres.in/api';

test.describe('Testes Relacionados a Usuarios', () => {

    // Testa a listagem de usuários, verificando os campos retornados.
    test('Deve listar usuarios corretamente', async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/users?page=2`);
        checkStatus(response, 200);
        checkJsonBody(response, ['id', 'email', 'first_name', 'last_name']); // Verifica se os campos essenciais estão presentes.
    });

    // Valida se todos os emails dos usuários estão com o formato correto.
    test('Deve validar a estrutura dos emails dos usuarios', async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/users?page=2`);
        checkStatus(response, 200);
        await validateEmail(response); // Função específica para validar a estrutura de emails.
    });

    // Testa a criação e a atualização de um usuário.
    test('Deve criar e atualizar um usuario', async ({ request }) => {
        // Criação do usuário
        const response = await postRequest(request, `${BASE_URL}/users`, { name: 'QA Tester', job: 'Automation' });
        checkStatus(response, 201);
        const createdUser = await response.json();
        expect(createdUser).toHaveProperty('name', 'QA Tester');

        // Atualização do usuário
        const updatedResponse = await putRequest(request, `${BASE_URL}/users/2`, { name: 'QA Lead' });
        checkStatus(updatedResponse, 200);
        const updatedUser = await updatedResponse.json();
        expect(updatedUser).toHaveProperty('name', 'QA Lead');
    });

    // Testa a exclusão de um usuário inexistente e verifica o erro 404.
    test('Deve retornar um erro ao deletar um usuario inexistente', async ({ request }) => {
        const response = await deleteRequest(request, `${BASE_URL}/users/992424`);
        checkStatus(response, 404);
        const error = await response.json();
        expect(error).toHaveProperty('error', 'User not found');
    });
});

test.describe('Testes Relacionados a Erros e Performance', () => {

    // Testa o tempo de resposta da API, garantindo que seja rápido o suficiente.
    test('Deve valiadar o tempo de resposta da API', async ({ request }) => {
        const start = Date.now();
        const response = await request.get(`${BASE_URL}/users?page=2`);
        const end = Date.now() - start;
        expect(end).toBeLessThan(2000); // O tempo de resposta deve ser menor que 2 segundos
        checkStatus(response, 200);
    });

    // Simula uma falha de rede (timeout) e verifica o erro esperado.
    test('Deve lidar com falha de rede corretamente', async ({ request }) => {
        try {
            const response = await request.get(`${BASE_URL}/users?page=2`, { timeout: 1000 });
            expect(response.status()).toBe(200);
        } catch (error: unknown) {
            if (error instanceof Error) {
                expect(error.message).toContain('TimeoutError');
                expect(error.name).toBe('TimeoutError');
            } else {
                throw new Error('Erro inesperado');
            }
        }
    });

    // Testa a resposta de erro 500 ao acessar um endpoint inválido.
    test('Deve lidar com erro 500 corretamente', async ({ request }) => {
        const response = await getRequest(request, `${BASE_URL}/afasdasd`);
        checkStatus(response, 500);
        checkJsonBody(response, ['error']); // Verifica se a resposta contém o erro esperado.
    });
});

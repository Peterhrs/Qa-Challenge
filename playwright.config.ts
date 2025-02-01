import { defineConfig } from '@playwright/test';

export default defineConfig({
    workers: 2, // Define dois workers para execução paralela
    retries: 1, // Em CI, pode aumentar para 2
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'always' }]
    ],
    use: {
        headless: true,
        trace: 'on',
    },
    projects: [
        {
        name: 'UI Tests',
        testDir: 'tests/ui',  // Diretório de testes de UI
        },
        {
        name: 'API Tests',
        testDir: 'tests/api',  // Diretório de testes de API
        },
    ],
});

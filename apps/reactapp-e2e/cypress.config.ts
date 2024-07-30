import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run reactapp:serve',
        production: 'nx run reactapp:preview',
      },
      ciWebServerCommand: 'nx run reactapp:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});

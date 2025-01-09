import { defineConfig } from "cypress";

export default defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {

    baseURL: 'http://localhost:8080/#',

}
});

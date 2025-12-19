import { defineConfig } from 'prisma/config';

export default defineConfig({
  migrate: {
    datasourceUrl: 'file:./dev.db',
  },
});

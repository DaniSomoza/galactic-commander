import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dotenv from 'dotenv'
import { configDefaults } from 'vitest/config'

dotenv.config({ path: resolve(__dirname, '../../.env') })

export default defineConfig({
  plugins: [react()],
  // @ts-expect-error vite config test
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'node_modules'],
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'lcov', 'text'],
      reportsDirectory: './coverage'
    }
  }
})

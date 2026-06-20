import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    // Extended timeout to allow the full Big-3 1728×2-year sweep (bigThreeSweep.test.ts)
    // which runs ~3456 ephemeris-backed solver calls and takes ~75–90 minutes.
    testTimeout: 7200_000, // 2 hours
  },
});

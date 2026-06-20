import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    // Normal per-test timeout. The exhaustive Big-3 sweep (bigThreeSweep.test.ts) is
    // OPT-IN (SWEEP=1) and sets its own 600s describe/it timeout when run, so the
    // default `npm test`/verify path stays fast and does not need a 2h global.
    testTimeout: 30_000,
  },
});

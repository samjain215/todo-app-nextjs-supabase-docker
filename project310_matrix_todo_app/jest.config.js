import nextJest from 'next/jest.js';

// Extend the default Next.js Jest configuration
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

const customJestConfig = {
  preset: 'ts-jest', // Use ts-jest
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Map @/ alias to the root directory
  },
  testMatch: ['**/_testing_/**/*.test.(js|ts)'], // Match test files in _testing_ folder
};

export default createJestConfig(customJestConfig);

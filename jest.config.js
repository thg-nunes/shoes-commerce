module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.spec.tsx',
    '!src/**/*_app.tsx',
    '!src/**/*_document.tsx',
    '!<rootDir>/src/pages/api/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.{js,ts}',
    '!<rootDir>/src/styles/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/services  /**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/**/stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@templates/(.*)$': '<rootDir>/src/templates/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/.out/',
    '<rootDir>/public/',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

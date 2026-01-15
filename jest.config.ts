export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "**/*.spec.ts", 
    "**/*.test.ts"
  ],
};
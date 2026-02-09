import { PrismaClient } from "@prisma/client";

export const AppDataSource = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// For testing
let currentDataSource: PrismaClient = AppDataSource;

export function getDataSource(): PrismaClient {
  return currentDataSource;
}

export function setDataSource(client: PrismaClient): void {
  currentDataSource = client;
}
